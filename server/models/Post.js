const mongoose = require('mongoose');
const commentSchema = require('./Comment');
const likeSchema = require('./Like');
const { Schema, model } = mongoose;

const postSchema = new Schema({

    postGroup: {
        type: String,
        require: true
    },

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

    createdByName: {
        type: String,
        required: true
    },

    createdById: {
        type: String
    },

    comments: [commentSchema],
    likes: [likeSchema]
},
    {
        toJSON: {
            getters: true
        }
    }
);

postSchema.virtual('commentCount').get(function () {
    return this.comments.length;
});

postSchema.virtual('likeCount').get(function () {
    return this.likes.length;
});

const Post = model('Post', postSchema);

module.exports = Post;