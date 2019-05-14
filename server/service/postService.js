const formidable = require("formidable") // used for parsing form data
const fs = require('fs')
const Post = require('../models/post')

let postSvc = {}

postSvc.sendImage = (req, res) => {
    let path = `${__dirname}/uploads/images/${req.params.name}.jpeg`
    console.log(path)
    res.sendFile(path)
}

postSvc.createPost = (req, res) => {
   
   let post = new Post({fileName: "suraj", description: "crazy", userId: "5ccbe80be7ac3aede6b78594"})
   post.save((err, post) => {
       if(err){
           res.status(404).send("error saving post"+err)
       }
       res.status(200).send(post)
   })
}

postSvc.getPosts = (req, res) => {
    console.log("hello world")
    Post.find()
    .then((posts) => {
        res.status(200).send(posts)
    })
    .catch((err) => {
        res.status(404).send("error fetching posts")
    })
}

module.exports = postSvc