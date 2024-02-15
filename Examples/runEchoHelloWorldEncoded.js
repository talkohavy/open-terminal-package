import { openTerminal } from '../src/openTerminal.js';

const programs = [
  {
    isEncoded: true,
    config: {
      name: 'Encoded Command',
      command: 'echo "hi all" && echo "what\'s up?"',
    },
  },
];

async function runProgramInTerminal() {
  for (const program of programs) {
    const { config, isDebugMode, isEncoded, delayNextFor } = program;

    const extendedConfig = { ...config, color: 'blue' };

    await openTerminal({ config: extendedConfig, isEncoded, isDebugMode, delayNextFor });
  }
}

runProgramInTerminal();
