const express = require('express')
const router = express.Router()
const authSvc = require('./service/authService')
const userSvc = require('./service/userService')

router.post('/auth/google', authSvc.checkGoogleUser)

router.get('/user/profile/:id', userSvc.getProfile)
// router.put('/user/profile', userSvc.updateProfile)

// router.get('/user/posts', )
// router.post('/user/post', )


module.exports = router
