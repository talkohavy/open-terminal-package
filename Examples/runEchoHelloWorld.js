import { openTerminal } from '../src/openTerminal.js';

const program = {
  config: {
    name: 'My First Echo',
    command: 'echo hello world',
  },
};

async function runProgramInTerminal() {
  const { config, isDebugMode, isEncoded, delayNextFor } = program;

  const extendedConfig = { ...config, color: 'blue' };

  await openTerminal({ config: extendedConfig, isEncoded, isDebugMode, delayNextFor });
}

runProgramInTerminal();
