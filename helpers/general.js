const BookingIntentLog = require("../models/bookingIntentLog");

const setBookingIntentStatuses = async (id, booking_status, payment_status, isError=false, errObj={}) => {
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