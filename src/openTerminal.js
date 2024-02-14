import { exec, execSync } from 'child_process';
import { wait } from './helpers.js';

/**
 * @typedef {{
 *   config: any,
 *   isEncoded?: boolean,
 *   isAsync?: boolean,
 *   isDebugMode?: boolean,
 *   delayNextFor?: number
 * }} OpenTerminalProps
 */

const execute = {
  async: exec,
  sync: execSync,
};

/** @param {OpenTerminalProps} props */
async function openTerminal({ config, isEncoded, isAsync, isDebugMode, delayNextFor }) {
  const mode = isAsync ? 'async' : 'sync';
  const command = isDebugMode ? '/debug' : '';
  const configAsString = isEncoded ? encodeURIComponent(btoa(JSON.stringify(config))) : JSON.stringify(config);

  execute[mode](
    `open 'vscode://open.in-terminal${command}?config=${configAsString}${isEncoded ? '&encoded=true' : ''}'`,
  );

  delayNextFor && (await wait(delayNextFor));
}

export { openTerminal };
