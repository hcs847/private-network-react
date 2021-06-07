const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const likeSchema = new Schema(
    {
        likedByName: {
            type: String
        },

        likedById: {
            type: String
        },

        likedAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = likeSchema;