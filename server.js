const express = require('express')
const app = express()
const router = express.Router()
const fs = require('fs')
//
const apiFunc = require('./api')

const getConf = (fileName) => {
  return JSON.parse(fs.readFileSync(fileName))
}

const myRouter = (method, entry, callb) => {
  if (method === 'GET' ) { router.get(entry, callb) }
  else if (method === 'POST' ) { router.post(entry, callb) }
  else if (method === 'PUT' ) { router.put(entry, callb) }
  else if (method === 'DELETE' ) { router.delete(entry, callb) }
  else { console.log ('skip ' + method)}
}

const myRouterWithMiddleware = (method, entry, mware, callb) => {
  if (method === 'GET' ) { router.get(entry, mware, callb) }
  else if (method === 'POST' ) { router.post(entry, mware, callb) }
  else if (method === 'PUT' ) { router.put(entry, mware, callb) }
  else if (method === 'DELETE' ) { router.delete(entry, mware, callb) }
  else { console.log ('skip ' + method + ' ' + entry)}
}

module.exports = (confFile) => {
  const { port, apis } = getConf(confFile)

  app.use("/", router)

  apis.map((api) => {
    if (Array.isArray(api.mware)) {
      myRouterWithMiddleware(api.method, api.entry, api.mware.map((middle) => apiFunc[middle]), apiFunc[api.callb])
    }
    else {
      myRouter(api.method, api.entry, apiFunc[api.callb])
    }
  })

  // Server
  app.listen(port, function () {
      console.log('Express server listening on port ' + port)
  })
}
