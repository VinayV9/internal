
const User = require('../models/user')

let userSvc = {}

userSvc.getProfile = (req, res) => {
    
    let id = req.params.id
    console.log(req)
    User.findOne({_id : id}, (err, user) => {
        if(err) {
            console.log("ERROR: error fetching user profile"+err)
        }
        console.log(user)
        res.status(200).send(user)
    })
}

userSvc.updateProfile = (req, res) => {
    
}


module.exports = userSvc