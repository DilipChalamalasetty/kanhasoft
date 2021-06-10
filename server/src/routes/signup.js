const koa_router =require('koa-router');
const userModel=require('../models/userModel');
const bcryptjs=require('bcryptjs');
const uploadImage=require('../utils/uploadImage');
const router=new koa_router();

router.post('/signup',async(ctx,next)=>{
    
    try{
        let filePath= uploadImage(ctx,next);
        await new userModel(
            {
                userEmail:ctx.request.body.userEmail,
                password:bcryptjs.hashSync(ctx.request.body.password,8),
                userFirstName:ctx.request.body.userFirstName,
                userLastName:ctx.request.body.userLastName,
                userContactNumber:ctx.request.body.userContactNumber,
                userUploadedImagesUrls:[filePath.replace(".","")],
            }
        ).save().then(()=>{
            ctx.status=200;
            ctx.message="Successfully Created User";
        })
    }
    catch(err){
        console.error(err);
        ctx.status=500;
        ctx.message="Server Error";
    }
    
});

module.exports=router;