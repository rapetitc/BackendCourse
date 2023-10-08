export const unauthLogged = async (req, res, next) => {
  const { user } = req.session
  if (user !== undefined) return res.redirect('/')
  next()
}