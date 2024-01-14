let CONSTANTS = require("../constants");
const { 
    make_get_request, 
    make_post_request 
} = require("../fetch_request/fetch_request");

const make_url = (params, host=CONSTANTS.weather.providers.open_meteo) => {
    let long=params.longitude;
    let lat=params.latitude;
    let url="";
    if(host===CONSTANTS.weather.providers.open_meteo){
        url=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`;
    }
    return url;
}

const get_weather_data = async (params) => {
    if(
        !params?.longitude || !params?.latitude
    ){
        return {
            error: true,
            message: "Longitude and Latitude were not specified"
        }
    }
    let url = make_url({
        longitude: params?.longitude, //"52.52",
        latitude: params?.latitude, //"13.41",
    });
    const data = await make_get_request(url);;
    return data;
}


//https://open-meteo.com/en/docs/#hourly=temperature_2m,apparent_temperature,precipitation,rain,showers,snowfall,snow_depth&daily=daylight_duration,sunshine_duration&temperature_unit=fahrenheit&start_date=2024-01-19&end_date=2024-01-19&time_mode=time_interval


module.exports = {
    make_url,
    get_weather_data
}