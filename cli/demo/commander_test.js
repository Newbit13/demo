const chalk = require('chalk');
const { program } = require('commander');

program.version('0.0.1');//--version
program.usage('<command> [options]');

program
    .option('-d, --debug', 'output extra debugging')
    .option('-s, --small <type>', 'small pizza size',123)
    .option('-p, --pizza-type <type>', 'flavour of pizza','fffloat');
    // .option('-p, --pizza-type <type>', 'flavour of pizza','fffloat')//执行时不用-p、--pizza-type、参数也不用

program
    .command('init', 'Update packages of taro')
    .option('-sb, --sbbbb', 'hhhhhhhh')
    .action((options)=>{
        // console.log(options.action);
    });


program.parse(process.argv);//process.argv 可以拿到在命令行的输入

//有默认值或者有提到其参数的，这里会为true
if (program.debug){
    console.log(chalk.blue('debug'));
}

if (program.small){
    console.log(chalk.blue('small'));
}
if (program.pizzaType){
    console.log(chalk.blue('pizzaType'));
}

console.log(chalk.blue(program.pizzaType));
console.log(chalk.blue(program.small));