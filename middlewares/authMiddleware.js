const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");

const protect = asyncHandler(async (req, res, next)=>{
   let token;
   if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
      try{

         token = req.headers.authorization.split(" ")[1];

         // Verify the token
         const decoded = jwt.verify(token, process.env.JWT_SECRETE);

         // Get User from the token
         req.user = await User.findById(decoded.id).select("-password");

         next();
      } catch(err) {
         console.log(err);
         res.status(401);
         res.send({message: "Not authorized", status: 401});
         //throw new Error('Not authorized')
      }
   }

   if(!token){
      res.status(401);
      res.send({messge: "Not authorized, no token", status: 401});
   }
});

module.exports = {
   protect
}
