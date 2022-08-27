/*
 * Copyright Project Coda, LLC, 2022.
 * All rights reserved.
 */

const net = require('net')
const port = process.env.port ? process.env.port - 100 : 3000

process.env.ELECTRON_START_URL = `http://localhost:${port}`

const client = new net.Socket()

let startedElectron = false
const tryConnection = () =>
  client.connect({ port: port }, () => {
    client.end()
    if (!startedElectron) {
      console.log('starting electron')
      startedElectron = true
      const exec = require('child_process').exec
      exec(
        `cd app && set ELECTRON_START_URL=${process.env.ELECTRON_START_URL} && electron .`
      )
    }
  })

tryConnection()

client.on('error', error => {
  setTimeout(tryConnection, 1000)
})
