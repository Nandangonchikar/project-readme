// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "project-readme" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('project-readme.generateReadme', function () {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Generating readme for the document!');
		// Code to get the contents of the open file in the editor
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const text = document.getText();
			console.log(text);
		

			// code to create a new file in the same directory as the open file
			const fs = require('fs');
			const path = require('path');
			const folderPath = path.dirname(document.fileName);
			const filePath = path.join(folderPath, 'README.md');

			//cretate a context menu for the filed in the workspace
			const menu = vscode.window.createQuickPick();
			menu.items = [
				{ label: 'Generate Readme', description: 'Generate a readme file for the project' },
			];
			menu.onDidChangeSelection(selection => {
			if (selection[0]) {
				vscode.window.showInformationMessage(`You picked ${selection[0].label}`);
			}
			});
			menu.show();


			// code to write the contents of the open file to the new file
			fs.writeFile(filePath, 'Readme data generated from chatAPI goes here', function (err) {
				if (err) {
					return console.log(err);
				}
				console.log('The file was saved!');
				vscode.window.showInformationMessage('Readme created successfully!');
				}
			);
		}
		
		

	async function createReadme() {
		const fs = require('fs');
		const path = require('path');
		const folderPath = path.dirname(document.fileName);
		const filePath = path.join(folderPath, 'README.md');
		fs.writeFile(filePath, 'Readme data generated from chatAPI goes here', function (err) {
			if (err) {
				return console.log(err);
			}
			console.log('The file was saved!');
			vscode.window.showInformationMessage('Readme created successfully!');
			}
		);
	}


	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}





