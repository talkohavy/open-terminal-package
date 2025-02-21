import { execSync } from 'child_process';
import { wait } from './helpers.js';
import type { DebugConfig, TerminalConfig } from './types.js';

export type OpenTerminalProps = {
  config: TerminalConfig | DebugConfig;
  isDebugMode?: boolean;
  delayNextFor?: number;
};

export async function openTerminal(props: OpenTerminalProps) {
  const { config, isDebugMode, delayNextFor } = props;

  const command = isDebugMode ? '/debug' : '';
  const configAsString = encodeURIComponent(btoa(JSON.stringify(config)));

  execSync(`open 'vscode://open.in-terminal${command}?config=${configAsString}&encoded=true'`);

  delayNextFor && (await wait(delayNextFor));
}
