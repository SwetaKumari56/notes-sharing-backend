const nodemailer=require("nodemailer")
exports.sendEmail=async(req,res)=>{
try{
    const transport=nodemailer.createTransport({
        service:"gmail",
        host:"smtp.gmail.com",
        port:465,
        auth:{
            user:"swetakumaribarh5@gmail.com",
            pass:"ifdk hpds poox tjvb"
        }
    })
    const data={
        from:"swetakumaribarh5@gmail.com",
        to:req.body.email,
        subject:req.subject,
        text:req.text
    }
    transport.sendMail(data,(error,info)=>{
        if(error){
            console.log(error);
            res.status(401).json({message:"email Delievery error"})
        }
        else{
            console.log(info);
            res.status(200).json({messgae:"Success"})
        }
    })

}catch(error){

}
}