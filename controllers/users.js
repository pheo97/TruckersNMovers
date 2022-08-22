const User = require('../models/user')



module.exports.renderRegister = async(req,res)=>{
    res.render("users/register");
}

module.exports.register = async( req, res, next) =>{
    try{
        const { email, password, username } = req.body;
        const user = new User({ email , username});
        const registeredUser = await User.register( user , password);
        console.log(registeredUser);
        req.login( registeredUser, err =>{
            if(err) return next(err);
            req.flash('success', 'Welcome to Truckers&Movers')
            res.redirect('/truckers');
        })
    }catch(e){
        console.log("failed to register")
        req.flash('error','User already Exits')
        res.redirect('/register');
    }
    
}

module.exports.login = async(req,res) =>{
    req.flash('success','Welcome to Truckers&Movers')
    res.redirect('/truckers');
}


module.exports.renderLogin = async(req,res)=>{
    res.render("users/login");
}

module.exports.logout = async(req,res) =>{
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
}

