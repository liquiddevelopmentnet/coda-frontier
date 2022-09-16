const childProcess = require('child_process')
const fs = require('fs')
const process = require('process')
const archiver = require('archiver')
const path = require('path')

const providedStage = process.argv[2]

const validStages = ['dev', 'indev', 'infdev', 'alpha', 'beta', 'production']

var versionData = {
  id: 'xxxxxx',
  rev: 'xxxxxxx',
  stage: 'indev',
}

console.log('')

if (providedStage === undefined || !validStages.includes(providedStage)) {
  console.error(
    'e | Invalid stage provided. Valid stages are: ' + validStages.join(', ')
  )
  console.error('e | Usage: yarn build <stage>')
  console.log('')
  process.exit(1)
}

if (!(providedStage === 'dev')) {
  const revision = childProcess
    .execSync('git rev-parse --short HEAD')
    .toString()
    .trim()

  const day = new Date().getDate()
  const yearX = new Date().getFullYear()
  const year = yearX.toString().substring(2)
  const month = new Date().getMonth() + 1

  const monthString = month < 10 ? '0' + month : month
  const dayString = day < 10 ? '0' + day : day

  versionData = {
    id: `${monthString}${year}${dayString}`,
    rev: revision,
    stage: providedStage,
  }

  const verString = `coda: (${versionData.stage}) ${versionData.id} (${versionData.rev})`

  console.log(`i | Building version ${verString}`)

  console.log('')

  fs.writeFileSync(
    './src/data/version.json',
    JSON.stringify(versionData, null, 2)
  )

  console.log('')
}

if (fs.existsSync('out')) {
  console.log('i | old build folder exists, deleting')
  fs.rmSync('out', { recursive: true })
}
console.log('i | creating production optimized build -> (max 2 minutes)')
childProcess.execSync('yarn build-react')
console.log('i | moving directories')
try {
  fs.renameSync('./build', './app/build')
} catch (e) {
  console.log('e | failed to move build directory, only copying')
  copyFolderRecursiveSync('./build', './app/build')
  fs.rmSync('./build', { recursive: true })
}
console.log('i | packaging electron -> (2-5 minutes)')
try {
  childProcess.execSync('yarn make', { cwd: './app', stdio: 'pipe' })
} catch (e) {
  console.error(e)
  childProcess.execSync('/usr/bin/yarn make', { cwd: './app', stdio: 'pipe' })
}
console.log('i | providing build directory in root')
try {
  fs.renameSync('./app/out', './build')
} catch (e) {
  console.log('e | failed to move build directory, only copying')
  copyFolderRecursiveSync('./app/out', './build')
  fs.rmSync('./app/out', { recursive: true })
}
try {
  fs.renameSync('./app/build', './build/browser')
} catch (e) {
  console.log('e | failed to move build directory, only copying')
  copyFolderRecursiveSync('./app/build', './build/browser')
  fs.rmSync('./app/build', { recursive: true })
}
console.log('i | cleaning up')

if (!(providedStage === 'dev')) {
  fs.writeFileSync(
    './src/data/version.json',
    JSON.stringify(
      {
        id: 'xxxxxx',
        rev: 'xxxxxxx',
        stage: 'indev',
      },
      null,
      2
    )
  )
}

console.log('i | ziping up')

if (!fs.existsSync('./builds')) {
  fs.mkdirSync('./builds')
}
const zname = `./builds/coda-${versionData.stage}-${versionData.id}-${versionData.rev}.zip`
const output = fs.createWriteStream(zname)
const archive = archiver('zip')

output
  .on('close', function () {
    fs.rmSync('build', { recursive: true })
    console.log(`i | build finished, ${archive.pointer()} total bytes`)
    console.log(`i | see it at: ${zname}`)
    console.log('i | done')
    process.exit(0)
  })
  .on('error', function (err) {
    console.log('e | error during build')
    console.log(err)
    console.log('')
  })

archive.pipe(output)
archive.directory('./build', 'coda')
archive.finalize()

console.log('')

function copyFileSync(source, target) {
  var targetFile = target

  // If target is a directory, a new file with the same name will be created
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isDirectory()) {
      targetFile = path.join(target, path.basename(source))
    }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source))
}

function copyFolderRecursiveSync(source, target) {
  var files = []

  // Check if folder needs to be created or integrated
  var targetFolder = path.join(target, path.basename(source))
  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder)
  }

  // Copy
  if (fs.lstatSync(source).isDirectory()) {
    files = fs.readdirSync(source)
    files.forEach(function (file) {
      var curSource = path.join(source, file)
      if (fs.lstatSync(curSource).isDirectory()) {
        copyFolderRecursiveSync(curSource, targetFolder)
      } else {
        copyFileSync(curSource, targetFolder)
      }
    })
  }
}
