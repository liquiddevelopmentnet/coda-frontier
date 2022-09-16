![banner](banner.png?raw=true)

### ❗ NOTE: Do **not** push code in here unless otherwise specified by [liquiddevelopmentnet](https://github.com/liquiddevelopmentnet).

<br>

This is the main repository for the coda web/desktop app.

## Issues

If you want to submit a bug or feature please use our [issue tracker](//coda-game/issue-tracker) or if you are a NPT[^npt] of project coda, please use the deveden test suite.

## Setting up a development environment
**Yarn is required to perform development actions on this codespace!**
```
$ git clone git@github.com:coda-game/frontier.git coda-frontier && cd coda-frontier && yarn && cd app && yarn && cd ..
```


This command will set-up a working development directory in `./coda-frontier`.

<br>

To run the app in development mode:
```
$ yarn dev
```

## List of scripts

`translate.exe` / `scripts/translation_tool.py`: Start the *i18n* wizard.

`scripts/generate_api_typings.py`: Generates typings for the [api.json](src/data/api.json) file.

`scripts/generate_background_export.py` Generates exports for the background provided in [this folder](src/assets/includedBackgrounds).

## Building

❗ NOTE: Do **not** build for non-dev stages as this automatically done by our artifact server.

```
$ yarn build <stage>
```

Valid stages: `[dev, indev, infdev, alpha, beta, production]`

[^npt]: Non- Public Tester
