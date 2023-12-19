const ErrorDict = [
  (res) => {
    res.status(500).send({ status: "error", error: "UNEXPECTED_SERVER_ERROR" });
  },
  (res, cause) => {
    res.status(400).send({ status: "error", error: "INVALID_TYPES", ...cause });
  },
  (res) => {
    res.status(400).send({ status: "error", error: "USER_ALREADY_EXISTS" });
  },
  (res) => {
    res.status(404).send({ status: "error", error: "USER_NOT_FOUND" });
  },
  (res) => {
    res.status(400).send({ status: "error", error: "NO_INFO_TO_UPDATE" });
  },
  (res) => {
    res.status(400).send({ status: "error", error: "NO_FILES_TO_UPLOAD" });
  },
  (res, cause) => {
    res.status(400).send({ status: "error", error: "USER_NOT_VERIFIED", ...cause });
  },
  (res) => {
    res.status(403).send({ status: "error", error: "SESSION_IS_CLOSED" });
  },
];

export default (error, req, res, next) => {
  if (ErrorDict[error.code]) {
    ErrorDict[error.code](res, { cause: error.cause });
  } else {
    req.logger.fatal(error);
    ErrorDict[0](res);
  }
};
