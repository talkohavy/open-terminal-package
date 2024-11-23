import fs, { cpSync } from 'fs';
import path from 'path';
import { defineConfig } from 'tsup';

/**
 * @typedef {{
 *   main: string,
 *   types: string,
 *   private?: string | boolean,
 *   scripts?: Record<string, string>,
 *   publishConfig: {
 *     access: string
 *   },
 * }} PackageJson
 */

const outDir = 'dist';
const ROOT_PROJECT = process.cwd();

// The `options` here is derived from CLI flags.
const tsupConfig = defineConfig((_options) => ({
  entry: ['src/index.ts'],
  // publicDir: './src',
  outDir, // <--- defaults to dist
  // bundle: false, // <--- defaults to true.
  format: ['esm', 'cjs'], // <-- If package.json type is set to module, the filenames are: [.js,.cjs], else: [.mjs, .js].
  splitting: false, // <--- defaults to true. Code splitting currently only works with the esm output format.
  treeshake: true, // <--- esbuild has tree shaking enabled by default, but sometimes it's not working very well, so tsup offers an additional option to let you use Rollup for tree shaking instead. This flag will enable Rollup for tree shaking.
  clean: true, // <--- Should clean output directory before each build?
  dts: true, // <--- Generate declaration file, meaning a index.d.ts.
  // sourcemap: true, // <-- If you don't minify you don't need sourcemaps! This will emit a ./dist/index.js.map.
  minify: true, // <--- You can minify the output, resulting into lower bundle sizes.
  target: 'esnext', // <--- The value for target defaults to compilerOptions.target in your tsconfig.json, or node14 if unspecified. For more information check out esbuild's target option.
  // env: process.NODE_ENV,
  async onSuccess() {
    copyStaticFiles();

    manipulatePackageJsonFile();

    return () => console.log('DONE !!!');
  },
}));

function copyStaticFiles() {
  console.log('[32m- Step 3:[39m copy static files');

  const filesToCopyArr = [
    { filename: 'package.json', sourceDirPath: [], destinationDirPath: [] },
    { filename: '.npmrc', sourceDirPath: [], destinationDirPath: [], isAllowedToFail: true },
    { filename: 'README.md', sourceDirPath: [], destinationDirPath: [] },
  ];

  filesToCopyArr.forEach(({ filename, sourceDirPath, destinationDirPath, isAllowedToFail }) => {
    try {
      const sourceFileFullPath = path.resolve(ROOT_PROJECT, ...sourceDirPath, filename);
      const destinationFileFullPath = path.resolve(ROOT_PROJECT, outDir, ...destinationDirPath, filename);

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
  console.log('[32m- Step 5:[39m copy & manipulate the package.json file');

  const packageJsonPath = path.resolve(ROOT_PROJECT, outDir, 'package.json');

  // Step 1: get the original package.json file
  /** @type {PackageJson} */
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());

  // Step 2: Remove all scripts
  delete packageJson.scripts;
  console.log('  • [34mdeleted[39m `scripts` key');

  // Step 3: Change from private to public
  delete packageJson.private;
  packageJson.publishConfig.access = 'public';
  console.log('  • [34mchanged[39m from private to public');
  console.log('  • [34mchanged[39m publishConfig access to public');

  // Step 4: remove 'outDir/' from "main" & "types"
  packageJson.main = packageJson.main.replace(`${outDir}/`, '');
  packageJson.types = packageJson.types.replace(`${outDir}/`, '');

  // Step 5: create new package.json file in the output folder
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson));
  console.log('  • [34mpackage.json[39m file written successfully!');
}

export default tsupConfig;
