const chalk = require('chalk');
const program = require('commander');

program.version('0.0.1');//--version
program.name("cc").usage('<command> [options]');



program
    .command('build')
    .arguments('<cmd> [env]')
    .action((cmd,env)=>{
        console.log(cmd);
        console.log(env);
    });

program
    // .command('init <aaa> [bbbb]', 'init packages of cc')
    .command('init <aaa> [bbbb]')//没有第二个参数时action才会执行
    .description('init~~~~~')
    .action((aaa,bbb)=>{
        console.log(aaa);
        console.log(bbb);
    })
    .option('-sb, --sbbbb', 'hhhhhhhh')
    .option('-s, --small <type>', 'small pizza size',123)//<必选> [可选]
    .option('-p, --pizza <type>', 'flavour of pizza');
    


program.parse(process.argv);//process.argv 可以拿到在命令行的输入

//提到option的，program.xx为true；有设置值或者没提到但有默认值的，program.xx为该值
if (program.sbbbb){
    console.log(chalk.blue('sbbbb'));
}

if (program.small){
    console.log(chalk.blue('small'));
}
if (program.pizzaType){
    console.log(chalk.blue('pizzaType'));
}

// console.log(chalk.blue(program.pizzaType));
// console.log(chalk.blue(program.small));
// console.log(chalk.blue(program.sbbbb));