const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    username: String,
    googleId: String,
    img: String
})

module.exports = mongoose.model("User", UserSchema);