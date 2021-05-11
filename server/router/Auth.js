const AuthController = require('../controller/Auth')
const router = require('express').Router()
const verify = require('../token/jwt_verify')
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination (req,file,cb){
        cb(null, 'uploads/')
    },
    filename (req,file, cb){
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})
function checkFileTypes(file,cb){
    const fileTypes = /jpg|jpeg|png/
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




// singup and loign....
router.post('/singup/', AuthController.singUp)
router.post('/login/', AuthController.Login)
router.get('/users/', AuthController.userList)
router.post('/user/faecbook/', AuthController.faecbookLogin)
router.post ('/user/google/', AuthController.googleLogin)

// userid Profile
router.get('/user/friend/:id/', AuthController.Friend)
router.get('/user/followingList/:id/', AuthController.followingList)

router.get('/user/profile/:id/',  AuthController.profile)
router.put('/user/update/:id/', verify, AuthController.updateUserId)
router.post('/user/loading/:id/', upload.single('image'),  AuthController.updateImage)
router.put('/user/addadress/:id/', verify, AuthController.addAdress)

// followers user 
router.put('/user/followers/:id/', verify, AuthController.followers)
router.put('/user/unfollowers/:id/', verify, AuthController.unfollowers)
module.exports = router