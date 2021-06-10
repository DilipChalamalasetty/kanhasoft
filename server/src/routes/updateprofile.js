const koa_router =require('koa-router');
const userModel=require('../models/userModel');
const authentication =require('../middleware/authentication');
const uploadImage=require('../utils/uploadImage');
const router=new koa_router();

router.post('/updateprofile',authentication,async(ctx,next)=>{
    console.log(ctx.user);
    try{
        let filePath;
        if(ctx.request.files.file){
            filePath=uploadImage(ctx,next);
            console.log(filePath)
        }
        delete ctx.request.body.userEmail;
        await userModel.findByUserEmailAndUpdate(ctx.user.userEmail,{...ctx.request.body,filePath:filePath===undefined?null:filePath.replace(".","")});
        let userObj=await userModel.findByUserEmail(ctx.user.userEmail);
        ctx.staus=200;
        ctx.body=userObj;
    }
    catch(err){
        console.error(err);
        ctx.status=500;
        ctx.message="Server Error";
    }
})

module.exports=router;