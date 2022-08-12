const express = require('express');
const ejsmate = require('ejs-mate');
const mongoose = require('mongoose')
const trucker = require('./controllers/trucker')
const path = require('path');
const methodOverride = require('method-override');
const ExpressError = require('./utilities/expressError');

const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');

const User = require('./models/user');
const user = require('./controllers/users');



const app = express();
const router = express.Router();

app.engine('ejs',ejsmate);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'views')));

app.use(express.urlencoded( { extended:true} ));
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost:27017/truckers-n-movers',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind("connection error:"));
db.once('open',()=>{
    console.log("Database connected")
});

const sessionConfig = {
    name: 'session',
    secret: 'ThisIsAsecret',
    resave: false,
    saveUninitialized  : true,
    cookie:{
        httpOnly: true,
        //secure: true,
        expires:Date.now() * 1000 * 60 * 60 * 24 * 7,
        maxAge:1000 * 60 * 60 * 24 * 7
    }
};

app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get('/', (req,res) =>{
    res.send("HOME");
});

router.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  })



app.get('/truckers', trucker.renderTruckers);

app.get('/truckers/:id', trucker.renderTrucker);

app.get('/truckers/:id/edit', trucker.renderEditTrucker);

app.put('/truckers/:id', trucker.updateTrucker);

app.get('/login', user.renderLogin);

app.get('/register', user.renderRegister);






app.listen(3000, (req,res) =>{
    console.log('Listening on Port 3000');
});