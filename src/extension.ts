import { commands, ExtensionContext, window, workspace } from 'vscode';

export const getPath = (useRelative: boolean): string => {
  const editor = window.activeTextEditor;
  if (editor === undefined) {
    const message = 'No document open.';
    window.showErrorMessage(message);
    throw Error(message);
  }

  const uri = editor.document.uri;
  if (uri.scheme !== 'file') {
    const message = 'Open document is not a file.';
    window.showErrorMessage(message);
    throw Error(message);
  }

  return useRelative ? workspace.asRelativePath(uri) : uri.fsPath;
};

export const activate = (context: ExtensionContext) => {
  const disposable = commands.registerCommand('extension.arc-browse', () => {
    const config = workspace.getConfiguration('arc-browse');
    const useRelative = config.get<boolean>('relative', true);
    const path = getPath(useRelative);

    const term = window.createTerminal('arc browse');
    term.sendText(`arc browse "${path}"`);
    term.show();
  });

  context.subscriptions.push(disposable);
};
