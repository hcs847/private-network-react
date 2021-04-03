const { AuthenticationError } = require('apollo-server-express');
const { User, Post } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        user: async (parent, args, context) => {
            if (context.user) {
                return await User.findById(context.user._id);
            }
            throw new AuthenticationError('Not logged in')
        },
        post: async (parent, { _id }) => {

            return await Post.findById(_id);


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
                    title: input.title,
                    body: input.body,
                    post_img: input.post_img,
                    user: context.user._id
                });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { posts: post._id } }
                );
                return post;
            }
            throw new AuthenticationError('You need to be logged in for this action.')
        },
    }
};

module.exports = resolvers;