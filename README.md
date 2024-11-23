# Open Terminal Programmatically

<div align="center">
  <img src="https://i.ibb.co/vmXG1vL/terminalos.png" width="128" alt="Main Logo">
</div>

<br/>

Open VsCode terminal programmatically in the simplest way possible.  
Launch VsCode's debugger programmatically, passing in your launch configuration.

## Introduction

If you're using VSCode, and you constantly find yourself in a situation where you need to open multiple vscode terminals, where each one runs a different server (or a script), then this is the package for you.

Prerequisites:

- VSCode as your IDE
- `Open Terminal Programmatically` extension installed

Most of the work would be done by the extension. This package just acts as its wrapper, providing you with 2 easy-to-use functions, with hints, autocomplete, and correct typings.

---

## Getting Started

### - Step 1: install `Open Terminal Programmatically` extension

Go over to the extension market on VSCode, search & download `Open Terminal Programmatically`.

### - Step 2: install the `open-terminal-programmatically` npm package

Run one of these:  
(depending on your package manager)

```bash
npm install -g open-terminal-programmatically
```

```bash
pnpm add -g open-terminal-programmatically
```

```bash
yarn add -g open-terminal-programmatically
```

### - Step 3: import the `openTerminal` function

```tsx
import { openTerminal } from 'open-terminal-programmatically';
```

---

## How to use

The `openTerminal` is a function you can use to open new terminals in VSCode, or launch/attach a new debug process.

It accept these following options:

### - `isDebugMode`

type: boolean
(Optional)
default: `false`

If set to `true`, command will open up VSCode's debug terminal, which would appear under the **TERMINAL** tab.  
If set toe true, the `config` prop should then be of type `DebugConfig`, else, it should be of type `TerminalConfig`. (more on those 2 types is down below).

### - `delayNextFor`

type: number
(Optional)

Puts a delay of X milliseconds after the execution.  
Sometimes you're running 2 servers, where one is dependant on the other being ready. You can put some delay between them by using the `delayNextFor` property.

### - `config`

type: `TerminalConfig` | `DebugConfig`
**(Required)**

Depending on whether you want a debugger terminal, or a regular terminal, you should pass the proper form of corresponding `config.`

#### - `config` of type `TerminalConfig`

##### - `config.command`

type: string
(Required)

The command to execute in that new terminal to be opened.  
This is the only required field on `config`.

##### - `config.name`

type: string
(Optional)

The name of the new terminal to be opened.  
Will appear in your IDE.

##### - `config.color`

type: 'red' | 'green' | 'blue' | 'yellow' | 'magenta' | 'cyan' | 'black' | 'white';
(Optional)
default: 'white'

The name of the terminal will be colored in that color.

##### - `config.autoFocus`

type: boolean
(Optional)
default: false

Should the terminal gain focus once it's open or not.

##### - `config.runtimeArgs`

type: Array<string>
(Optional)

You can add additional run time args to the command to execute.

#### - `config` of type `DebugConfig`

These props are all the props you usually put under your launch config, under your ".vscode/launch.json" file. Read more about those in the [official VSCode documentation](https://code.visualstudio.com/docs/editor/debugging#_launch-configurations).

---

## License

[MIT](LICENSE)
