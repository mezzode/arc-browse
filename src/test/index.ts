// tslint:disable-next-line: no-submodule-imports
import * as testRunner from 'vscode/lib/testrunner';

// You can directly control Mocha options by configuring the test runner below
// See https://github.com/mochajs/mocha/wiki/Using-mocha-programmatically#set-options
testRunner.configure({
  ui: 'tdd', // TDD UI is being used in extension.test.ts (suite, test, etc.)
  useColors: true,
});

module.exports = testRunner;
