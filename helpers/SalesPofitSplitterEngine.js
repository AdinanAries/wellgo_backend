// Sales-Profit Splitter Engine
const SalesProfitSplitterEngineLog = require("../models/salesProfitSplitterEngineLog");

class SalesProfitSplitterEngine {

    constructor({oc_user_id, booking_record, data_provider, agent_profits}) {

        this.statuses = {
            initiated: "initiated",
            succeeded: "succeeded",
            failed: "failed"
        }

        this.record = new SalesProfitSplitterEngineLog({
            oc_user_id,
            booking_record,
            data_provider,
            agent_profits,
            customer_payment_method_details: null,
            customer_charging_status: this.statuses.initiated,
            item_booking_status: this.statuses.initiated,
            agent_profits_payment_status: this.statuses.initiated,
        });
    }

    // 1. Initial DB Record
    async log_before_sale() {
        this.record = await this.record.save();
        return this;
    }

    // 2. Charging the customer
    async charge_customer() {
        return this;
    }

    // 3. Booking the Item for Customer
    async book_item() {
        return this;
    }

    // 4. Paying Agent Profit from the Sale
    async pay_agent() {
        return this;
    }

    // 5. Finalizing DB Record.
    async log_after_sale() {
        return this;
    }
    
};

module.exports = SalesProfitSplitterEngine;