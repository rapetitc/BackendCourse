export default (req, res, next) => {
  //200
  res.sendSuccess = (obj) => res.status(200).send({ status: "success", ...obj });
  res.sendCreated = (obj) => res.status(201).send({ status: "success", ...obj });
  //400
  res.sendBadRequest = (cause) => res.status(400).send({ status: "error", ...cause });
  res.sendUnauthorized = () => res.status(401).send({ status: "error", error: "UNAUTHORIZED" });
  res.sendForbiden = (cause) => res.status(403).send({ status: "error", ...cause });
  res.sendNotFound = (cause) => res.status(404).send({ status: "error", ...cause });
  //500
  res.sendServerError = () => res.status(500).send({ status: "error", error: "UNEXPECTED_SERVER_ERROR" });
  next();
};
