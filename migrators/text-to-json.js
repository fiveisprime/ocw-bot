var fs = require('fs');

if (process.argv.length < 4) process.exit(1);
if (!fs.existsSync(process.argv[2])) process.exit(1);

fs.readFile(process.argv[2], { encoding: 'utf8' }, function(err, data) {
  if (err) throw err;

  var bits = data.split('\n')
    , out  = []
    , i    = 0;

  for (; i < bits.length; i++) {
    // Keep the output at a reasonable size...
    if (i === 700) break;
    if (bits[i].length === 0) continue;
    out.push(bits[i].trim());
  }

  fs.writeFile(process.argv[3], JSON.stringify(out, null, '  '), function(err) {
    if (err) throw err;
    console.log('\n  \033[36mSaved to %s\033[0m\n', process.argv[3]);
  });
});
