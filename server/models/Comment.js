const { Schema } = require('mongoose');

const commentSchema = new Schema(
    {
        commentBody: {
            type: String,
            required: true,
            maxlength: 280
        },
        email: {
            type: String,

        },
        createdAt: {
            type: Date,
            default: Date.now,

        }
    }
);

module.exports = commentSchema;
