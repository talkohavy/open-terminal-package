import { execSync } from 'child_process';
import fs, { cpSync } from 'fs';
import path from 'path';

/**
 * @typedef {{
 *   version: string,
 *   private?: string | boolean,
 *   main: string,
 *   type: 'module' | 'commonjs'
 *   types: string,
 *   scripts?: Record<string, string>,
 *   publishConfig: {
 *     access: string
 *   },
 *   devDependencies?: Record<string, string>,
 * }} PackageJson
 */

const outDirName = 'dist';

const ROOT_PROJECT = process.cwd();
const greenColor = '[32m';
const blueColor = '[34m';
const stopColor = '[39m';

buildPackageConfig();

async function buildPackageConfig() {
  cleanDistDirectory();

  build();

  copyStaticFiles();

  manipulatePackageJsonFile();

  console.log('DONE !!!');
}

function cleanDistDirectory() {
  console.log(`${greenColor}- Step 1:${stopColor} clear the dist directory`);
  execSync('rm -rf dist');
}

function build() {
  console.log(`${greenColor}- Step 2:${stopColor} build`);
  execSync('rollup --config'); // or the full command: rollup --config rollup.config.mjs
}

function copyStaticFiles() {
  console.log(`${greenColor}- Step 3:${stopColor} copy static files`);

  const filesToCopyArr = [
    { filename: 'package.json', sourceDirPath: [], destinationDirPath: [] },
    { filename: '.npmignore', sourceDirPath: [], destinationDirPath: [] },
    { filename: '.npmrc', sourceDirPath: [], destinationDirPath: [], isAllowedToFail: true },
    { filename: 'README.md', sourceDirPath: [], destinationDirPath: [] },
  ];

  filesToCopyArr.forEach(({ filename, sourceDirPath, destinationDirPath, isAllowedToFail }) => {
    try {
      const sourceFileFullPath = path.resolve(ROOT_PROJECT, ...sourceDirPath, filename);
      const destinationFileFullPath = path.resolve(ROOT_PROJECT, outDirName, ...destinationDirPath, filename);

      cpSync(sourceFileFullPath, destinationFileFullPath);
      console.log(`    • ${filename}`);
    } catch (error) {
      console.error(error);
      if (isAllowedToFail) return;

      throw new Error('File MUST exists in order to PASS build process! cp operation failed...');
    }
  });
}

function manipulatePackageJsonFile() {
  console.log(`${greenColor}- Step 4:${stopColor} copy & manipulate the package.json file`);

  const packageJsonPath = path.resolve(ROOT_PROJECT, outDirName, 'package.json');

  // Step: get the original package.json file
  /** @type {PackageJson} */
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

  packageJson.type = 'commonjs';
  delete packageJson.private;
  delete packageJson.scripts;
  delete packageJson.devDependencies;
  packageJson.publishConfig.access = 'public';
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));

  console.log(`  • ${blueColor}changed${stopColor} type module to commonjs`);
  console.log(`  • ${blueColor}changed${stopColor} from private to public`);
  console.log(`  • ${blueColor}deleted${stopColor} "scripts" key`);
  console.log(`  • ${blueColor}deleted${stopColor} "devDependencies" key`);
  console.log(`  • ${blueColor}changed${stopColor} publishConfig access to public`);
  console.log(`  • ${blueColor}package.json${stopColor} file written successfully!`);
}
