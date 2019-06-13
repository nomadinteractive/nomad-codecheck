const shell = require('shelljs')
const chalk = require('chalk')

/*
	Rule name:
		no-storage-outside-persistent-data-managers-folder
*/

// const keywords = 'fetch axios'.split(' ')
const keywords = 'localstorage node-localstorage store realm rxdb asyncstorage async-storage react-native-storage'.split(' ')
const keywordsPipeStr = keywords.join('|')

// Escaped regex string
const searchRegex = `(\\\\W(${keywordsPipeStr})\\\\()|([\\\'\\\"](${keywordsPipeStr})[\\\'\\\"]))`

module.exports = (rootPath, persistentDataManagersFolderPath) => {

	const findCmd = `find ${rootPath} -type f `
		+ `-not -path "${persistentDataManagersFolderPath}/*" `
		+ `-not -path "*/node_modules/*" `
		+ ` -exec grep -inE $'${searchRegex}' {} \\\; -print`
	// console.log(findCmd)

	const result = shell.exec(findCmd, { silent: true })

	if (result.stdout.length > 0) {
		console.log(chalk.red('𐄂 Rule violation: no-storage-outside-persistent-data-managers-folder'))
		console.log('  Files needs to be reviewed:')
		console.log(result.stdout.trim().split('\n').map(line => {
			if (parseInt(line.split(':')[0]) > 0)
				return "      " + chalk.gray(line.replace(/\t/g, ' '))
			else
				return "  - in " + chalk.blue(line)
		}).join('\n'))
		console.log('\n')
		return false
	}
	else {
		console.log(chalk.green('✓') + ' Passed for rule: no-storage-outside-persistent-data-managers-folder')
		console.log('\n')
		return true
	}
}
