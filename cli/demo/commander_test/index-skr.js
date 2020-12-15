const program = require('commander');

program
    .option('-s, --small <type>', 'small pizza size',123)//<必选> [可选]

program.parse(process.argv);

console.log(program.small);