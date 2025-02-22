import { execSync } from 'child_process';
import type { DebugConfig, TerminalConfig } from './types.js';
import { wait } from './helpers.js';

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

  if (delayNextFor) await wait(delayNextFor);
}
