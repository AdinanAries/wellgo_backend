const mongoose = require('mongoose');

const Schema = mongoose.Schema;
/*const bcrypt = require("bcrypt");
const bcryptSalt = process.env.BCRYPT_SALT;*/

const userSchema = new Schema({
    first_name: {
        type: String,
        required: [true, "Please add first name"]
    },
    middle_name: {
        type: String,
        required: false
    },
    last_name: {
        type: String,
        required: [true, "Pleae add last name"],
    },
    dob: {
        type: String,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: [true, "Please add phone"]
    },
    email: {
        type: String,
        required: [true, "Please add email address"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please add password"]
    },
    imageUrl: {
        type: String,
        required: false
   }
},
{
    timestamps: true
});

/*userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
    const hash = await bcrypt.hash(this.password, Number(bcryptSalt));
    this.password = hash;
    next();
  });*/

module.exports = mongoose.model('User', userSchema);
