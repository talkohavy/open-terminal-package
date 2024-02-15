import fs from 'fs';
import { defineConfig } from 'tsup';

const outDir = 'dist';

// The `options` here is derived from CLI flags.
const tsupConfig = defineConfig((_options) => ({
  entry: ['src/index.js'],
  publicDir: './src',
  outDir, // <--- defaults to dist
  bundle: false, // <--- defaults to true.
  format: ['esm'], // <-- If package.json type is set to module, the filenames are: [.js,.cjs], else: [.mjs, .js].
  splitting: false, // <--- defaults to true. Code splitting currently only works with the esm output format.
  treeshake: true, // <--- esbuild has tree shaking enabled by default, but sometimes it's not working very well, so tsup offers an additional option to let you use Rollup for tree shaking instead. This flag will enable Rollup for tree shaking.
  clean: true, // <--- Should clean output directory before each build?
  // dts: true, // <--- Generate declaration file, meaning a index.d.ts.
  // sourcemap: true, // <-- If you don't minify you don't need sourcemaps! This will emit a ./dist/index.js.map.
  // minify: true, // <--- You can minify the output, resulting into lower bundle sizes.
  target: 'esnext', // <--- The value for target defaults to compilerOptions.target in your tsconfig.json, or node14 if unspecified. For more information check out esbuild's target option.
  // env: process.NODE_ENV,
  async onSuccess() {
    copyTheReadmeFile();

    // copyTheNpmrcFile();

    copyThePackageJsonFile();

    // Step 5: run the cleanup function
    return () => {
      // cleanupFunction()
      console.log('DONE !!!');
    };
  },
}));

function copyTheReadmeFile() {
  const readStreamReadmeMd = fs.createReadStream('./README.md');
  const writeStreamReadmeMd = fs.createWriteStream(`./${outDir}/README.md`);
  readStreamReadmeMd.pipe(writeStreamReadmeMd);
}

// function copyTheNpmrcFile() {
//   const readStreamNpmrc = fs.createReadStream('./.npmrc');
//   const writeStreamNpmrc = fs.createWriteStream(`./${outDir}/.npmrc`);
//   readStreamNpmrc.pipe(writeStreamNpmrc);
// }

function copyThePackageJsonFile() {
  const packageJson = JSON.parse(fs.readFileSync('./package.json').toString());

  // - Remove all scripts
  delete packageJson.scripts;

  // - Change from private to public
  delete packageJson.private;
  packageJson.publishConfig.access = 'public';

  fs.writeFileSync(`./${outDir}/package.json`, JSON.stringify(packageJson));
}

export default tsupConfig;
