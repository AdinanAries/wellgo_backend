const BookingIntentLog = require("../models/bookingIntentLog");
const CustAppServerSettings = require("../models/custAppServerSettings");
const CONSTANTS = require("../constants");
const { getOcApiHost } = require("../environment");
const { make_get_request } = require("../fetch_request/fetch_request");

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

const generateRandomCode = (size=6, type='numeric') => {
  let upper = "1";
  let lower = "9";
  for(let i=1; i<size; i++){
    upper+="0";
    lower+="0";
  }
  if(type==='numeric'){
    upper = parseInt(upper);
    lower = parseInt(lower);
  }
  let randomNumber = Math.floor(lower + Math.random() * upper);

  return randomNumber;
}

const getDataProvider = async (agent_id) => {
    let dataProvider = "";
        if(agent_id){
            let path = "\\api\\agents\\public\\data-provider\\";
            let url = (getOcApiHost()+path+agent_id);
            let _res = await make_get_request(url);
            if(_res?.value){
                dataProvider = _res.value;
            } 
        } else {
            let _settings = await CustAppServerSettings.findOne({
                property: "flights_data_provider",
            }).catch(err => {
                console.log(err);
            });
            if(_settings?.value){
                dataProvider = _settings.value;
            }
        }
        return dataProvider;
}

module.exports = {
    setBookingIntentStatuses,
    generateRandomCode,
    getDataProvider,
}
