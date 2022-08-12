const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    username:String,
    email:String,
    roles:{
        type:{
            type:String,
            enum:['mover','trucker']
        }
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('user', userSchema);