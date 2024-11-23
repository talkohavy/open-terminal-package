export type TerminalConfig = {
  /**
   * The command to execute in that new terminal.
   */
  command: string;
  /**
   * The name of the new terminal to be opened. `name` will appear in your IDE.
   */
  name?: string;
  /**
   * The color of name. The `name` will appear in that color.
   *
   * @default 'white'
   */
  color?: 'red' | 'green' | 'blue' | 'yellow' | 'magenta' | 'cyan' | 'black' | 'white';
  runtimeArgs?: Array<string>;
  /**
   * Should the terminal gain focus once it's open or not.
   *
   * @default false
   */
  autoFocus?: boolean;
};

export type DebugConfig = {
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
