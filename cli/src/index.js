const chalk = require('chalk');
const { program } = require('commander');

program
    .version('0.0.1')//--version
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small', 'small pizza size')
    .option('-p, --pizza-type <type>', 'flavour of pizza')
    //  .usage('<command> [options]')
    //  .command('init [projectName]', 'Init a project with default templete')
    //  .command('build', 'Build a project with options')
    //  .command('update', 'Update packages of taro')
    .parse(process.argv);

if (program.debug){
    console.log(chalk.blue('debug'));
}

if (program.small){
    console.log(chalk.blue('small'));
}
if (program.pizzaType){
    console.log(chalk.blue('pizzaType'));
}

console.log(program.args);
console.log(process.argv);
// console.log(chalk.blue('Hello world!'));