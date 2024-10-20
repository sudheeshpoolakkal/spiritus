import multer from "multer";

const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,fil.originalname)
    }
})

const upload = multer({diskStorage})

export default upload
