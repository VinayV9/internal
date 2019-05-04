const { OAuth2Client } = require('google-auth-library')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const auth = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CONSUMER_SECRET,
    "http://loc alhost:4200"
)

let authSvc = {}

authSvc.googleAuth =  (token) => {
    return auth.
    verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(login => {
        let payload = login.getPayload()
        let audience = payload.aud
       
        if (audience !== process.env.GOOGLE_CLIENT_ID) {
            throw new Error(err)
        }

        promise(payload)
        .then((data)=>{
           return data
        })
        .catch((err)=>{
           throw new Error(err)
        })
        
        
       
    })
    .catch((err) => {
        throw new Error(err)
    })
}

authSvc.checkGoogleUser = (req, res) => {
    try{
        authSvc.googleAuth(req.body.token)
        .then(data => {
            console.log("hello "+ data)
            res.status(200).send(data)
        })
        .catch((err) => {
            throw new Error(err)
        })
    }catch (err){
        console.log("ERROR: "+err)
        res.send(404).send({ message: "error with signin" })
    }
}

authSvc.createToken = (userId) => {
    return jwt.sign({ user: userId }, process.env.JWT_SECRET_KEY)
}

let createUser =  (payload) => {
    return new Promise( async (resolve, reject) => {
        let newUser = new User({ email: payload['email'], avtar: payload['picture'], username: payload['name'] })
        let token = authSvc.createToken(newUser._id)
    
        await newUser.save((err, data) => {
            if (err) {
                reject(err)
            }
            let res = {
                token: token, 
                username: data.username,
                avtar: data.avtar
            }
            resolve(res)
        })
    })
}

let promise = (payload) =>{
    return new Promise( (resolve, reject) => {
        User.findOne({ email: payload['email'] }, (err, user) => {

            if (err) { reject(err) }
            if (!user) {
                createUser(payload)
                .then((data) => {
                    resolve(data)
                })
                .catch((err)=>{ throw new Error(err)}) 
            } else {
                let res = { 
                    token : authSvc.createToken(user._id),
                    username: user.username,
                    avtar: user.avtar
                }
                console.log(res)
                resolve(res)
            }
        })
    })
}

module.exports = authSvc
