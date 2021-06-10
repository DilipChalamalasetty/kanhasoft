var imageUrlCreation = (fileName)=>{
    return ("http://localhost:"+process.env.PORT+process.env.IMAGES_DIR_PATH+"/"+fileName);
}