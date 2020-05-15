const bcrypt = require("bcryptjs");
const User = require("../models/user");

module.exports = {
  createUser: async function({ userInput }, req) {
    // const email = args.userInput.email;
    const email = userInput.email;
    const name = userInput.name;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      const error = new Error("User exists.");
      throw error;
    }
    const hashedPassword = await bcrypt.hash(userInput.password, 12);
    const user = new User({
      email: email,
      name: name,
      password: hashedPassword
    });
    const createdUser = await user.save();
    return { ...createdUser._doc, _id: createdUser._id.toString() };
  }
};
