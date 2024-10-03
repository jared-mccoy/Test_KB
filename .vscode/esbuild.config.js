import esbuild from 'esbuild';
import { sassPlugin } from 'esbuild-sass-plugin';

// Define the build options
const buildOptions = {
  entryPoints: ['quartz/build.ts'],
  bundle: true,
  outfile: 'dist/out.js',
  plugins: [sassPlugin()],
  platform: 'node',
  sourcemap: 'inline',
  external: ['esbuild', '@napi-rs/simple-git-win32-x64-msvc', 'lightningcss', 'jsdom'],
  loader: { '.node': 'file' }
};

// Create a build context for watch mode
esbuild.context(buildOptions).then((ctx) => {
  // Start watching for changes
  ctx.watch().then(() => {
    console.log('Watching for changes...');
  }).catch((error) => {
    console.error('Failed to start watch mode:', error);
    process.exit(1);
  });
}).catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});
