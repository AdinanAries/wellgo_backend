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

    const lon = (req?.params?.longitude+"");
    const lat = (req?.params?.latitude+"");
    let lon_parts = lon.split(".");
    let lat_parts = lat.split(".");
    const FOUND_CITIES=[];
    const FIRST_FILTER=[]; // Will contain subset for further filtering
    for(let i=0; i<WORLD_CITIES.length; i++){
        let city_lon_parts = (WORLD_CITIES[i].lng+"").split(".");
        let city_lat_parts = (WORLD_CITIES[i].lat+"").split(".")
        if(
            city_lon_parts[0] === lon_parts[0] &&
            city_lat_parts[0] === lat_parts[0]
        ){
            FIRST_FILTER.push(WORLD_CITIES[i]);
        }
    }

    // First pass through
    for(let i=0; i<FIRST_FILTER.length; i++){
        let city_lon_parts = (FIRST_FILTER[i].lng+"").split(".");
        let city_lat_parts = (FIRST_FILTER[i].lat+"").split(".")
        if(city_lon_parts[0] === lon_parts[0]
            &&  city_lat_parts[0] === lat_parts[0]
            &&  (city_lon_parts[1].startsWith(lon_parts[1].substring(0,4))
                || city_lat_parts[1].startsWith(lat_parts[1].substring(0,4))
            )
        ){
            FOUND_CITIES.push(FIRST_FILTER[i]);
        }
    }

    // Second pass through
    if(FOUND_CITIES.length<1){
            for(let i=0; i<FIRST_FILTER.length; i++){
                let city_lon_parts = (FIRST_FILTER[i].lng+"").split(".");
                let city_lat_parts = (FIRST_FILTER[i].lat+"").split(".")
                if(city_lon_parts[0] === lon_parts[0]
                    &&  city_lat_parts[0] === lat_parts[0]
                    &&  (city_lon_parts[1].startsWith(lon_parts[1].substring(0,3))
                        || city_lat_parts[1].startsWith(lat_parts[1].substring(0,3))
                    )
                ){
                    FOUND_CITIES.push(FIRST_FILTER[i]);
                }
            }
    }

    // Third pass through
    if(FOUND_CITIES.length<1){
        for(let i=0; i<FIRST_FILTER.length; i++){
            let city_lon_parts = (FIRST_FILTER[i].lng+"").split(".");
            let city_lat_parts = (FIRST_FILTER[i].lat+"").split(".")
            if(city_lon_parts[0] === lon_parts[0]
                &&  city_lat_parts[0] === lat_parts[0]
                &&  (city_lon_parts[1].startsWith(lon_parts[1].substring(0,2))
                    || city_lat_parts[1].startsWith(lat_parts[1].substring(0,2))
                )
            ){
                FOUND_CITIES.push(FIRST_FILTER[i]);
            }
        }
    }

    // Fourth pass through
    if(FOUND_CITIES.length<1){
        for(let i=0; i<FIRST_FILTER.length; i++){
            let city_lon_parts = (FIRST_FILTER[i].lng+"").split(".");
            let city_lat_parts = (FIRST_FILTER[i].lat+"").split(".")
            if(city_lon_parts[0] === lon_parts[0]
                &&  city_lat_parts[0] === lat_parts[0]
                &&  (city_lon_parts[1].startsWith(lon_parts[1].substring(0,1))
                    || city_lat_parts[1].startsWith(lat_parts[1].substring(0,2))
                )
            ){
                FOUND_CITIES.push(FIRST_FILTER[i]);
            }
        }
    }

    // Fifth pass through
    if(FOUND_CITIES.length<1){
        for(let i=0; i<FIRST_FILTER.length; i++){
            let city_lon_parts = (FIRST_FILTER[i].lng+"").split(".");
            let city_lat_parts = (FIRST_FILTER[i].lat+"").split(".")
            if(city_lon_parts[0] === lon_parts[0]
                &&  city_lat_parts[0] === lat_parts[0]
                &&  (city_lon_parts[1].startsWith(lon_parts[1].substring(0,1))
                    || city_lat_parts[1].startsWith(lat_parts[1].substring(0,1))
                )
            ){
                FOUND_CITIES.push(FIRST_FILTER[i]);
            }
        }
    }

    if(FOUND_CITIES.length<1){
        FOUND_CITIES=[...FIRST_FILTER]; // Main filter if subsequent filters did not return anything
    }

    res.status(201).send(FOUND_CITIES);

}

module.exports = {
    getWeather,
    getCity,
}