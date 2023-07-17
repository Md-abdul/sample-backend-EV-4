
const { Router } = require("express");
const { PostModel } = require("../modul/post.modul");

require("dotenv").config();
const postRouter = Router();

postRouter.get("/", async(req,res) => {
    const {device1, device2} = req.query
    const {userID} = req.body;
    const query = {};

    if(userID){
        query.userID = userID
    }

    if(device1 && device2){
        query.device = {$and: [{device: device1}, {device: device2}]}
    } else if(device1){
        query.device = device1
    } else if(device2){
        query.device = device2
    }

    try {
        const posts = await PostModel.find(query)
        res.status(200).json({msg: "user posts", posts})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

postRouter.patch("./update/:postID", async(req,res) => {
    const {postId} = req.params;
    const {userID} = req.body;

    try {
        const post = await PostModel.findByIdAndUpdate(
            {userID, _id: postId}, req.body
        )

        if(!post){
            res.status(400).json({msg: "nothing posted"})
        }
        else {
            res.status(200).json({msg: "post done"})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


postRouter.delete("./delete/:postID", async(req,res) => {
    const {postId} = req.params;
    const {userID} = req.body;

    try {
        const post = await PostModel.findByIdAndDelete(
            {userID, _id: postId}
        )

        if(!post){
            res.status(400).json({msg: "nothing posted"})
        }
        else {
            res.status(200).json({msg: "post done"})
        }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})


module.exports = {postRouter}