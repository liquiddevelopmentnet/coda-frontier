/// <reference path="c:/Users/Finn/.vscode/extensions/nur.script-0.2.1/@types/api.global.d.ts" />
/// <reference path="c:/Users/Finn/.vscode/extensions/nur.script-0.2.1/@types/vscode.global.d.ts" />
//  @ts-check
//  API: https://code.visualstudio.com/api/references/vscode-api

const child = require('child_process')
const path = require('path')

function activate(_context) {
  picker('Generate API Typings', () => {
    println(env.appRoot)
    child.execSync(
      'py ' +
        path.join(
          workspace.workspaceFolders[0].uri.fsPath,
          'generate_api_typings.py'
        ),
      {
        cwd: workspace.workspaceFolders[0].uri.fsPath,
      }
    )
    window.showInformationMessage('API typings generated')
  })
}

function deactivate() {}

module.exports = { activate, deactivate }
