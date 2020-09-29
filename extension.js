const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
*/


 // Activate extension
function activate(context) {
	console.log('DBF activated 🥳');
	const dbfActivate = 'dbf.activate';

	let turnon = vscode.commands.registerCommand(dbfActivate, function () {
		vscode.window.showInformationMessage(`🎉 Dont Be Fired extension activated`);
		askLanguageName();
	});

	context.subscriptions.push(turnon);
}


// Ask language name
async function askLanguageName() {
	const languages = ['Default', 'SQL', 'JavaScript', 'PHP', 'NodeJS', 'C', 'Java', 'Ruby', 'NET', 'Python'];
	const languageInput = await vscode.window.showQuickPick(languages, { canPickMany: false });
	
	vscode.window.showInformationMessage(`✅ Using ${languageInput} syntax`);
	askWaitingTime(languageInput);

}


// Ask time to send messages
async function askWaitingTime(languageInput) {
	const timeInput = await vscode.window.showInputBox({ placeHolder: 'Type which every time you want to receive the messages. Example: 1'})

	if(isNaN(timeInput) || timeInput == '0') {
		vscode.window.showErrorMessage('❌ Invalid time...');
	} else {
		vscode.window.showInformationMessage(`✅ Sending messages every ${timeInput} minute(s)`);
		const messagesTime = parseInt(timeInput);

		setInterval(function () {
			randomMessage(languageInput);
		}, messagesTime * 60000); // 1x60000 = 1 minute
	}
}


// Get random message from jsons
function randomMessage(languageInput) {
	try {
		const languageJsonFile = require(`./languages/${languageInput.toLocaleLowerCase()}.json`) // Get JSON file with the messages inside the languages folder
		const jsonMessages = Object.values(languageJsonFile)
		const getRandomMessage = jsonMessages[parseInt(Math.random() * jsonMessages.length)]

		vscode.window.showInformationMessage(getRandomMessage); // Send a messagebox with a random message
	} catch (error) {
		vscode.window.showErrorMessage("❌ Error ->", error)
	}
}

function deactivate() { }

exports.activate = activate;
exports.deactivate = deactivate;

module.exports = { activate, deactivate }