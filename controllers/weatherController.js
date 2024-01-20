const { get_and_preprocess_weather_data } = require("../helpers/weather");
const fs = require("fs");
const { parse } = require("csv-parse");

const WORLD_CITIES=[];
let isHeaderRow=true;
let HEADERS=[];
fs.createReadStream("./data/worldcities.csv")
  .pipe(parse({ delimiter: ",", from_line: 1 }))
  .on("data", function (row) {
    //console.log(row);
    if(isHeaderRow){
        HEADERS=row;
        isHeaderRow=false;
    }else{
        let obj={};
        for(let i=0; i<row.length; i++){
            obj[HEADERS[i]]=row[i];
        }
        WORLD_CITIES.push(obj);
    }

    
  })
  .on("end", function () {
    console.log("finished");
    console.log(WORLD_CITIES[0]);
    console.log(WORLD_CITIES[1]);
  })
  .on("error", function (error) {
    console.log(error.message);
  });

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

const getCity = async (req, res, next) => {
    if(!req?.params?.longitude || !req?.params?.latitude){
        res.status(401).send({
            error: true,
            message: "longitude and latitude not specified"
        });
        return
    }

    const lon = req?.params?.longitude;
    const lat = req?.params?.latitude;

    const FOUND_CITIES=[];
    for(let i=0; i<WORLD_CITIES.length; i++){
        if(
            parseFloat(WORLD_CITIES[i].lng).toString().startsWith(parseFloat(lon).toString().substring(0,4))
            && parseFloat(WORLD_CITIES[i].lat).toString().startsWith(parseFloat(lat).toString().substring(0,4))
        ){
            FOUND_CITIES.push(WORLD_CITIES[i]);
        }
    }

    res.status(201).send(FOUND_CITIES);

}

module.exports = {
    getWeather,
    getCity,
}