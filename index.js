const express = require('express');
require('dotenv').config();
const app = express();

//Application Routes
app.use("/api/flights", require("./routes/flightRoutes"));
app.use("/", (req, res, next)=>{res.send("it works!")})

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=>console.log(`server started on port ${PORT}`));