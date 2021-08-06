# esbuild-plugin-substrate
esbuild plugin to convert explorable.md documents into plain javascript modules.


## usage

esbuild.js
```js
import esbuild         from 'esbuild';
import substratePlugin from 'esbuild-plugin-substrate';


esbuild.build({
    entryPoints: [ 'input.js' ],
    bundle: true,
    minify: false,
    outfile: 'out.js',
    plugins: [
        substratePlugin()
    ]
});
```

can then bundle by running `node esbuild.js`
