const vscode = require('vscode');
const vs = vscode.window;

/**
 * @param {vscode.ExtensionContext} context
*/


 // Activate extension
function activate(context) {

	console.log('DBF activated 🥳');
	const dbfActivate = 'dbf.activate';

	let turnon = vscode.commands.registerCommand(dbfActivate, function () {
		vs.showInformationMessage(`🎉 Dont Be Fired extension activated`);
		askLanguageName();
	});

	context.subscriptions.push(turnon);
}


// Ask language name
const askLanguageName = async () => {

	const languages = ['Default', 'SQL', 'JavaScript', 'PHP', 'NodeJS', 'C', 'Java', 'Ruby', 'NET', 'Python'];
	const languageInput = await vs.showQuickPick(languages, { canPickMany: false });
	
	vs.showInformationMessage(`✅ Using ${languageInput} syntax`);
	askWaitingTime(languageInput);

}


// Ask time to send messages
const askWaitingTime = async (languageInput) => {

	const timeInput = await vs.showInputBox({ placeHolder: 'Type the messages time. Example: 1'})

	if(isNaN(timeInput) || timeInput == '0') {
		vs.showErrorMessage('❌ Invalid time...');
	} else {
		vs.showInformationMessage(`✅ Sending messages every ${timeInput} minute(s)`);

		const messagesTime = parseInt(timeInput)

		setInterval(function () {
			randomMessage(languageInput);
		}, messagesTime * 60000); // 1x60000 = 1 minute

		console.log(typeof messagesTime)

	}
}


// Get random message from jsons
const randomMessage = (languageInput) => {
	try {

		const languageJsonFile = require(`./languages/${languageInput.toLocaleLowerCase()}.json`)
		const getJsonMessages = Object.values(languageJsonFile)
		const randomMessage = getJsonMessages[parseInt(Math.random() * getJsonMessages.length)]

		vs.showInformationMessage(randomMessage);

	} catch (error) {
		vs.showErrorMessage("❌ Error ~> ", error)
	}
}


function deactivate() { }

exports.activate = activate;
exports.deactivate = deactivate;

module.exports = { activate, deactivate }