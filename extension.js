const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */


 // Activate function
function activate(context) {
	console.log('DBF activated 🥳');
	const dbfActivate = 'dbf.activate';

	let turnon = vscode.commands.registerCommand(dbfActivate, function () {
		vscode.window.showInformationMessage(`🎉 Dont Be Fired extension activated`);
		askLanguage();
	});

	context.subscriptions.push(turnon);
}

// Ask User Language
async function askLanguage() {

	const languageInput = await vscode.window.showInputBox({ placeHolder: 'Type a language name: SQL, PHP, JS...'});
	const languages = ['SQL', 'JavaScript', 'NodeJS', 'PHP']

	// Verify if language exists on array
	if (languages.indexOf(languageInput) === -1) {
		vscode.window.showErrorMessage('❌ Language not available');
	} else {
		vscode.window.showInformationMessage(`✅ Using ${languageInput} syntax`)

		// Send a random message every 15 minutes
		setInterval(function () {
			randomMessage(languageInput);
		}, 900000);
	}

}

function randomMessage(languageInput) {
	try{
		const languageJsonFile = require(`./languages/${languageInput.toLocaleLowerCase()}.json`) // get JSON language file
		const jsonMessages = Object.values(languageJsonFile)
		const getRandomMessage = jsonMessages[parseInt(Math.random() * jsonMessages.length)]

		vscode.window.showInformationMessage(getRandomMessage); // Print random message
	} catch(e) {
		vscode.window.showErrorMessage("❌ Error ->", e)
	}
}

function deactivate() { }

exports.activate = activate;
exports.deactivate = deactivate;

module.exports = { activate, deactivate }
