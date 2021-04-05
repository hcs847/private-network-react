const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const postSchema = new Schema({
    title: {
        type: String,
        required: true

    },
    body: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    post_img: {
        type: String
    },

    email: {
        type: String,
        required: true
    }
});

const Post = model('Post', postSchema)
module.exports = Post;