const  express = require( "express");
const user = require("../controllers/users");

const router = express.Router();


router.get('/login', user.renderLogin);

router.get('/register',user.renderRegister );