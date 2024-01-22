const Form = require("../models/Form")

// const Form =require("..")
exports.addform = async (req,res) =>{
    try{
    const{ name, PhoneNo ,email,message,interest } = req.body
    const _form = new Form(req.body)
    await _form.save()
    res.status(201).json({message:"form has been submitted"})
    }catch(error){
        console.log(error)
        res.status(400).json({message:"error"})

    }
}
    
  
