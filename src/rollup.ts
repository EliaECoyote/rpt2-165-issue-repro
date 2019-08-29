import {
  rollup,
  watch,
  OutputOptions,
  RollupWatcher,
  RollupOptions,
} from "rollup"
import typescript from "rollup-plugin-typescript2"
import resolve from "rollup-plugin-node-resolve"

const nodeResolvePlugin = resolve({
  extensions: [".js", ".ts"],
  // loads browser bundle from deps when available
  browser: true,
})
// transpiles
const typescriptPlugin = typescript({ verbosity: 2 })

/**
 * generates the minified / uglified bundle for the browsers
 * @returns promise
 */
export async function buildMinifiedBrowserBundle(): Promise<void> {
  const inputOptions: RollupOptions = {
    input: "src/index.ts",
    plugins: [
      typescriptPlugin,
      nodeResolvePlugin,
    ],
  }
  const outputOptions: OutputOptions = {
    file: "dist/bundle.js",
    format: "iife",
  }
  const bundle = await rollup(inputOptions)
  await bundle.generate(outputOptions)
  await bundle.write(outputOptions)
}

buildMinifiedBrowserBundle()