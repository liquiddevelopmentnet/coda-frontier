const childProcess = require('child_process')
const fs = require('fs')
const process = require('process')
const archiver = require('archiver')

const providedStage = process.argv[2]

const validStages = ['dev', 'indev', 'infdev', 'alpha', 'beta', 'production']

var versionData = {
  id: 'xxxxxx.0',
  rev: 'xxxxxxx',
  stage: 'development',
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

  const increasingBuildNumber =
    parseInt(fs.readFileSync('.codaibn', 'utf8').toString().trim()) + 1

  const day = new Date().getDate()
  const yearX = new Date().getFullYear()
  const year = yearX.toString().substring(2)
  const month = new Date().getMonth() + 1

  const monthString = month < 10 ? '0' + month : month
  const dayString = day < 10 ? '0' + day : day

  versionData = {
    id: `${monthString}${year}${dayString}.${increasingBuildNumber}`,
    rev: revision,
    stage: providedStage,
  }

  const verString = `coda: (${versionData.stage}) ${versionData.id} (${versionData.rev})`

  console.log(`i | Building version ${verString}`)

  console.log('')

  fs.writeFileSync('.codaibn', increasingBuildNumber.toString())
  console.log(
    'i | committing build number (this may ask for your password if using gpg keys)'
  )
  childProcess.execSync(`git commit -m "${verString}" .codaibn`)
  console.log('i | pushing build number')
  childProcess.execSync(`git push origin main`)
  console.log('i | git done')

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
fs.renameSync('./build', './app/build')
console.log('i | packaging electron -> (2-5 minutes)')
childProcess.execSync('yarn make', { cwd: './app', stdio: 'ignore' })
console.log('i | providing build directory in root')
fs.renameSync('./app/out', './build')
fs.renameSync('./app/build', './build/browser')
console.log('i | cleaning up')

if (!(providedStage === 'dev')) {
  fs.writeFileSync(
    './src/data/version.json',
    JSON.stringify(
      {
        id: 'xxxxxx.0',
        rev: 'xxxxxxx',
        stage: 'development',
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
