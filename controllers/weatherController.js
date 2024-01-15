const { get_and_preprocess_weather_data } = require("../helpers/weather");

const getWeather = async (req, res, next) => {
    try{
        let params = req.params; // Should have logitudes and latitudes
        // Checking if Longitude and Latitude exists
        if(
            !params?.longitude || !params?.latitude
        ){
            res.status(400).send({
                error: true,
                message: "Longitude and Latitude were not specified"
            });
            return;
        }
        
        let dates = {
            start: params.start_date,
            end: params.end_date
        }
        // Checking if Dates Exist
        if(
            !dates?.start || !dates?.end
        ){
            res.status(400).send({
                error: true,
                message: "Start and End dates were not specified"
            });
            return;
        }
        let weather = await get_and_preprocess_weather_data(params, dates);
        res.status(201).send(weather);
    }catch(e){
        res.status(500).send({
            error: true,
            status: 500,
            message: "Server Error"
        })
    }
}

module.exports = {
    getWeather,
}