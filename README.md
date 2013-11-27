ocw-bot
=======

[![Codeship Status for fiveisprime/ocw-bot](https://www.codeship.io/projects/34861a60-285a-0131-9c6a-1a9646f61340/status?branch=master)](https://www.codeship.io/projects/9038)

IRC bot for lulz in the ocw channel.

# Text to JSON

There is a plain text to JSON migrator that will take data from a text file,
split it on newline characters, then dump that data to a JSON file.

The migration command from the root directory is

    $ node migrators/text-to-json.js <path/to/input-file.txt> <path/to/output-file.json>

To use this JSON file in the bot, just require it and use it as an array of
data.

# Continuous Integration

All changes that are pushed will trigger a Codeship build and deploy the changes
if the `npm test` passes.
