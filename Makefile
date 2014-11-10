all: index.js adts.d.ts

sources := $(wildcard src/*.ts)

index.js adts.d.ts: $(sources)
	# prepare index.js
	tsc -t ES5 -d --out index.js $(sources)
	echo 'module.exports = adts;' >> index.js
	# prepare adts.d.ts
	sed 's/declare module adts/declare module "adts"/g' index.d.ts > adts.d.ts
	rm index.d.ts

clean:
	rm index.js adts.d.ts
