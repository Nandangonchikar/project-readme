const vscode = require('vscode');

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
	let disposableGenerateReadme = vscode.commands.registerCommand('project-readme.generateReadme', async function () {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Generating readme for the document!');
		//Create context navigation menu
		createContextMenu();

		// Code to get the contents of the open file in the editor
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const document = editor.document;
			const text = document.getText();

			try {
				const generatedReadmeData= await generateReadmeAPI(text);

				if (generatedReadmeData) { // if readme is generated successfully then create the readme file
					await createReadmeFile(generatedReadmeData);
					vscode.window.showInformationMessage('Readme generated successfully!');
				}
				else {
					vscode.window.showErrorMessage("API call did not generate any data");
				}
			}
			catch (err) {
				console.log(err);
			}
		}
		
		
	async function generateReadmeAPI(text) {
		// call openAPI to generate readme here
		// return the generated readme as a variable
		// retrieve API key from settings.json
		const apiKey = vscode.workspace.getConfiguration().get('project-readme.apiKey');
		if(!apiKey){
			vscode.window.showErrorMessage("API key not found. Please configure API key in using command set API Keys");
			return;
		}
		console.log(`API key is ${apiKey}`);
		
		console.log(text);
		return "API call done and readme doc succesfully created"
	}
	// Create a readme file in the workspace folder and write data to it
	async function createReadmeFile(data) {  
		const currentDir = vscode.workspace.rootPath;
		const readmePath = vscode.Uri.file(`${currentDir}/readme.md`);
		console.log(readmePath);
		await vscode.workspace.fs.writeFile(readmePath, Buffer.from(data, 'utf8'));
		console.log("Readme file created");
		return readmePath;
	}

	function createContextMenu(){
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
	}

	});

	// Register the command to open settings for API key configuration
    let disposableConfigureAPIKeys = vscode.commands.registerCommand('project-readme.setAPIKey',  () => {
        // await vscode.commands.executeCommand('workbench.action.openSettings');
		vscode.window.showInputBox({
			prompt: 'Enter your API key',
			placeHolder: 'API key',
			password: true // If the API key should be masked
		  }).then(apiKey => {
			if (apiKey !== undefined) {
			  saveAPIKey(apiKey);
			}
		  });

		//   function to save the API key in the settings.json file
		function saveAPIKey(apiKey) {
			const config = vscode.workspace.getConfiguration();
			config.update('project-readme.apiKey', apiKey, true);
			vscode.window.showInformationMessage('API key saved successfully!');
		}

    });

	context.subscriptions.push(disposableGenerateReadme,disposableConfigureAPIKeys);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}





