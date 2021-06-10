var mongoose=require('mongoose');
mongoose.connect(process.env.DB_URL,{useNewUrlParser: true,useUnifiedTopology: true,retryWrites:false},function(error,link){
    if(error){
        console.log(error);
        console.log('not connected');
    }else{
        console.log(process.env.DB_URL);
        console.log("connected to mongodb...");
    }
}) 