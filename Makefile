SRC = index.js lib/bot.js spec/ocw-bot-spec.js

test: $(SRC)
	@node_modules/.bin/jshint $^
	@node_modules/.bin/istanbul test node_modules/.bin/_mocha \
	-R spec -- \
	--require should \
	--reporter spec
