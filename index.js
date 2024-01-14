const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const mongoose = require("mongoose");

// For testing
const { make_get_request, make_post_request } = require("./fetch_request/fetch_request");

(async()=>{
  // Example
  let todo = {
    userId: 123,
    title: "loren impsum doloris",
    completed: false
  }
  //const res = await make_get_request("https://jsonplaceholder.typicode.com/users");
  const res = await make_post_request("https://jsonplaceholder.typicode.com/todos" , todo)
  console.log(res);
})();


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

// Routes
app.use("/api/flights", require("./routes/flightRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/passports", require("./routes/passportRoutes"));
app.use("/api/payment-cards", require("./routes/paymentCardRoutes"));
app.use("/api/sessions", require("./routes/sessionRoutes"));
app.use("/api/activities", require("./routes/activityRoutes"));
app.use("/api/rated-places", require("./routes/ratedPlacesRoutes"));
app.use("/", (req, res, next)=>{res.send("Oops! This route doesn't exist")});

// Use Error Handler
app.use(errorHandler);

// Run Server
app.listen(PORT, ()=>console.log(`server started on port ${PORT}`));