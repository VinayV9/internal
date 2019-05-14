const express = require('express')
const router = express.Router()
const authSvc = require('./service/authService')
const userSvc = require('./service/userService')
const postSvc = require('./service/postService')

router.post('/auth/google', authSvc.checkGoogleUser)

router.get('/user/profile/:id', userSvc.getProfile)
// router.put('/user/profile', userSvc.updateProfile)

// router.get('/user/posts', )
router.post('/user/post', postSvc.createPost)
router.get('/posts', postSvc.getPosts)
router.get('/post/image/:name', postSvc.sendImage)


module.exports = router
