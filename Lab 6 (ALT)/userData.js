const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    uname: String,
    pass: String,
    age: Number,
    email: String,
    files: [{type: String}]
})
// userData must be SINGULAR!!
const userModel = mongoose.model('userData', userSchema);
module.exports = userModel;