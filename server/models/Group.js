const { Schema, model } = require('mongoose');

const groupSchema = new Schema(
    {
        groupName: {
            type: String,
            required: true
        },

        groupAdmin: {
            type: String
        },

        groupImg: {
            type: String
        },

        users: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],

        posts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Post'
            }
        ]
    },
    {
        toJSON: {
            getters: true
        }
    }
);

groupSchema.virtual('userCount').get(function () {
    return this.users.length;
});

const Group = model('Group', groupSchema);

module.exports = Group;