const childProcess = require('child_process')
const fs = require('fs')

if (fs.existsSync('out')) {
  console.log('i | old build folder exists, deleting')
  fs.rmSync('out', { recursive: true })
}
console.log('i | creating production optimized build (max 2 minutes)')
childProcess.execSync('yarn build-react')
console.log('i | moving directories')
fs.renameSync('./build', './app/build')
console.log('i | packaging electron (2-5 minutes)')
childProcess.execSync('yarn make', { cwd: './app' })
console.log('i | deleting not needed directories')
fs.rmSync('./app/build', { recursive: true })
console.log('i | providing build directory in root')
fs.renameSync('./app/out', './build')
console.log('i | done')
