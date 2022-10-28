/*
 * Copyright github.com/liquiddevelopmentnet, 2022.
 * All rights reserved. Do not distribute without permission.
 */

const licensesList = require('licenses-list-generator')
const fs = require('fs')

const dist = './src/data/licenses.md'

const licenses = licensesList()
const packages = licenses.map(license => license.name)
const packagesText =
  'The following software may be included in this product: ' +
  packages.join(', ')

const header = `## Software used in Coda for Windows, Mac and Web THE FOLLOWING SETS FORTH ATTRIBUTION NOTICES FOR THIRD PARTY SOFTWARE THAT MAY BE CONTAINED IN PORTIONS OF THE CODA PRODUCT.\n<br>\n`

var file = `${header}\n\n_${packagesText}_\n\n`

licenses.forEach(license => {
  file += `
<br>  

---

<br>

<h1>${license.name}</h1>

<br>

${license.text}
`
})

fs.writeFileSync(dist, file, 'utf8')
