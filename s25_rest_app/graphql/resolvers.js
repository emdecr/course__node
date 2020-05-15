const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Post = require("../models/post");

module.exports = {
  createUser: async function({ userInput }, req) {
    // const email = args.userInput.email;
    const email = userInput.email;
    const name = userInput.name;
    const password = userInput.password;
    const errors = [];
    if (!validator.isEmail(email)) {
      errors.push({ message: "Email is invalid" });
    }
    if (
      validator.isEmpty(password) ||
      !validator.isLength(password, { min: 5 })
    ) {
      errors.push({
        message: "Must enter password that is more than 5 characters long."
      });
    }
    if (errors.length > 0) {
      const error = new Error("Validation failed");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const error = new Error("User exists.");
      error.code = 409;
      throw error;
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email: email,
      name: name,
      password: hashedPassword
    });
    const createdUser = await user.save();
    // NTS: We do this because graphql won't understand the format that mongoose returns
    // So we must convert them to strings, as that's what the gql schema expects
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  },
  login: async function({ email, password }) {
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("User not found!");
      error.code = 401;
      throw error;
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error("Invalid password");
      error.code = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    console.log(token, user._id.toString());
    return { token: token, userId: user._id.toString() };
  },
  createPost: async function({ postInput }, req) {
    if (!req.isAuth) {
      const error = new Error("User is not authenticated");
      error.code = 401;
      throw error;
    }
    const title = postInput.title;
    const content = postInput.content;
    const imageUrl = postInput.imageUrl;
    const errors = [];
    if (validator.isEmpty(title) || !validator.isLength(title, { min: 5 })) {
      error.push({ message: "Title is invalid" });
    }
    if (
      validator.isEmpty(content) ||
      !validator.isLength(content, { min: 5 })
    ) {
      error.push({ message: "Content is invalid" });
    }
    if (errors.length > 0) {
      const error = new Error("Validation failed");
      error.data = errors;
      error.code = 422;
      throw error;
    }
    const user = await User.findById(req.userId);
    if (!user) {
      const error = new Error("User not found!");
      error.code = 401;
      throw error;
    }
    const post = new Post({
      title: title,
      content: content,
      imageUrl: imageUrl,
      creator: user
    });
    const createdPost = await post.save();
    user.posts.push(createdPost);
    await user.save();
    return {
      ...createdPost._doc,
      _id: createdPost._id.toString(),
      createdAt: createdPost.createdAt.toISOString(),
      updatedAt: createdPost.updatedAt.toISOString()
    };
  },
  posts: async function(args, req) {
    if (!req.isAuth) {
      const error = new Error("User is not authenticated");
      error.code = 401;
      throw error;
    }
    const totalPosts = await Post.find().countDocuments;
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("creator");
    return {
      posts: posts.map(p => {
        return {
          ...p._doc,
          _id: p._id.toString(),
          createdAt: p.createdAt.toISOString(),
          updatedAt: p.updatedAt.toISOString()
        };
      }),
      totalPosts: totalPosts
    };
  }
};
