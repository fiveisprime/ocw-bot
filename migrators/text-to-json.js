var fs = require('fs');

if (process.argv.length < 4) process.exit(1);

fs.readFile(process.argv[2], { encoding: 'utf8' }, function(err, data) {
  if (err) throw err;

  var bits = data.split('\n')
    , out = [];

  for (var i = 0; i < bits.length; i++) {
    if (bits[i].length === 0) continue;
    out.push(bits[i].trim());
  }

  fs.writeFile(process.argv[3], JSON.stringify(out), function(err) {
    if (err) throw err;
    console.log('\n  \033[36mSaved to %s\033[0m\n', process.argv[3]);
  });
});
