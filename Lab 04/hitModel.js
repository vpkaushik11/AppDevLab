const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const hitValue = new Schema({
    hit: Number
})

const hitModel = mongoose.model('hitModel', hitValue);
module.exports = hitModel;