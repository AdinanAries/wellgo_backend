const CustAppServerSettings = require("../models/custAppServerSettings");
const CONSTANTS=require("../constants");

const markup = (price, percentage_or_flat_rate_amount=CONSTANTS.price_markup_percentage, type=CONSTANTS.price_markup_types.percentage) => {
    let f_price=parseFloat(price);
    let markup=0
    if(type===CONSTANTS.price_markup_types.percentage){
        markup = ((percentage_or_flat_rate_amount/100) * f_price);
    }else if(type===CONSTANTS.price_markup_types.flat_rate){
        markup = percentage_or_flat_rate_amount;
    }
    let new_price = f_price + markup;
    return {
        type,
        markup_by: percentage_or_flat_rate_amount,
        markup,
        f_price,
        new_price,
    }
}

const get_price_markup = async () => {
    let _pm_obj = {
        type: CONSTANTS.price_markup_types.percentage,
        value: CONSTANTS.price_markup_percentage,
    };
    let custAppSettings = await CustAppServerSettings.find({}).catch(err => {
        console.log(err);
    });
    for (let i=0; i<custAppSettings.length; i++) {
         if(custAppSettings[i].property==="profit_type"){
            _pm_obj.type = custAppSettings[i].value;
        }
        if(custAppSettings[i].property==="price_markup" && _pm_obj.type==="price_markup"){
            _pm_obj.value = custAppSettings[i].value;
        }
        if(custAppSettings[i].property==="flat_rate" && _pm_obj.type==="flat_rate"){
            _pm_obj.value = custAppSettings[i].value;
        }
    }
    return _pm_obj;
}

module.exports = {
    markup,
    get_price_markup
}