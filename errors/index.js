exports.handleWrongPath = (req, res) => {
  res.status(404).send({ msg: "Path not found" });
};

exports.handlePSQLErrors = (err, req, res, next) => {
  if (err.code === "22P02") res.status(400).send({ msg: "Invalid Input" });
  else next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
  err.status && err.msg
    ? res.status(err.status).send({ msg: err.msg })
    : next(err);
};

exports.handle500 = (err, req, res, next) => {
  console.log(err);
  res.status(500).send("Server Error");
};
