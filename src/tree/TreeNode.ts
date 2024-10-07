import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class TreeNode extends vscode.TreeItem {
    constructor(
        public readonly resourceUri: vscode.Uri,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    ) {
        super(resourceUri, collapsibleState);
        this.label = path.basename(resourceUri.fsPath);

        this.iconPath = this.getIconPath(resourceUri);
        this.contextValue = this.getContextValue(resourceUri);
        this.path = resourceUri.path;
        this.isFolder = fs.lstatSync(this.resourceUri.fsPath).isDirectory();

        if(!this.isFolder) {
            this.command = {
                command: 'vscode.open',
                title: 'Open Call',
                arguments: [
                    resourceUri
                ]
            };
            this.contextValue = "FileContext";
        }
    }
    private isMainFolderFile: boolean = false;
    public path?: string;
    public tooltip = `${this.label}`;
    public description = '';
    public isFolder: boolean;

    private getIconPath(uri: vscode.Uri): { light: string, dark: string } | vscode.ThemeIcon {
        const isFolder = fs.lstatSync(uri.fsPath).isDirectory();
        let icon = isFolder ? vscode.ThemeIcon.Folder : vscode.ThemeIcon.File;

        if (this.isMainFolderFile) {
            icon = new vscode.ThemeIcon('notebook-mimetype');
        }

        return icon;
    }

    private getContextValue(uri: vscode.Uri): string {
        return fs.lstatSync(uri.fsPath).isDirectory() ? 'folder' : 'file';
    }
}