# rollup-plugin-typescript2 external modules issue repro

Reproduction of the [issue](https://github.com/ezolenko/rollup-plugin-typescript2/issues/165) related to *loading external modules with the [rollup-plugin-typescript2](https://github.com/ezolenko/rollup-plugin-typescript2) rollup plugin*

## Project infos

- use `yarn install` & `yarn build` to install and generate the bundle. *Node 10 is required*
- The output of the transpilation and bundling process is located in a single [dist/bundle.js](dist/bundle.js) file
- The bundling codebase is located in [src/rollup](./src/rollup.ts). It uses the rollup node api
- The bundling codebase uses a tsconfig.rollup.json file in order to run, but the **rollup-plugin-typescript2 plugin** uses the standard **tscconfig.json**

## Explanation

In this specific case we're bundling a web component, which imports a module, [lit-element](./node_modules/lit-element/lit-element.js) that:

- is exported as es2015 modules
- contains [es2015 classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

## Expected behavior

Since the target described in [tsconfig.json](./tsconfig.json) file is es5, and *lit-element* is included in tsconfig.json settings, I expect to have **no classes** in the generated **bundle.js** file.

## Actual behavior

In the **bundle.js** file, only the codebase contained in index.ts is transpiled correctly.\
The codebase bundled from [lit-element](./node_modules/lit-element/lit-element.js) still contains classes.
