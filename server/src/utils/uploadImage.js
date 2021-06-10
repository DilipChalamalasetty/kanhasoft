const fs = require('fs');
const path=require('path');

module.exports=(ctx,next)=>{
    
    // const fileArray = ctx.request.files.fileArray;
    // fileArray.forEach(()=>{
    //     var extension=path.extname(file.name);
    //     var name = path.basename(file.name, extension);
    //     var date = new Date();
    //     var fileName =date.getTime()+ "_" + name.replace(" ", "_");
    //     const reader = fs.createReadStream(file.path);
    //     const stream = fs.createWriteStream(process.env.IMAGES_DIR_PATH + fileName + extension);
    //     reader.pipe(stream);
    // });
    try{
        const file = ctx.request.files.file;
        var extension=path.extname(file.name);
        var name = path.basename(file.name, extension);
        var date = new Date();
        var fileName =date.getTime()+ "_" + name;
        const reader = fs.createReadStream(file.path);
        const filePath=process.env.IMAGES_DIR_PATH + fileName + extension;
        const stream = fs.createWriteStream(filePath);
        reader.pipe(stream);
        return filePath
    }
    catch(err){
        throw err;
    }
   
}