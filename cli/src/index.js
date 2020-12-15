const chalk = require('chalk');
const commander = require('commander');
const ora = require('ora');
const inquirer = require('inquirer')  // npm i inquirer -D

const spinner = ora('');
const program = new commander.Command();

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
    .command('init <aaa> [bbbb]')//没有第二个参数时action才会执行,有第二个参数时会执行index-init.js
    .option('-sb, --sbbbb', 'hhhhhhhh')
    .option('-s, --small <type>', 'small pizza size',123)//<必选> [可选]
    .option('-p, --pizza <type>', 'flavour of pizza')
    .description('init~~~~~')
    .action((aaa,bbb,ccc)=>{
        console.log(aaa);
        console.log(bbb);
        console.log(ccc.sbbbb);
    });

program.command('skr','skr skr skr');
    

// program.command会让后面的program.xxx undefined
program.parse(process.argv);//process.argv 可以拿到在命令行的输入

return
inquirer
  .prompt([
    // {
    //   type: 'confirm',
    //   name: 'isFirsttime',
    //   message: '第一次用脚手架吗?',
    //   default: true,
    // },
    {
      type: 'input',
      name: 'projectName',
      message: "What's your project name?",
      validate: function (value) {
        var pass = value.match(/\D/);
        if (pass) {
          return true;
        }
        return 'Please enter a valid project name';
      },
    },
  ])
  .then(answers => {
    console.log(answers);
    // Use user feedback for... whatever!!
  })
  .catch(error => {
    spinner.fail();
    if(error.isTtyError) {
      console.log(error);
      // Prompt couldn't be rendered in the current environment
    } else {
      console.log(error);
      // Something else went wrong
    }
  });