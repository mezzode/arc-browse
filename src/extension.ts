import { commands, window, workspace, ExtensionContext } from 'vscode';

export function activate(context: ExtensionContext) {
    let disposable = commands.registerCommand('extension.arc-browse', () => {
        const editor = window.activeTextEditor;
        if (!editor) {
            window.showErrorMessage('No document open.');
            return;
        }
        
        const uri = editor.document.uri;
        if (uri.scheme !== 'file') {
            window.showErrorMessage('Open document is not a file.');
            return;
        }
        
        const config = workspace.getConfiguration('arc-browse');
        const useRelative = config.get<boolean>('relative', true);
        const path = useRelative ? workspace.asRelativePath(uri) : uri.fsPath;
        
        const term = window.createTerminal('arc browse');
        term.sendText(`arc browse ${path}`);
        term.show();
    });
    
    context.subscriptions.push(disposable);
}

export function deactivate() {}
