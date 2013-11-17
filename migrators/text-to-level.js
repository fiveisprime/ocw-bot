var level = require('level')
  , fs    = require('fs')
  , db    = level('./loltext.db');

if (process.argv.length >= 3)
  migrateFileData(process.argv[2])
else
  getObjectCount();

function migrateFileData(file) {
  fs.readFile(file, { encoding: 'utf8' }, function(err, data) {
    if (err) throw err;

    var bits = data.split('\n');

    for (var i = 0; i < bits.length; i++) {
      if (bits[i].length === 0) continue;
      db.put(i, bits[i].trim(), function(err) {
        if (err) console.error('error: ', err);
      });
    }
  });
}

function getObjectCount() {
  var values = [];

  db.createReadStream()
    .on('data', function(data) {
      values.push(data);
    })
    .on('close', function() {
      console.log('\n  \033[36mfound %d lols in the database\033[0m', values.length);
      console.log('  \033[33mupdated database lolcount\033[0m\n');
      db.put('lolcount', values.length);
    });
}
