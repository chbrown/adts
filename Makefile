SHELL := bash

# all we really want to end up with is index.js and adts.d.ts
all: index.js adts.d.ts

node_modules/.bin/tsc:
	npm install

index.js: index.ts | node_modules/.bin/tsc
	node_modules/.bin/tsc -t ES5 -m commonjs $<

adts.d.ts: index.ts | node_modules/.bin/tsc
	cat <(echo 'module adts {') index.ts <(echo '}') > module.ts
	node_modules/.bin/tsc -t ES5 -m commonjs -d module.ts
	sed 's/declare module adts/declare module "adts"/g' module.d.ts > $@
	# clean up
	rm module.{ts,js,d.ts}
