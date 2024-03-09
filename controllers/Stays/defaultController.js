const constants = require("../../constants");

// Import application helpers
const { return_hotel_search_obj  } = require("../../helpers/construct_search_obj");

const get_stays = async(req, res, next)=>{
    //console.log(req.body);
    console.log(return_hotel_search_obj(req.body));
    //console.log("Currency:", req.body.currency);
    let stays;
    try{
        if(process.env.DATA_PROVIDER===constants.duffel){
            stays = await require("../../stay_providers/duffel").searchStays(return_hotel_search_obj(req.body));
            res.status(200).json(stays);
        }else{
            res.status(500);
            throw new Error("No data provider has been set");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

const get_rooms_and_rates = async(req, res, next)=>{
    let rates;
    try{
        if(process.env.DATA_PROVIDER===constants.duffel){
            rates = await require("../../stay_providers/duffel")
                        .get_all_available_rooms_and_rates((req.params.id));
            res.status(200).json(rates);
        }else{
            res.status(500);
            throw new Error("No data provider has been set");
        }
    }catch(e){
        console.log(e);
        res.status(500).send(e);
    }
}

module.exports = {
    get_stays,
    get_rooms_and_rates
}