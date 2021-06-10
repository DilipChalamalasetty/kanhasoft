const koa_router =require('koa-router');
const userModel=require('../models/userModel');
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken');

const router=new koa_router();

router.post('/login',async(ctx,next)=>{
    try{
        let userObj=await userModel.findByUserEmail(ctx.request.body.userEmail);
        console.log(userObj);
        if(userObj){
            if(bcryptjs.compareSync(ctx.request.body.password,userObj.password)){
                let tokenPayload={
                    userEmail:userObj.userEmail,
                    date:new Date(),
                    exp:Math.floor(Date.now()/1000)+(24*60*60)
                }
                let token= jwt.sign(tokenPayload, process.env.SECRET_TOKEN);
                console.log(token);
                ctx.status=200;
                ctx.body={
                    ...userObj._doc,
                    token:token
                }
            }
            else{
                ctx.status=401;
                ctx.message="Unauthorized";
            }
        }
        else{
            ctx.status=401;
            ctx.message="Unauthorized";
        }
        
    }
    catch(err){
        console.error(err);
        ctx.status=500;
        ctx.message="Server Error";
    }
    
})

module.exports=router;