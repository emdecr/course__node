exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        title: "First post",
        content: "This is the content of the first posts"
      }
    ]
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.title;
  res.status(201).json({
    message: "Success!",
    post: {
      id: new Date().toISOString(),
      title: title,
      content: content
    }
  });
};
