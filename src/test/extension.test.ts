// tslint:disable: await-promise
import * as assert from 'assert';
import * as path from 'path';
import { Uri, window, workspace } from 'vscode';
import { getPath } from '../extension';

suite('Extension Tests', () => {
  test('Relative path works', async () => {
    const testPath = Uri.file(path.join(__dirname, '../../src/test/index.ts'));
    const document = await workspace.openTextDocument(testPath);
    await window.showTextDocument(document);

    const useRelative = true;
    assert.strictEqual(
      getPath(useRelative),
      workspace.asRelativePath(testPath),
    );
  });

  test('Absolute path works', async () => {
    const testPath = Uri.file(path.join(__dirname, '../../src/test/index.ts'));
    const document = await workspace.openTextDocument(testPath);
    await window.showTextDocument(document);

    const useRelative = false;
    assert.strictEqual(getPath(useRelative), testPath.fsPath);
  });
});
