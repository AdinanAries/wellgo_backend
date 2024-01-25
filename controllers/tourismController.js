const fs = require("fs");
const { parse } = require("csv-parse");

const TOURIST_ATTRACTIONS=[];
let isHeaderRow=true;
let HEADERS=[];
fs.createReadStream("./data/touristattractions.csv")
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
        TOURIST_ATTRACTIONS.push(obj);
    }

    
  })
  .on("end", function () {
    console.log("finished");
    console.log(TOURIST_ATTRACTIONS[0]);
    console.log(TOURIST_ATTRACTIONS[1]);
  })
  .on("error", function (error) {
    console.log(error.message);
  });

const getTouristAttraction = (req, res, next) => {
    try{
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
        const FOUND_ATTRACTIONS=[];
        const FIRST_FILTER=[]; // Will contain subset for further filtering
        for(let i=0; i<TOURIST_ATTRACTIONS.length; i++){
            let city_lon_parts = (TOURIST_ATTRACTIONS[i].lng+"").split(".");
            let city_lat_parts = (TOURIST_ATTRACTIONS[i].lat+"").split(".")
            if(
                city_lon_parts[0] === lon_parts[0] &&
                city_lat_parts[0] === lat_parts[0]
            ){
                FIRST_FILTER.push(TOURIST_ATTRACTIONS[i]);
            }
        }

        // First pass through
        for(let i=0; i<FIRST_FILTER.length; i++){
            let city_lon_parts = (FIRST_FILTER[i].lng+"").split(".");
            let city_lat_parts = (FIRST_FILTER[i].lat+"").split(".")
            if(city_lon_parts[0] === lon_parts[0]
                &&  city_lat_parts[0] === lat_parts[0]
                &&  (city_lon_parts[1].startsWith(lon_parts[1].substring(0,5))
                    || city_lat_parts[1].startsWith(lat_parts[1].substring(0,5))
                )
            ){
                FOUND_ATTRACTIONS.push(FIRST_FILTER[i]);
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
                FOUND_ATTRACTIONS.push(FIRST_FILTER[i]);
            }
        }

        // Second pass through
        if(FOUND_ATTRACTIONS.length<1){
                for(let i=0; i<FIRST_FILTER.length; i++){
                    let city_lon_parts = (FIRST_FILTER[i].lng+"").split(".");
                    let city_lat_parts = (FIRST_FILTER[i].lat+"").split(".")
                    if(city_lon_parts[0] === lon_parts[0]
                        &&  city_lat_parts[0] === lat_parts[0]
                        &&  (city_lon_parts[1].startsWith(lon_parts[1].substring(0,3))
                            || city_lat_parts[1].startsWith(lat_parts[1].substring(0,3))
                        )
                    ){
                        FOUND_ATTRACTIONS.push(FIRST_FILTER[i]);
                    }
                }
        }

        // Third pass through
        if(FOUND_ATTRACTIONS.length<1){
            for(let i=0; i<FIRST_FILTER.length; i++){
                let city_lon_parts = (FIRST_FILTER[i].lng+"").split(".");
                let city_lat_parts = (FIRST_FILTER[i].lat+"").split(".")
                if(city_lon_parts[0] === lon_parts[0]
                    &&  city_lat_parts[0] === lat_parts[0]
                    &&  (city_lon_parts[1].startsWith(lon_parts[1].substring(0,2))
                        || city_lat_parts[1].startsWith(lat_parts[1].substring(0,2))
                    )
                ){
                    FOUND_ATTRACTIONS.push(FIRST_FILTER[i]);
                }
            }
        }

        // Fourth pass through
        if(FOUND_ATTRACTIONS.length<1){
            for(let i=0; i<FIRST_FILTER.length; i++){
                let city_lon_parts = (FIRST_FILTER[i].lng+"").split(".");
                let city_lat_parts = (FIRST_FILTER[i].lat+"").split(".")
                if(city_lon_parts[0] === lon_parts[0]
                    &&  city_lat_parts[0] === lat_parts[0]
                    &&  (city_lon_parts[1].startsWith(lon_parts[1].substring(0,1))
                        || city_lat_parts[1].startsWith(lat_parts[1].substring(0,2))
                    )
                ){
                    FOUND_ATTRACTIONS.push(FIRST_FILTER[i]);
                }
            }
        }

        // Fifth pass through
        if(FOUND_ATTRACTIONS.length<1){
            for(let i=0; i<FIRST_FILTER.length; i++){
                let city_lon_parts = (FIRST_FILTER[i].lng+"").split(".");
                let city_lat_parts = (FIRST_FILTER[i].lat+"").split(".")
                if(city_lon_parts[0] === lon_parts[0]
                    &&  city_lat_parts[0] === lat_parts[0]
                    &&  (city_lon_parts[1].startsWith(lon_parts[1].substring(0,1))
                        || city_lat_parts[1].startsWith(lat_parts[1].substring(0,1))
                    )
                ){
                    FOUND_ATTRACTIONS.push(FIRST_FILTER[i]);
                }
            }
        }

        if(FOUND_ATTRACTIONS.length<1){
            FOUND_ATTRACTIONS=[...FIRST_FILTER]; // Main filter if subsequent filters did not return anything
        }

        res.status(201).send(FOUND_ATTRACTIONS);
    }catch(e){
        res.status(500).send({
            error: true,
            status: 500,
            message: "Server Error"
        });
    }
}

module.exports = {
    getTouristAttraction,
}