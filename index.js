const express = require('express');
require('dotenv').config();
const app = express();

// Error Handler
const { errorHandler } = require("./middlewares/errorMiddleware");

// Port
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/flights", require("./routes/flightRoutes"));
app.use("/", (req, res, next)=>{res.send("it works!")})

// Use Error Handler
app.use(errorHandler);

// Run Server
app.listen(PORT, ()=>console.log(`server started on port ${PORT}`));