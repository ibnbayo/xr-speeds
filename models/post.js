
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postName: {
        type: String,
    },
    postAuthor: {
        type: String
    },
    postContent: {
        type: String,
    },
    postCategory: {
        type: String
    }
});

const post =  mongoose.model("Post", postSchema);
module.exports = post; 