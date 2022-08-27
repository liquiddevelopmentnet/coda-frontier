const childProcess = require('child_process')
const fs = require('fs')
const process = require('process')

const providedStage = process.argv[2]
if (!providedStage == 'dev') {
  const validStages = ['indev', 'infdev', 'alpha', 'beta', 'production']

  console.log('')

  if (providedStage === undefined || !validStages.includes(providedStage)) {
    console.error(
      'e | Invalid stage provided. Valid stages are: ' + validStages.join(', ')
    )
    console.error('e | Usage: yarn build <stage>')
    console.log('')
    process.exit(1)
  }

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

  const versionData = {
    id: `${monthString}${year}${dayString}.${increasingBuildNumber}`,
    rev: revision,
    stage: providedStage,
  }

  const verString = `coda: (${versionData.stage}) ${versionData.id} (${versionData.rev})`

  console.log(`i | Building version ${verString})`)

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
childProcess.execSync('yarn make', { cwd: './app' })
console.log('i | providing build directory in root')
fs.renameSync('./app/out', './build')
fs.renameSync('./app/build', './build/browser')
console.log('i | cleaning up')

if (!providedStage == 'dev') {
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
console.log('i | done')

console.log('')
