const vscode = require('vscode');
const { userInfo } = require('os');

/**
 * @param {vscode.ExtensionContext} context
 */

function activate(context) {

	console.log('DBF activated 🥳');
	const myCommandId = 'dbf.activate';

	let turnon = vscode.commands.registerCommand(myCommandId, function () {

		const getUser = userInfo();
		const username = getUser['username'];

		vscode.window.showInformationMessage(`Hello ${username}! Dont Be Fired extension activated 🎉🥳`);
		getRandomMessage();

	});

	context.subscriptions.push(turnon);
}

function getRandomMessage() {

	const RememberMe = [
	'Have you done the backup already? 🤔', 
	'Are you in the correct branch? 🤔',  
	'Did you commit the changes already? 🤔',
	'Are you in the correct file? 🤔',
	'Have you tried running the code in a different machine? 🤔',
	'Is the website responsive? 🤔'];

	setInterval(function () {
		randomMessage(RememberMe);
	}, 900000);

}

function randomMessage(RememberMe) {
	const random = Math.floor(Math.random() * RememberMe.length);
	vscode.window.showInformationMessage(RememberMe[random]);
}

exports.activate = activate;

module.exports = {
	activate
}
