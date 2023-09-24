const constants = require("../constants");
const { Duffel } = require('@duffel/api');

const DUFFEL_ACCESS_TOKEN = process.env.DUFFEL_API_TOKEN;
const duffel = new Duffel({
    token: DUFFEL_ACCESS_TOKEN
});

//Application Helpers
//Flight Search Object Function
const { return_flight_search_obj } = require("../helpers/construct_search_obj");

const get_flights = async(req, res, next)=>{
    
    let offers;

    try{
        if(process.env.DATA_PROVIDER===constants.duffel){
            offers= await duffel.offerRequests.create(return_flight_search_obj());
        }else{
            //Error message here
        }
        console.log(offers);
        res.send('success');
    }catch(e){
        console.log(e);
        res.send("fail");
    }
    
}

module.exports = {
    get_flights
}