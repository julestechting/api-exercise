const express = require('express')
const app = express()
const router = express.Router()
const fs = require('fs')
//
const apiFunc = require('./api')

const getConf = (fileName) => {
  return JSON.parse(fs.readFileSync(fileName))
}

module.exports = (confFile) => {
  const { port, apis } = getConf(confFile)

  apis.map((api) => {
    if (typeof(api.mware) === 'string') {
      app.use(api.entry, apiFunc[api.mware], apiFunc[api.callb])
    }
    else {
      app.use(api.entry, apiFunc[api.callb])
    }
  })

  // Server
  app.listen(port, function () {
      console.log('Express server listening on port ' + port)
  })
}
