const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MoverSchema = new Schema({
    name:String,
    email:String,
    username:String,
});

module.exports = mongoose.model('mover', MoverSchema);