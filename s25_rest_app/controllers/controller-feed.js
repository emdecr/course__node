const { validationResult } = require("express-validator");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "11234566677",
        title: "First post",
        content: "This is the content of the first posts",
        imageUrl: "images/kevin_kelly.png",
        creator: {
          name: "ema"
        },
        createdAt: new Date()
      }
    ]
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(422).json({ message: "Validation failed" });
  }
  const title = req.body.title;
  const content = req.body.title;
  res.status(201).json({
    message: "Success!",
    post: {
      _id: new Date().toISOString(),
      title: title,
      content: content,
      creator: {
        name: "ema"
      },
      createdAt: new Date()
    }
  });
};
