import * as vscode from 'vscode';
import { ExplorerProvider } from './explorer/ExplorerProvider';

const EXT = 'sortableExplorer';
const REFRESH = '.refresh';
const OPEN_FILE = '.openFile'

export function activate(context: vscode.ExtensionContext) {

    const explorerProvider = new ExplorerProvider();
    vscode.window.registerTreeDataProvider(EXT, explorerProvider);
    vscode.commands.registerCommand(EXT + REFRESH, () => explorerProvider.refresh());
    vscode.commands.registerCommand(EXT + OPEN_FILE, async (fileUri) => {
        console.log(fileUri);
    });

}

export function deactivate() {
	for(let i = 0; i < unregistables.length; i++) {
		unregistables[i].unregister();
	}

	unregistables = [];
}

type Unregistable = { unregister(): void };

type Registable = { register(): void };

let unregistables = new Array<Unregistable>();

function isUnregistable(object: any): object is Unregistable {
    return 'unregister' in object;
}

function isRegistable(object: any): object is Registable {
    return 'register' in object;
}

function isDisposable(object: any): object is vscode.Disposable {
    return 'dispose' in object;
}

function register(context: vscode.ExtensionContext, service: any) : void {
    if (isRegistable(service)) {
	    service.register();
    }

	if (isUnregistable(service)) {
		unregistables.push(service);
	}

    if (isDisposable(service)) {
        context.subscriptions.push(service);
    }
}
