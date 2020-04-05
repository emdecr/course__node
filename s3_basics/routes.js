const fs = require("fs");

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(
      '<html><head><title>Enter message</title></head><body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Submit</button></form></body></html>'
    );
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("./message.txt", message, err => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-Type", "text/html");
  res.write(
    "<html><head><title>Hello</title></head><body><h1>Hey there.</h1></body></html>"
  );
  res.end();
  //   process.exit();
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
