import * as vscode from 'vscode';
import { ExplorerProviderType } from '../explorer/ExplorerProviderType';

export class Registrator {

    constructor (
        explorer: ExplorerProviderType,
        extName: string
    ) { 
        this.extName = extName;
        this.explorer = explorer;
     }

    private extName: string;
    private explorer: ExplorerProviderType;

    public treeDataProvider(): void {
        vscode.window.registerTreeDataProvider(
            this.extName, this.explorer
        );
    }

    public command(commandName: string) {
        
    }
}