const express = require('express');
const { Duffel } = require('@duffel/api');
require('dotenv').config();
const app = express();

const DUFFEL_ACCESS_TOKEN = process.env.DUFFEL_API_TOKEN;
const duffel = new Duffel({
    token: DUFFEL_ACCESS_TOKEN
});

app.get("/", async(req, res, next)=>{
    
    try{
        let offers= await duffel.offerRequests.create({
            "return_offers": false,
            "supplier_timeout": 10000,
            "slices": [
                {
                    "origin": "LHR",
                    "destination": "JFK",
                    "departure_time": {
                        "to": "17:00",
                        "from": "09:45"
                    },
                    "departure_date": "2023-12-24",
                    "arrival_time": {
                        "to": "17:00",
                        "from": "09:45"
                    }
                }
            ],
            "private_fares": {
                "QF": [
                    {
                        "corporate_code": "FLX53",
                        "tracking_reference": "ABN:2345678"
                    }
                ],
                "UA": [
                    {
                        "corporate_code": "1234",
                        "tour_code": "578DFL"
                    }
                ]
            },
            "passengers": [
                {
                    "family_name": "Earhart",
                    "given_name": "Amelia",
                    "loyalty_programme_accounts": [
                        {
                        "account_number": "12901014",
                        "airline_iata_code": "BA"
                        }
                    ],
                    "type": "adult"
                },
                {
                    "age": 14
                },
                {
                    "fare_type": "student"
                },
                {
                    "age": 5,
                    "fare_type": "contract_bulk_child"
                }
            ],
            "max_connections": 0,
            "cabin_class": "economy"
        });
        console.log(offers);
        res.send('success');
    }catch(e){
        console.log(e);
        res.send("fail");
    }
    
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log(`server started on port ${PORT}`));