const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TruckerSchema = new Schema({
    name: String,
    location:String,
});

module.exports = mongoose.model('trucker', TruckerSchema);