const shell = require('shelljs')
const chalk = require('chalk')

/*
	Rule name:
		no-network-request-outside-network-managers-folder

	A sample regex captures what we want:
		(\W(axios|fetch)\()|(['"](axios|fetch)['"])
	
		Mathces 
			import and requires like: 'axios'
			method calls with the module names like: axios(...)
		Non-matches
			not combined with other words like: blah_request(...)
			or not used a standalone word (inside text) - without quotes like: ... fetch ...

*/

// const keywords = 'fetch axios'.split(' ')
const keywords = 'request fetch axios https needle superagent got node-fetch r2'.split(' ')
const keywordsPipeStr = keywords.join('|')

// Escaped regex string
const searchRegex = `(\\\\W(${keywordsPipeStr})\\\\()|([\\\'\\\"](${keywordsPipeStr})[\\\'\\\"]))`

module.exports = (rootPath, networkManagerFolderPath) => {

	const findCmd = `find ${rootPath} -type f `
		+ `-not -path "${networkManagerFolderPath}/*" `
		+ `-not -path "*/node_modules/*" `
		+ ` -exec grep -inE $'${searchRegex}' {} \\\; -print`
	// console.log(findCmd)

	const result = shell.exec(findCmd, { silent: true })

	if (result.stdout.length > 0) {
		console.log(chalk.red('𐄂 Rule violation: no-network-request-outside-network-managers-folder'))
		console.log('  Files needs to be reviewed:')
		console.log(result.stdout.trim().split('\n').map(line => {
			if (parseInt(line.split(':')[0]) > 0)
				return "      " + chalk.gray(line.replace(/\t/g, ' '))
			else
				return "  - in " + chalk.blue(line.replace(rootPath + '/', ''))
		}).join('\n'))
		console.log('')
		return false
	}
	else {
		console.log(chalk.green('✓') + ' Passed for rule: no-network-request-outside-network-managers-folder')
		console.log('')
		return true
	}
}
