const httpStatus = require("http-status-codes"),
  htmlContentType = {
    "Content-Type": "text/html",
  };
const routes = {
  GET: {
    "/info": (req, res) => {
      res.writeHead(httpStatus.StatusCodes.OK, {
        "Content-Type": "text/html",
      });
      res.end("Welcome to the Info Page!");
    },
  },
  POST: {},
};

exports.handle = (req, res) => {
  try {
    date = new Date()
    if (routes[req.method][req.url]) {
      routes[req.method][req.url](req, res);
      console.log("Request received for page ", req.url, " at ",date)
    } else {
      res.writeHead(httpStatus.StatusCodes.NOT_FOUND, htmlContentType);
      res.end("<h1>No such file exists</h1>");
      console.log("An error occurred. Request for page", req.url, "could not be found on the server", date)
    }
  } catch (ex) {
    console.log("error: " + ex);
  }
};

exports.get = (url, action) => {
  routes["GET"][url] = action;
};

exports.post = (url, action) => {
  routes["POST"][url] = action;
};