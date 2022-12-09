exports.logRequestPaths = (req, res, next) => {
    console.log(`request made to: ${req.url}`);
    next();
};

exports.sendReqParam = (req, res, next) => {
    let book = req.params.bookID;
    res.send(`This is the page for ${book}`);
};

exports.home = (req, res, next) => {
    res.render("index");
};

exports.honesty = (req, res, next) => {
    res.render("honesty");
};