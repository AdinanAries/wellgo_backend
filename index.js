const express = require('express');
const { Duffel } = require('@duffel/api');
require('dotenv').config();
const app = express();

//Flight Search Object Function
const { return_flight_search_obj } = require("./helpers/construct_search_obj");

const DUFFEL_ACCESS_TOKEN = process.env.DUFFEL_API_TOKEN;
const duffel = new Duffel({
    token: DUFFEL_ACCESS_TOKEN
});

app.get("/", async(req, res, next)=>{
    
    try{
        let offers= await duffel.offerRequests.create(return_flight_search_obj());
        console.log(offers);
        res.send('success');
    }catch(e){
        console.log(e);
        res.send("fail");
    }
    
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log(`server started on port ${PORT}`));