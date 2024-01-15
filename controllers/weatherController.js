const { get_and_preprocess_weather_data } = require("../helpers/weather");

const getWeather = async (req, res, next) => {
    let params = req.params; // Should have logitudes and latitudes
    let dates = {
        start: params.start_date,
        end: params.end_date
    }
    console.log(params);
    let weather = await get_and_preprocess_weather_data(params, dates);
    res.status(201).send(weather);
}

module.exports = {
    getWeather,
}