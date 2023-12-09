export default class SessionsCtrlr {
  login = async (req, res) => {
    if (req.isAuthenticated()) {
      const { first_name, last_name, email, role, cart } = req.user
      res.sendSuccess({ msg: 'Session was successfully initiated', payload: { first_name, last_name, email, role, cart } })
    } else {
      res.sendUnauthorized()
    }
  }
  current = async (req, res) => {
    if (req.isAuthenticated()) {
      const { first_name, last_name, email, role, cart } = req.user
      res.sendSuccess({ msg: 'Session still active', payload: { first_name, last_name, email, role, cart } })
    } else {
      res.sendSuccess({ msg: 'Session is closed', })
    }
  }
  logout = async (req, res) => {
    req.logout(function (err) {
      if (err) { return next(err); }
      res.sendSuccess({ msg: 'Session was successfully closed' })
    });
  }
}
