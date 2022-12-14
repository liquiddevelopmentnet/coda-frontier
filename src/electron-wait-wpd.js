/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

const net = require('net')
const child_process = require('child_process')
const port = process.env.port ? process.env.port - 100 : 5000

process.env.ELECTRON_START_URL = `http://localhost:${port}`

const client = new net.Socket()

let startedElectron = false
const tryConnection = () =>
  client.connect({ port: port }, () => {
    client.end()
    if (!startedElectron) {
      console.log('starting electron')
      console.log(
        `running: ${
          process.platform == 'win32' ? 'set ' : ''
        }ELECTRON_START_URL=${process.env.ELECTRON_START_URL} && yarn start`
      )
      startedElectron = true
      child_process.execSync(
        `${process.platform == 'win32' ? 'set ' : ''}ELECTRON_START_URL=${
          process.env.ELECTRON_START_URL
        } && yarn start`,
        { stdio: 'pipe', cwd: './app' }
      )
    }
  })

tryConnection()

client.on('error', error => {
  setTimeout(tryConnection, 1000)
})
