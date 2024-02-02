const BookingIntentLog = require("../models/bookingIntentLog");

const setBookingIntentStatuses = async (id, booking_status, payment_status, booking_order_id="", isError=false, errObj={}) => {
    try{
        let bi = await BookingIntentLog.findById(id);

        if(!bi){
            return{
                message: "booking intent not found"
            }
        }

        // Updating booking intent information    
        bi.booking_status = booking_status;
        bi.payment_status = payment_status;

        // Adding booking order id
        if(booking_order_id){
            bi.booking_order.id=booking_order_id;
        }

        // Clearing Errors
        if(!isError){
            bi.is_error=false;
            bi.error_activity_description="";
        }
        if(isError){
            bi.is_error=true;
            bi.error_activity_description=errObj.message;
        }

        const updated_bi = new BookingIntentLog(bi);
        updated_bi.save().then((result) => {
            return result
        }).catch((err) => {
            return{
                message: err.message
            };
        });
    }catch(e){
        return {
            message: "Server Error"
        }
    }
}


module.exports = {
    setBookingIntentStatuses,
}