var level = require('level')
  , fs    = require('fs')
  , db    = level('./loltext.db');

if (process.argv.length >= 3)
  migrateFileData(process.argv[2])
else
  getObjectCount();

//
// Migrate plain text data to the database.
//
// This will overwrite any existing data in the database; it's possible to make
//    it smart by checking the 'lolcount' before putting the data in there and
//    starting at that index.
//
function migrateFileData(file) {
  fs.readFile(file, { encoding: 'utf8' }, function(err, data) {
    if (err) throw err;

    var bits = data.split('\n');

    // This should be updated to start at the index of 'lolcount'.
    for (var i = 0; i < bits.length; i++) {
      if (bits[i].length === 0) continue;
      db.put(i, bits[i].trim(), function(err) {
        if (err) console.error('error: ', err);
      });
    }
  });
}

//
// Gets the total count of objects in the database. This is useful for the
//    `!text` command where we base our randomized number on this count.
//
function getObjectCount() {
  var values = [];

  db.createReadStream()
    .on('data', function(data) {
      values.push(data);
    })
    .on('close', function() {
      // Log out the count in color.
      console.log('\n  \033[36mfound %d lols in the database\033[0m', values.length);
      console.log('  \033[33mupdated database lolcount\033[0m\n');

      // Update/add the 'lolcount' in the database.
      db.put('lolcount', values.length);
    });
}
