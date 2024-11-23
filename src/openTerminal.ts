import { exec, execSync } from 'child_process';
import { wait } from './helpers.js';

const execute = {
  async: exec,
  sync: execSync,
};

type OpenTerminalProps = {
  config: any;
  isEncoded?: boolean;
  isAsync?: boolean;
  isDebugMode?: boolean;
  delayNextFor?: number;
};

export async function openTerminal(props: OpenTerminalProps) {
  const { config, isEncoded, isAsync, isDebugMode, delayNextFor } = props;

  const mode = isAsync ? 'async' : 'sync';
  const command = isDebugMode ? '/debug' : '';
  const configAsString = isEncoded ? encodeURIComponent(btoa(JSON.stringify(config))) : JSON.stringify(config);

  execute[mode](
    `open 'vscode://open.in-terminal${command}?config=${configAsString}${isEncoded ? '&encoded=true' : ''}'`,
  );

  delayNextFor && (await wait(delayNextFor));
}
