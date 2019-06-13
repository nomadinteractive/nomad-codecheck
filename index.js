#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const noAssetsOutsideAssetsFolder = require('./rules/no-assets-outside-assets-folder')
const noNetworkRequestOutsideNetworkManagersFolder = require('./rules/no-network-request-outside-network-managers-folder')
const noStorageOutsidePersistentDataManagersFolder = require('./rules/no-storage-outside-persistent-data-managers-folder')

let rootPath = process.argv[2] || './'
rootPath = rootPath.replace(/^\/+|\/+$/g, '')
rootPath = path.join(process.cwd(), rootPath)
// console.log(rootPath)

configFilePath = path.join(rootPath, '/', '.nomad-codecheckrc')
// console.log('configFilePath', configFilePath)

new Promise((resolve, reject) => {
	fs.access(configFilePath, fs.F_OK, (err) => {
		if (err) {
			// try js extension
			fs.access(configFilePath + '.js', fs.F_OK, (err) => {
				if (err) return reject('Config file .nomad-codecheckrc is missing')
				resolve({
					path: configFilePath + '.js',
					js: true
				})
			})
		}
		else {
			resolve({
				path: configFilePath,
				js: false
			})
		}
	})
})
.then((foundConfigFile) => {
	// console.log('foundConfigFile', foundConfigFile)
	return new Promise((resolve2, reject2) => {
		if (foundConfigFile.js) {
			// it's a js extension which will be a js module
			resolve2(require('./' + foundConfigFile.path))
		}
		else {
			fs.readFile(foundConfigFile.path, 'utf8', (err, data) => {
				if (err) reject2(err)
				resolve2(JSON.parse(data))
			})
		}
	})
})
.then((config) => {
	// console.log('config', config)
	return new Promise((resolve3, reject3) => {		
		if (typeof config['rules'] === 'undefined') reject2('No rules enabled in the configuration')

		if (config.rules.indexOf('no-assets-outside-assets-folder') !== -1)
			noAssetsOutsideAssetsFolder(rootPath, rootPath + '/assets')

		if (config.rules.indexOf('no-network-request-outside-network-managers-folder') !== -1)
			noNetworkRequestOutsideNetworkManagersFolder(rootPath, rootPath + '/network-managers')

		if (config.rules.indexOf('no-storage-outside-persistent-data-managers-folder') !== -1)
		noStorageOutsidePersistentDataManagersFolder(rootPath, rootPath + '/persistent-data-managers')

		// finished
		resolve3()
	})
})
.then(() => {
	process.exit(0) // successful
})
.catch((err) => {
	console.log('An error occured', err)
	process.exit(1)
})

