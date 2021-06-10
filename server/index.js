const koa=require('koa');
const koa_router=require('koa-router');
const dotenv=require('dotenv').config();
const cors = require("@koa/cors");
const bodyParser = require("koa-bodyparser");
const formidable = require("koa2-formidable");
const koa_static  = require('koa-static');
const fs=require("fs");

//database connection
const database_connection=require('./src/database_connection');

//routes
const login=require('./src/routes/login');
const signup=require('./src/routes/signup');
const updateprofile=require('./src/routes/updateprofile');

const app=new koa();
const router=new koa_router();


router.get('/', async(ctx,next)=>{
  ctx.status=400;
  ctx.message="Backend Server is On";
});

//all middlewares
app.use(formidable({}));
app.use(bodyParser());
app.use(cors());
app.use(koa_static(__dirname,'public'));
app.use(koa_static('./public'));
app.use(login.routes(),login.allowedMethods());
app.use(signup.routes(),signup.allowedMethods());
app.use(updateprofile.routes(),updateprofile.allowedMethods());
app.use(router.routes(),router.allowedMethods());

app.listen(process.env.PORT,()=>{
  console.log("Backend server started on",process.env.PORT)
})



