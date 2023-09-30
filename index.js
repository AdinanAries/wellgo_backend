const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();

// Error Handler
const { errorHandler } = require("./middlewares/errorMiddleware");

// Port
const PORT = process.env.PORT || 4000;

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/flights", require("./routes/flightRoutes"));
app.use("/", (req, res, next)=>{res.send("it works!")})

// Use Error Handler
app.use(errorHandler);

// Use Cors
app.use(cors({
    origin: '*'
}));

// Run Server
app.listen(PORT, ()=>console.log(`server started on port ${PORT}`));