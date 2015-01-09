# all we really want to end up with is index.js and adts.d.ts
SHELL := bash
MODULE := adts
SOURCES := $(wildcard src/*.ts)

all: index.js $(MODULE).d.ts clean

index.js: $(SOURCES)
	node_modules/.bin/tsc --target ES5 --module commonjs $(SOURCES)
	cat $(+:%.ts=%.js) > $@

tmp:
	mkdir tmp

$(MODULE).d.ts: $(SOURCES) | tmp
	cat <(echo 'module $(MODULE) {') $+ <(echo '}') > tmp/module.ts
	node_modules/.bin/tsc --target ES5 --declaration tmp/module.ts
	sed 's/declare module \([A-Za-z_]*\)/declare module "\1"/g' tmp/module.d.ts > $@

.PHONY: clean distclean
clean:
	rm -rf src/*.js tmp

distclean: clean
	rm -f index.js $(MODULE).d.ts
