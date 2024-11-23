import fs from 'fs';
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
    copyReadmeFile();

    copyAndManipulatePackageJsonFile();

    return () => console.log('DONE !!!');
  },
}));

function copyReadmeFile() {
  console.log('- Step 3: copy the README.md file');
  const readStreamReadmeMd = fs.createReadStream('./README.md');
  const writeStreamReadmeMd = fs.createWriteStream(`./${outDir}/README.md`);
  readStreamReadmeMd.pipe(writeStreamReadmeMd);
}

function copyAndManipulatePackageJsonFile() {
  console.log('- Step 4: copy & manipulate the package.json file');
  // Step 1: get the original package.json file
  /** @type {PackageJson} */
  const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());

  // Step 2: Remove all scripts
  delete packageJson.scripts;
  console.log('-- deleted `scripts` key');

  // Step 3: Change from private to public
  delete packageJson.private;
  packageJson.publishConfig.access = 'public';
  console.log('-- changed from private to public');
  console.log('-- changed publishConfig access to public');

  // Step 4: remove 'outDir/' from "main" & "types"
  packageJson.main = packageJson.main.replace(`${outDir}/`, '');
  packageJson.types = packageJson.types.replace(`${outDir}/`, '');

  // Step 5: create new package.json file in the output folder
  fs.writeFileSync(`./${outDir}/package.json`, JSON.stringify(packageJson));
  console.log('-- package.json file written successfully!');
}

export default tsupConfig;
