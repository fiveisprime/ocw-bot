ocw-bot
=======

[![Codeship Status for fiveisprime/ocw-bot](https://www.codeship.io/projects/34861a60-285a-0131-9c6a-1a9646f61340/status?branch=master)](https://www.codeship.io/projects/9038)

IRC bot for lulz in the ocw channel.

# Text data and LevelDB

There is a plain text to level migrator that will take data from a text file,
split it on newline characters, then dump that data to the database with the
key as the index of that data in the array. This is used to add additional
lols to the randomness.

The migration command from the root directory is

    $ node ./migrators/text-t-level.js <path/to/text/file.txt>

If a file specifier is passed to the script, the data in the file will be added
to the database; otherwise, the script will calculate the total number of lols
in the level database and update its lolcount key which is used to grab data
randomly.

# Contributions

Be sure that `make test` exits with 0 before pushing your changes. :)
