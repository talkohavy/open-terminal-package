type DebugConfig = {
  type: string;
  request: string;
  name: string;
  cwd: string;
  runtimeExecutable: string;
  runtimeArgs: Array<string>;
  autoAttachChildProcesses: boolean;
  skipFiles: string;
  program: string;
  smartStep: boolean;
  restart: boolean;
  outputCapture: string;
  sourceMaps: boolean;
  env: any;
  console: string;
};

type TerminalConfig = {
  name: string;
  color?: 'red' | 'green' | 'blue' | 'yellow' | 'magenta' | 'cyan' | 'black' | 'white';
  command: string;
  runtimeArgs?: Array<string>;
  autoFocus?: boolean;
};

export type OpenTerminalProps = {
  config: TerminalConfig | DebugConfig;
  isEncoded?: boolean;
  isAsync?: boolean;
  isDebugMode?: boolean;
  delayNextFor?: number;
};

export function openTerminal(props: OpenTerminalProps): Promise<void>;
