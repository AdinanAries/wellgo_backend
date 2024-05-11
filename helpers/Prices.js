const PERCENTAGE=15;

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

module.exports = {
    markup
}