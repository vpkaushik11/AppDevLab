const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    uname: String,
    pass: String,
    age: Number,
    email: String
})
// userDetail must be SINGULAR!!
const userModel = mongoose.model('userDetail', userSchema);
module.exports = userModel;