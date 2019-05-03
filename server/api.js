const express = require('express')
const router = express.Router()
const authSvc = require('./service/authService')


router.post('auth/register', authSvc.register)
router.post('auth/google', authSvc.googleAuth)

router.post('user/post', tokenCheck, userSvc.insertPost)
router.get('user/posts', userSvc.getPosts)

module.exports = router
