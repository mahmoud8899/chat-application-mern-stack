const router = require('express').Router()
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null, 'uploads/')
    },
    filename (req, file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})


function checkFileTypes(file,cb){
    const fileTypes = /jpg|jpeg|png|mp4|MOV/
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = fileTypes.test(file.mimetype)

    if(extname && mimetype){
        cb(null , true)
    }else{
        cb('Image Only')
    }
}


const upload = multer({
    storage,
    fileFilter : function(req, file, cb){
        checkFileTypes(file,cb)
    }
})

router.post('/', upload.single('image'),(req,res,next)=>{
    res.send(`/${req.file.path}`)
})

module.exports = router