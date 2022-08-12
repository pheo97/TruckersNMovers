const mongoose = require('mongoose');
const Trucker = require('../models/trucker');
const {firstname,lastname} = require('./NameHelpers');



mongoose.connect('mongodb://localhost:27017/truckers-n-movers',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console,"connection error:"));
db.once("open",() =>{
    console.log("Database connected");
});

const sample = array => array[ Math.floor(Math.random() * array.length)];

const seedDB = async () =>{
   await Trucker.deleteMany();
   for(let i = 0; i < 50; i++){
    const rand10 = Math.floor(Math.random() * 12);
    const newTrucker = new Trucker({
        name:`${sample(firstname)},${sample(lastname)}`,
        username:'Kanye1',
        email:'kanye@gmail.com',
        location:'Johannesburg',
    })
    await newTrucker.save();
   };
};

seedDB().then(()=>{
    mongoose.connection.close();
});