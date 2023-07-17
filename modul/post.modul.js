
const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    userID: String
})

const PostModel = mongoose.model("Post", PostSchema)

module.exports = {PostModel};

//chenge