# Coda Frontend

<br>

This is the code repository for the frontend.

Do **NOT** push any code in here, unless specified otherwise by [liquiddevelopmentnet](https://github.com/liquiddevelopmentnet).

<br>

## Commands

`yarn dev` starts both, the webpack development server and electron

`yarn build [devtest, coda-indev, coda-infdev, coda-alpha, coda-beta, coda-release]` builds the application in the selected stage, skips versioning if `devtest` is selected

`translate` start the i18n wizard

<br>

## Manual Scripts

`generate_api_typings.py` generates the corresponding typings for the [api.json](src/data/api.json) file

`generate_background_export.py` generates a file where the backgrounds can be imported from
