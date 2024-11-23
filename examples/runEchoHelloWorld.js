import { openTerminal } from '../dist/index.js';

const program = {
  config: {
    name: 'My First Echo',
    command: 'echo hello world',
  },
};

async function runProgramInTerminal() {
  const { config, isDebugMode, delayNextFor } = program;

  /**@type {import('../src/types.js').TerminalConfig} */
  const extendedConfig = { ...config, color: 'black' };

  await openTerminal({ config: extendedConfig, isDebugMode, delayNextFor });
}

runProgramInTerminal();
