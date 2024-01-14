const { get_weather_data } = require("../helpers/weather");

const getWeather = async (req, res, next) => {
    let params = req.params; // Should have logitudes and latitudes
    let weather = await get_weather_data(params);
    req.status(201).send(weather);
}

module.exports = {
    getWeather,
}