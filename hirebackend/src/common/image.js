import multer from "multer"


const imageUpload = multer.diskStorage({

    destination : "public/upload",
    filename : function (req, file, cb) {
        cb(null, file.originalname)
    }
})


export const upload = multer({
    storage : imageUpload
})