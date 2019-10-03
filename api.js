const fs = require('fs')
const jwt = require('jsonwebtoken')

var passObj = {}

const getToken = () => {
  return jwt.sign({good: true}, 'api-exercise', {algorithm: 'HS512', expiresIn: '1h'})
}

const checkToken = (token) => {
  try {
    const { good } = jwt.verify(token, 'api-exercise')
    return (good === true)
  }
  catch(err) {
    return false
  }
}

const ping = (req, res) => {
  res.json({sucess: true})
}

const getPublic = (req, res) => {
  res.sendFile(__dirname + '/files/public.txt')
}

const login = (req, res) => {
  const { username, password } = req.body
  if (username === 'user1' && password === 'complex') {
    passObj.token = getToken()
    res.set('cookie', passObj.token)
    res.json({success: true})
  }
  else { res.status(401).json({code: 'Invalid username/password'}) }
}

const logout = (req, res) => {
  delete(passObj.token)
  res.json({success: true})
}

const getColor = (req, res) => {
  const colour = req.params.colour
  if (colour === 'red') { res.sendfile(__dirname + '/files/red.jpeg') }
  else if (colour === 'yellow') { res.sendfile(__dirname + '/files/yellow.jpeg') }
  else { res.status(400).json({code: 'Unable to find the color ' + colour}) }
}

const checkAuth = (req, res, next) => {
  const token = req.header('X-AUTH')
  if (token !== passObj.token) { res.sendStatus(401) }
  else if (!checkToken(token)) { res.status(401).json({code: 'Invalid token. Please login again'}) }
  else { next() }
}

module.exports = {ping: ping, getPublic: getPublic, login: login, logout: logout, getColor: getColor, checkAuth: checkAuth}
