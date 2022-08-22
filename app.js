const express = require('express');
const ejsmate = require('ejs-mate');
const mongoose = require('mongoose')
const trucker = require('./controllers/trucker')
const path = require('path');
const methodOverride = require('method-override');
const ExpressError = require('./utilities/expressError');
const flash = require('connect-flash');

const passport = require('passport');
const localStrategy = require('passport-local');
const session = require('express-session');

const modelUser = require('./models/user');
const controllerUser = require('./controllers/users');



const app = express();
const router = express.Router();

app.engine('ejs',ejsmate);
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname,'views')));

app.use(express.urlencoded( { extended:true} ));
app.use(methodOverride('_method'));
app.use(flash());

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

passport.use(new localStrategy(modelUser.authenticate()))

passport.serializeUser(modelUser.serializeUser());
passport.deserializeUser(modelUser.deserializeUser());


app.use((req, res, next) => {
    console.log(req.body)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})



app.get('/', (req,res) =>{
    res.send("HOME");
});

router.use((req, res, next) => {
    console.log('Time:', Date.now())
    next()
  });



app.get('/truckers', trucker.renderTruckers);

app.get('/truckers/:id', trucker.renderTrucker);

app.get('/truckers/:id/edit', trucker.renderEditTrucker);

app.put('/truckers/:id', trucker.updateTrucker);

app.get('/login', controllerUser.renderLogin);

app.post('/register', controllerUser.register);

app.get('/register', controllerUser.renderRegister);

app.post('/login', passport.authenticate('local',{ failureFlash:true , failureRedirect:'/login'}), controllerUser.login);

app.get('/logout', controllerUser.logout);


app.listen(3000, (req,res) =>{
    console.log('Listening on Port 3000');
});