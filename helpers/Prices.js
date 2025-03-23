const CustAppServerSettings = require("../models/custAppServerSettings");
const PERCENTAGE=require("../constants").price_markup_percentage;

const markup = (price, percentage=PERCENTAGE) => {
    let f_price=parseFloat(price);
    let markup = ((percentage/100) * f_price);
    let new_price = f_price + markup;
    return {
        percentage,
        markup,
        f_price,
        new_price,
    }
}

const get_price_markup_percentage = async () => {
    let markup = 0;
    let custAppSettings = await CustAppServerSettings.find({}).catch(err => {
        console.log(err);
    });
    for (let i=0; i<custAppSettings.length; i++) {
        if(custAppSettings[i].property==="price_markup"){
            markup = custAppSettings[i].value;
        }
    }
    return markup;
}

module.exports = {
    markup,
    get_price_markup_percentage
}