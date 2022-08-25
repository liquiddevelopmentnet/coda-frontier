/// <reference path="c:/Users/Finn/.vscode/extensions/nur.script-0.2.1/@types/api.global.d.ts" />
/// <reference path="c:/Users/Finn/.vscode/extensions/nur.script-0.2.1/@types/vscode.global.d.ts" />
//  @ts-check
//  API: https://code.visualstudio.com/api/references/vscode-api

const child = require('child_process')
const path = require('path')

const scripts = [
  ['generate_api_typings.py', 'Generate API typings', 'API typings generated'],
  [
    'generate_background_export.py',
    'Generate background image references',
    'Background image references generated',
  ],
]

function activate(_context) {
  scripts.forEach(a => {
    picker(a[1], () => {
      println(env.appRoot)
      child.execSync(
        'py ' + path.join(workspace.workspaceFolders[0].uri.fsPath, a[0]),
        {
          cwd: workspace.workspaceFolders[0].uri.fsPath,
        }
      )
      window.showInformationMessage(a[2])
    })
  })
}

function deactivate() {}

module.exports = { activate, deactivate }
