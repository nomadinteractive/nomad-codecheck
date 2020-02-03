# Nomad Code Check

A small toolkit consists of individual rules (similar to eslint) to check quality of the codebase and commits.

## Installation

```
npm install nomad-codecheck --save-dev
```

## Setting up rule configuration

In the target application folder (usually src or app folder), create ```.nomad-codecheckrc``` file with JSON configuration or for more flexible format (whick you can comment, add methods etc) ```.nomad-codecheckrc.js``` as a javascript module that produces and exports the config JSON object.

.nomad-codecheckrc.js example:

```
module.exports = {
	"rules": [
		"branch-name-lint",
		"no-assets-outside-assets-folder",
		"no-network-request-outside-network-managers-folder",
		"no-storage-outside-persistent-data-managers-folder",
	]
}
```

## Usage

Add the nomad-codecheck app call in your scripts in package.json and use it as chain call in your pre-commit or CI commands.

```
"scripts": {
	"check": "nomad-codecheck ./src"
},
```

Now you can use it with ```npm run check```.

Program will exit -1 if any of the rules will fail, it will print the status of each rule and the breakdown of the failed checks.


## Available rules

Each rule is hardcoded and may be modified to accept a configuration object from the JSON configuration for each script's own preferences.

#### branch-name-lint
This rule enforces the branch naming convention to be respected.

#### no-assets-outside-assets-folder
This rule enforces the practice of keeping all static assets (images, videos and font files) under /assets folder inside the application folder structure. The rule will scan all other folders and will list any file that is located outside of /assets folder.

#### no-network-request-outside-network-managers-folder
This rule enforces the practice of keeping all network requests (api calls) to be organized under a specific folder as javascript modules under /network-managers folder inside the application folder structure. The rule will scan file contents for specific libraries (like axios, fetch...) on all folders except network-managers folder and will list any file that contains the import/require or usage of these libraries.

#### no-storage-outside-persistent-data-managers-folder
This rule enforces the practice of keeping all persistent storage use cases to be organized under a specific folder as javascript modules under /persistent-data-managers folder inside the application folder structure. The rule will scan file contents for specific libraries (like local-storage, async-storage, realm...) on all folders except persistent-data-managers folder and will list any file that contains the import/require or usage of these libraries.


## Example use

See https://github.com/nomadinteractive/nomad-codecheck-example repository for an example app that will display the rule violations when ```npm run check``` command executed

## License

[MIT](LICENSE.md)
