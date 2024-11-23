import { openTerminal } from '../dist/index.js';

const program = {
  delayNextFor: 3000,
  config: {
    name: 'My First Echo',
    command: 'echo hello world',
  },
};

async function runProgramInTerminal() {
  const { config, isDebugMode, delayNextFor } = program;

  /**@type {import('../src/types.js').TerminalConfig} */
  const extendedConfig = { ...config, color: 'blue' };

  await openTerminal({ config: extendedConfig, isDebugMode, delayNextFor });
}

runProgramInTerminal();
