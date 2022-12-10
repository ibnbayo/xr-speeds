
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
    postUrl: {
        type: String,
    },
    postCategory: {
        type: String
    },
    postLength: {
        type: Number,
    },
    postTags: {
        type: Array,
        
    },
    createdAt: {
    type: Date,
    default: Date.now
    },
    updatedAt: {
    type: Date,
    default: Date.now
    }
});

postSchema.plugin(mongoosePaginate);
const post =  mongoose.model("Post", postSchema);
module.exports = post; 