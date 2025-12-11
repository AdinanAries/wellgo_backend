const SalesProfitSplitterEngineLog = require("../models/salesProfitSplitterEngineLog");

const constants = require("../constants");
const stripe = require('stripe')('sk_test_51OdjZ3An0YMgH2TtcRebcqghzoyfEnf0Ezuo0HKbCvFDcSE2ECddCbGMddcCF5r5incz85NVn43mG5KkPSK9pgzh00E966NRQz');

// Import application helpers
const {
    return_flight_search_obj, 
    return_order_payload  
} = require("../helpers/construct_search_obj");
const { 
    setBookingIntentStatuses,
    getDataProvider,
} = require("../helpers/general");
const { markup, get_price_markup } = require("../helpers/Prices");
const { send_email } = require('../helpers/Email');
const { make_post_request, make_get_request } = require("../fetch_request/fetch_request");
const { getOcApiHost }  = require("../environment");

class SalesProfitSplitterEngine {

    constructor({oc_user_id, booking_record, data_provider, agent_profits, booking_intent, payment_intent, product_type}) {
        try{
            this.statuses = {
                initiated: "initiated",
                succeeded: "succeeded",
                failed: "failed"
            }
            this.record = new SalesProfitSplitterEngineLog({
                oc_user_id,
                booking_record,
                order_record: null,
                ticket_record: null,
                data_provider,
                agent_profits,
                booking_intent,
                payment_intent,
                customer_payment_method_details: null,
                customer_charging_status: this.statuses.initiated,
                item_booking_status: this.statuses.initiated,
                agent_profits_payment_status: this.statuses.initiated,
                product_type,
                has_major_error: false,
                any_errors: [],
            });
        }catch(e){
            console.log("Stage 0 - constructor error:", e.message)
            this.record = {
                has_major_error: true,
                any_errors: [{
                    stage: "Stage 0 - Constructor Error",
                    message: "Initial Object Construction Failed",
                }]
            }
        }
    }

    // 1. Initial DB Record
    async log_before_sale() {
        try{
            this.record = await this.record.save();
            if(!this?.record?._id){
                throw new Error("Saving Initial Object to DB Failed");
            }
        }catch(e){
            console.log("Stage 1 - initial log record error:", e.message);
            this.record.has_major_error=true;
            this.record.any_errors.push({
                stage: "Stage 1 - DB Record Creation",
                message: e.message,
            });
        }
        return this;
    }

    // 2. Charging the customer
    async charge_customer() {
        try{
            const bi = this.record.booking_intent;
            const paymentIntent = this.record.payment_intent;
            const booking = this.record.booking_record;
            const intent = await stripe.paymentIntents.capture(paymentIntent?.id);

            let _status = "";
            if(intent?.status==="succeeded"){
                _status=this.statuses.succeeded;
            }else{
                const _message = "The Sales-Profit Splitter Engine Failed at Charging Customer";
                _status=this.statuses.failed;

                /*this.record.any_errors.push({
                    stage: "Stage 2 - Charging Customer",
                    message: _message,
                });*/

                setBookingIntentStatuses(bi._id, "failed", paymentIntent?.status, "", true, {
                    message: _message
                });

                //Send Email to Admins
                let _html2 = `
                    ____________Payment Intent____________________
                    <br/>
                    ${JSON.stringify(paymentIntent)}
                    <br/>
                    ____________Booking Details____________________
                    <br/>
                    ${JSON.stringify(booking)}
                `;
                const msg_obj = {
                    to: constants.email.admins_to,
                    from: constants.email.automated_from,
                    subject: ("Welldugo - "+_message),
                    text: "See Details Below:\n",
                    html: _html2,
                };
                send_email(msg_obj);

                throw new Error(_message);
            }

            this.record.payment_intent=intent;
            this.record.customer_charging_status=_status;

        }catch(e){
            console.log("Stage 2 - Customer charging error:", e.message);
            this.record.has_major_error=true;
            this.record.any_errors.push({
                stage: "Stage 2 - Charging Customer",
                message: e.message,
            });
        }
        return this;
    }

    // 3. Booking the Item for Customer
    async book_item() {
        try{
            const data_provider = this.record.data_provider;
            const bi = this.record.booking_intent;
            const intent = this.record.payment_intent;
            const booking = this.record.booking_record;
            const payload= this.record.booking_record;

            let flight_order=null;
            let _status = "";

            if(data_provider?.toUpperCase()===constants.duffel){
                // 2.1 Create order from Duffel
                flight_order = await require("../flight_providers/duffel").createOrder(payload);
            }else if(data_provider?.toUpperCase()===constants.amadeus){
                // 2.1 Create order from Duffel
                flight_order = await require("../flight_providers/amadeus").createOrder(payload);
            }else{
                _status=this?.statuses?.failed;
                //res.status(500);
                throw new Error("No data provider has been set");
            }

            if(flight_order?.data?.id){
                _status=this.statuses.succeeded;
                setBookingIntentStatuses(bi._id, "confirmed", intent?.status, flight_order?.data?.id);
                
                //Send email to admins for Booking and Payment Success
                let _html = JSON.stringify(intent);
                _html += `<br/><br/>${JSON.stringify(flight_order)}`;

                const intent_sccs_msg = {
                    to: constants.email.admins_to,
                    from: constants.email.automated_from,
                    subject: "Welldugo - Payment Success & Booking Confirmed",
                    text: "Captured Payment And Booking Details Below:\n",
                    html: _html,
                };
                send_email(intent_sccs_msg);
            }else{
                const _message = "The Sales-Profit Splitter Engine Failed at Ordering Flight";
                _status=this?.statuses?.failed;

                setBookingIntentStatuses(bi._id, _status, intent?.status, flight_order?.data?.id, true, {
                    message: _message
                });

                //Send Email to Admins
                let _html2 = `
                    ____________Payment Intent____________________
                    <br/>
                    ${JSON.stringify(intent)}
                    <br/>
                    ____________Booking Details____________________
                    <br/>
                    ${JSON.stringify(booking)}
                `;
                const msg_obj = {
                    to: constants.email.admins_to,
                    from: constants.email.automated_from,
                    subject: ("Welldugo - "+_message),
                    text: "See Details Below:\n",
                    html: _html2,
                };
                send_email(msg_obj);

                throw new Error(_message);
            }

            this.record.order_record=flight_order;
            this.record.item_booking_status=_status;
            
        }catch(e){
            console.log("Stage 3 - Item booking error:", e.message);
            this.record.has_major_error=true;
            this?.record?.any_errors.push({
                stage: "Stage 3 - Booking Item",
                message: e.message,
            });
        }
        return this;
    }

    // 4. Paying Agent Profit from the Sale
    async pay_agent() {
        try{
            this.record = {};
        }catch(e){
            console.log("Stage 4 - Paying agent error:", e.message);
            this.record.has_major_error=true;
            this?.record?.any_errors.push({
                stage: "Stage 4 - Paying Agent",
                message: e.message,
            });
        }
        return this;
    }

    // 5. Order Ticket
    async order_ticket_issueance() {
        try{
            this.record = {};
        }catch(e){
            console.log("Stage 5 - Order Ticket Issuance:", e.message);
            this.record.has_major_error=true;
            this?.record?.any_errors.push({
                stage: "Stage 5 - Order Ticket Issuance",
                message: e.message,
            });
        }
        return this;
    }

    // 6. Finalizing DB Record.
    async log_after_sale() {
        try{
            let __updated = new SalesProfitSplitterEngine(this?.record);
            this.record = await __updated?.save();
            if(!this?.record?._id){
                // Special Error Here - DB not Updated with new information.
            }
        }catch(e){
            console.log("Stage 6 - Finalizing DB record error:", e.message)
            // Special Error Here - DB not Updated with new information.
        }
        return this;
    }
    
};


// Test here
const SPFE = new SalesProfitSplitterEngine({});
(async () => {
    await SPFE.log_before_sale()
    await SPFE.charge_customer()
    await SPFE.book_item()
    await SPFE.pay_agent()
    await SPFE.log_after_sale();
})()

module.exports = SalesProfitSplitterEngine;