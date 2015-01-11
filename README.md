# adts

[Abstract Data Types](http://en.wikipedia.org/wiki/Abstract_data_type) in TypeScript.

Also an exercise in figuring out best practice when distributing a TypeScript project via npm.

Concerns so far:

* Would it be good to have an `.npmignore` containing `src/*`, `Makefile`, etc.?
* Everything is packaged up in `index.js`; would that still be a good idea if it was a big project?


## Example import configuration

If you have a **plain JavaScript** Node.js project, imports work as usual.

Download the `adts` package from the npm registry:

    npm install --save adts

Then require and use:

    var adts = require('adts');

    var primes = new adts.Set([2, 3, 5, 7, 11, 13, 17, 19, 23]);
    var even = new adts.Set([2, 4, 6, 8, 10, 12, 14, 16]);
    var even_primes = adts.Set.intersection([even, primes]);
    console.log('primes that are even: %j', even_primes);
    // prints 'primes that are even: ["2"]'


If you have a **TypeScript** Node.js project, using [`tsd`](http://definitelytyped.org/tsd/) and [DefinitelyTyped](http://definitelytyped.org/) for most of your dependencies, imports are straightforward, but not idiomatic:

Download the `adts` package from the npm registry.

    npm install --save adts

Assuming `tsd` is using the defaults, the aggregate `d.ts` file will be in `typings/tsd.d.ts`. Open that file, and add the following line:

    /// <reference path="../node_modules/adts/adts.d.ts"/>

(The `tsd` documentation states that `tsd link` will handle that, but `tsd link` isn't actually a `tsd` command.)

Now importing the aggregate file will import the `adts` type declarations along with it.
Suppose you want to use the `adts` module in `index.ts`:

    /// <reference path="typings/tsd.d.ts"/>
    import adts = require('adts');

    var primes = new adts.Set([2, 3, 5, 7, 11, 13, 17, 19, 23]);
    var even = new adts.Set([2, 4, 6, 8, 10, 12, 14, 16]);
    var even_primes = adts.Set.intersection([even, primes]);
    console.log('primes that are even: %j', even_primes);

Now try to compile:

    tsc -m commonjs index.ts

Which produces the error message:

    index.ts(4,27): error TS2345: Argument of type 'number[]' is not assignable to
      parameter of type 'string[]'. Type 'number' is not assignable to type 'string'.
    index.ts(5,25): error TS2345: Argument of type 'number[]' is not assignable to
      parameter of type 'string[]'. Type 'number' is not assignable to type 'string'.

It turns out `adts.Set` only accepts strings in its constructor, since that's how it stores elements internally.
The plain JS version automatically coerced them to strings, which is fine, but something we need to care about if we're using TypeScript.
Rewrite the sets like so:

    var primes = new adts.Set(['2', '3', '5', '7', '11', '13', '17', '19', '23']);
    var even = new adts.Set(['2', '4', '6', '8', '10', '12', '14', '16']);

Now recompile (`tsc -m commonjs index.ts`) and run:

    node index.js
    // prints 'primes that are even: ["2"]'


## TODO

- Container
- Deque
- Graph
- List
- Map
- Map/Associative array/Dictionary
- Multimap
- Multiset/Bag (**partially done**)
- Priority queue
- Queue
- Set (**done**)
- Stack (**done**)
- Tree

... more?


## Build notes

TypeScript does not make inter-project modularity easy. Here are some features that I'd like [`tsc`](https://github.com/Microsoft/TypeScript) to support.

1. Generate a `.d.ts` type declaration for use by 3rd-party modules.

  As it stands, I'm not sure what the point of the declaration file is, since if you're generating a declaration file that only allows TypeScript-powered imports, you have to TypeScript-import the original modules as well, which `tsc` is then obliged to compile.

  Fixing this can be pretty simple for a small project: `sed 's/declare module adts/declare module "adts"/g'`

2. Merge module declarations in the generated `.d.ts` file.

  TypeScript (as least v1.1) does not like having multiple external module declarations in one file, e.g., 'module "adts" { ... } module "adts" { } ...'. Otherwise, it's quite happy at merging interfaces and modules, but only reads one external module declaration when there are multiple. (Maybe this is fixed in v1.3?)

3. Export a specific module in the generated `.d.ts` file, and expose that module at root level in the generated `.js` file(s).

  In a typical Node.js module, often the only place the module name shows up is in the `package.json` and documentation. I like using namespaces, but TypeScript's compiler does not use them in a way that plays nice with Node.js's import idioms.


### Implementation hacks

The [Makefile](Makefile) demonstrates how I've hacked together support for these features, at least for this admittedly simplistic project.

* All JavaScript code is exported in a single `index.js` file.
* All type declarations are exported in `adts.d.ts`.
  This filename is determined by the Makefile, not the project structure or TypeScript namespaces.
* I can add TypeScripts files to `src/`, and these will automatically get picked up by the make process.
  (But adding files to subdirectories would require further hacks.)


## License

Copyright 2014-2015 Christopher Brown. [MIT Licensed](http://opensource.org/licenses/MIT).
