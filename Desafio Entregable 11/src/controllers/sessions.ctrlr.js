export default class SessionsCtrlr {
  login = async (req, res) => {
    res.status(200).send("Nuevo inicio de session")
  }
  logout = async (req, res) => {
    req.logout(function (err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  }
}
