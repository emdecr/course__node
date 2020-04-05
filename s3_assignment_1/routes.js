const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(
      '<html><head><title>Enter Username</title></head><body><form action="/create-user" method="POST"><label for="username">Username: </label><input type="text" name="username"/><button type="submit">Submit</button></form></body></html>'
    );
    return res.end();
  }
  if (url === "/users") {
    res.write(
      "<html><head><title>Users</title></head><body><ul><li>User 1</li><li>User 2</li><li>User 3</li><li>User 4</li></ul></body></html>"
    );
    return res.end();
  }
  if (url === "/create-user" && method === "POST") {
    const requestBody = [];
    req.on("data", input => {
      requestBody.push(input);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(requestBody).toString();
      const username = parsedBody.split("=")[1];
      console.log(username);
    });
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><head><title>Submission</title></head><body><h1>Username submitted.</h1></body></html>"
  );
  res.end();
};

module.exports = requestHandler;

// Could also do this...
// module.exports = {
//     handler: requestHandler;
// }
// Then pass routes.handler in app.js

// Or this...
// module.exports.handler = requestHandler;
// Then also pass routes.handler in app.js

// Or even shorter version...
// A shortcut supplied by node.js
// exports.handler = requestHandler;
// Then also pass routes.handler in app.js
