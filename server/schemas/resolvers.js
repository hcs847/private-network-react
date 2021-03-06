const { AuthenticationError } = require('apollo-server-express');
const { User, Post, Group } = require('../models');
const { signToken } = require('../utils/auth');


const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('posts');

                return userData;
            }
            throw new AuthenticationError('Not logged in');
        },

        user: async (parent, { _id }) => {

            return User.findOne({ _id })
                // fetch the posts data related to the user
                .populate('posts')
                .populate('groups')
                .populate('likedPosts');
        },

        findUser: async (parent, args) => {
            const { filter } = args;
            const foundUser = await User.find({
                $or: [
                    { firstName: { '$regex': filter, '$options': 'i' } },
                    { lastName: { '$regex': filter, '$options': 'i' } }
                ]
            });
            return foundUser;
        }
        ,

        users: async () => {
            return User.find()
                // omits the Mongoose __v property the user's password information,
                .select('-__v -password')
                // display sub documents of posts related to user
                .populate('posts')
                .populate('likedPosts');
        },

        post: async (parent, { _id }) => {
            return await Post.findById(_id);
        },

        posts: async () => {
            return Post.find()
                .populate('likes');
        },

        findPost: async (parent, args) => {
            const { filter } = args;
            return await Post.find({
                $or: [
                    { title: { '$regex': filter, '$options': 'i' } },
                    { body: { '$regex': filter, '$options': 'i' } }]
            });
        },

        // ======================================
        liked: async (parent, { postId }, context) => {
            return await User.findOne({ _id: context.user._id }).lean();

        },
        //====================================

        group: async (parent, { _id }) => {
            return Group.findOne({ _id })
                .populate('users')
                .populate('posts');
        },

        groups: async () => {
            return Group.find()
                .populate('users')
                .populate('posts');
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
                    createdByName: `${context.user.firstName} ${context.user.lastName}`,
                    createdById: context.user._id
                });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { posts: post._id } },
                    { new: true }
                );

                await Group.findByIdAndUpdate(
                    { _id: post.postGroup },
                    { $push: { posts: post._id } },
                    { new: true }
                );
                return post;
            }
            throw new AuthenticationError('You need to be logged in for this action.')
        },

        addComment: async (parent, { postId, commentBody }, context) => {
            if (context.user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $push: {
                            comments: {
                                commentBody,
                                createdByName: `${context.user.firstName} ${context.user.lastName}`,
                                createdById: context.user._id
                            }
                        }
                    },
                    { new: true }
                );
                return updatedPost;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        likePost: async (parent, { postId }, context) => {
            if (context.user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $push: {
                            likes: {
                                likedByName: `${context.user.firstName} ${context.user.lastName}`,
                                likedById: context.user._id
                            }
                        }
                    },
                    { new: true }
                );
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { likedPosts: postId } },

                ).populate('likedPosts');

                return updatedPost;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
        ,
        unlikePost: async (parent, { postId }, context) => {
            if (context.user) {
                const updatedPost = await Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $pull: {
                            likes: { likedById: context.user._id }
                        }

                    },
                    { new: true }
                );
                return updatedPost;
            }
            throw new AuthenticationError('You need to be logged in for this action.')
        },
        addGroup: async (parent, args, context) => {
            if (context.user) {
                const group = await Group.create({
                    ...args,
                    groupAdmin: `${context.user.firstName} ${context.user.lastName}`,
                    users: { _id: context.user._id }
                });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { groups: group._id } },
                    { new: true }
                )
                return group;
            }
            throw new AuthenticationError('You need to be logged in for this action.')

        },

        deletePost: async (parent, args, context) => {
            if (context.user) {
                const deletedPost = await Post.findOneAndDelete(
                    { _id: args.postId }
                );
                return deletedPost;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        deleteGroup: async (parent, args, context) => {
            if (context.user) {
                const deletedGroup = await Group.findOneAndDelete(
                    { _id: args.groupId }
                );
                return deletedGroup;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
};

module.exports = resolvers;