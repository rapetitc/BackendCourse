const ErrorDict = [
  (res) => {
    res.status(500).send({ status: 'error', error: "UNEXPECTED_SERVER_ERROR" });
  },
  (res) => {
    res.status(400).send({ status: 'error', error: "INVALID_TYPES" });
  }
]

export default (error, req, res, next) => {
  ErrorDict[error.code ?? 0](res)
}