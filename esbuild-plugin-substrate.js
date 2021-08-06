import path           from 'path'
import fs             from 'fs/promises'
import substrateBuild from 'substrate-build'


export default function (options) {
  const { filter, namespace } = Object.assign(
    {
      /**
       *  A regex filter to match the desired import. Defaults to imports that start with `inline:`, e.g.
       *  import 'inline:./file.ext';
       */
      filter: /.*\.explorable\.md$/,

      /**
       * The namespace to use. If you use more than one instance of this plugin, each one should have a unique
       * namespace. This is a random string by default, so you won't need to change it unless you're targeting a
       * specific namespace.
       */
      namespace: '_' + Math.random().toString(36).substr(2, 9)
    },
    options
  );

  return {
    name: 'esbuild-plugin-substrate',
    setup(build) {
      
      build.onResolve({ filter }, args => {
        return {
          path: path.resolve(args.resolveDir, args.path),
          namespace
        }
      })
      

      build.onLoad({ filter: /.*/, namespace }, async args => {
        const source = await fs.readFile(args.path, 'utf8')
        return {
          contents: substrateBuild({ source }),
          loader: 'js',
          resolveDir: path.dirname(args.path)
        }
      })
    }
  }
}
