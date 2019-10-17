const branchNameLint = require('branch-name-lint');
const chalk = require('chalk')

/*
	Rule name:
		branch-name-lint
*/

module.exports = (rootPath, assetsFolderPath) => {
	let errorParams = []

	const linter = new branchNameLint({
		prefixes: [
			"feat",
			"fix",
			"cont",
			"chore"
		],
		suggestions: {
			features: 'feat',
			feature: 'feat',
			ft: 'feat',
			hotfix: 'fix',
			patch: 'fix',
			doc: 'cont',
			content: 'cont',
		},
		banned: ['wip', 'sercan', 'ugur', 'fatih', 'jesus', 'jonathas', 'altay'],
		// skip: [],
		disallowed: ['master', 'dev', 'staging'],
		seperator: '/',
		msgBranchBanned: 'Branches with the name "%s" are not allowed.',
		msgBranchDisallowed: 'Pushing to "%s" is not allowed.',
		msgPrefixNotAllowed: 'Branch prefix "%s" is not allowed. Allowed prefixes: feat/fix/cont/chore',
		msgPrefixSuggestion: 'Instead of "%s" try "%s".',
		msgSeperatorRequired: 'Branch "%s" must contain a seperator "%s".'
	});

	linter.error = (a1, a2, a3, a4) => {
		errorParams = [a1, a2, a3, a4]
	}

	const result = linter.doValidation()

	if (result === 0) {
		console.log(chalk.green('✓') + ' Passed for rule: branch-name-lint')
		console.log('')
		return true
	}
	else {
		console.log(chalk.red('𐄂 Rule violation: branch-name-lint'))
		console.log(
			'  ' + errorParams[0],
			errorParams[1] || '',
			errorParams[2] || '',
			errorParams[3] || ''
		)
		console.log('')
		return false
	}
}
