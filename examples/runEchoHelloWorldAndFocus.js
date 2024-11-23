import { openTerminal } from '../dist/index.js';

const program = {
  config: {
    name: 'My First AutoFocus Echo',
    command: 'echo hello world and focus',
    autoFocus: true,
  },
};

async function runProgramInTerminal() {
  const { config, isDebugMode, delayNextFor } = program;

  /**@type {import('../src/types.js').TerminalConfig} */
  const extendedConfig = { ...config, color: 'blue' };

  await openTerminal({ config: extendedConfig, isDebugMode, delayNextFor });
}

runProgramInTerminal();
