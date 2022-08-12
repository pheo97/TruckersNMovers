const Trucker = require('../models/trucker');

module.exports.renderTruckers = async(req,res) =>{
    const truckers = await Trucker.find({});
    res.render('truckers/index',{truckers});
}

module.exports.renderTrucker = async(req, res) =>{
    const trucker = await Trucker.findById(req.params.id);
    res.render('truckers/trucker',{ trucker });
}

module.exports.updateTrucker = async(req,res) =>{
    const trucker = await Trucker.findByIdAndUpdate(req.params.id,{...req.body.trucker});
    await trucker.save();
    res.redirect(`/truckers/${trucker._id}`);
}

module.exports.renderEditTrucker = async(req,res) =>{
    const trucker = await Trucker.findById(req.params.id);
    res.render('truckers/edit',{ trucker });
}