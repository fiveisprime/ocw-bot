SRC = index.js

test: $(SRC)
	@node node_modules/.bin/jshint $^ \
	--verbose
