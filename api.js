var passObj = {}

const ping = (req, res) => {
  res.json({sucess: true})
}

const getPublic = (req, res) => {
  // TODO
}

const login = (req, res) => {
  // TODO
}

const logout = (req, res) => {
  // TODO
}

const getColor = (req, res) => {
  // TODO
}

const checkAuth = (req, res, next) => {
  console.log('checkAuth')
  next()
}

module.exports = {ping: ping, getPublic: getPublic, login: login, logout: logout, getColor: getColor, checkAuth: checkAuth}
