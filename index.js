const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const mongoose = require("mongoose");

// Connect to DB
mongoose
  .connect(process.env.MONGO_DB_URL)
  .then((result) => {
    console.log('Database Connected!');
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
});

// Error Handler
const { errorHandler } = require("./middlewares/errorMiddleware");

// Port
const PORT = process.env.PORT || 4000;

// Use Cors
app.use(cors({
    origin: '*'
}));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Flights Routes
app.use("/api/flights", require("./routes/flightRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/passports", require("./routes/passportRoutes"));
app.use("/api/payment-cards", require("./routes/paymentCardRoutes"));
app.use("/api/sessions", require("./routes/sessionRoutes"));
app.use("/api/activities", require("./routes/activityRoutes"));
app.use("/api/rated-places", require("./routes/ratedPlacesRoutes"));
app.use("/api/weather", require("./routes/weatherRoutes"));
app.use("/api/tourism", require("./routes/tourismRoutes"));
app.use("/api/email", require("./routes/emailRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));

// Stays Routes
app.use("/api/stays", require("./routes/Stays/defaultRoutes"));

// Fallback Routes
app.use("/", (req, res, next)=>{res.send("Server Works")});

// Use Error Handler
app.use(errorHandler);

// Run Server
app.listen(PORT, ()=>console.log(`server started on port ${PORT}`));