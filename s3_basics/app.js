const http = require("http");

const routes = require("./routes");

// Execute the function that's stored in routes for incoming requests
const server = http.createServer(routes);

server.listen(3000);
