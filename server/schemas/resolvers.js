const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                return await User.findById(context.user._id)
                    // fetch the posts data related to the user
                    .populate('posts');
            }
            throw new AuthenticationError('Not logged in')
        },

        users: async () => {
            return User.find()
                // omits the Mongoose __v property the user's password information,
                .select('-__v -password')
                // display sub documents of posts related to user
                .populate('posts');
        },

        post: async (parent, { _id }) => {
            return await Post.findById(_id);
        },

        posts: async () => {
            return Post.find();
        }

    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        updateUser: async (parent, args, context) => {
            if (context.user) {
                return await User.findByIdAndUpdate(context.user._id, args, { new: true });
            }
            throw new AuthenticationError('Not logged in');
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },

        addPost: async (parent, { input }, context) => {
            if (context.user) {
                const post = await Post.create({
                    // spreading the PostInput paramateres
                    ...input,
                    email: context.user.email
                });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { posts: post._id } },
                    { new: true }
                );
                return post;
            }
            throw new AuthenticationError('You need to be logged in for this action.')
        },
    }
};

module.exports = resolvers;