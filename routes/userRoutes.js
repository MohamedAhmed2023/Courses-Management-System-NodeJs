const express = require('express')
const userController = require('../controllers/userController')
const router = express.Router()
const Auth = require('../middleware/Auth')
const multer = require('multer')
const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file)
        cb(null, '/uploads')
    },
    filename: function (req, file, cb) {
        const ext = file.mimetype.split('/')[1]
        const fileName = `user-${Date.now().ext}`
        cb(null, fileName)
    }
})
const upload = multer({ storage: diskStorage })


//get all users
router.route('/')
    .get(Auth, userController.getAllUsers)


//register user
router.route('/register').post(upload.single('avatar'), userController.register)

//login user
router.route('/login').post(userController.login)


module.exports = router;    