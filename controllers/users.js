

module.exports.renderLogin = async(req,res)=>{
    res.render("users/login");
}

module.exports.renderRegister = async(req,res)=>{
    res.render("users/register");
}