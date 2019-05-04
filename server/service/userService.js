
const User = require('../models/user')

let userSvc = {}

userSvc.getProfile = (req, res) => {
    let email = req.body.email
    User.findOne({email : email}, (err, user) => {
        if(err) {
            console.log("ERROR: error fetching user profile"+err)
        }
        res.status(200).send({data: user})
    })
}

userSvc.updateProfile = (req, res) => {
    
}


module.exports = userSvc