const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer')  // npm i inquirer -D


inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'isFirsttime',
      message: '第一次用脚手架吗?',
      default: true,
    },
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
    if(error.isTtyError) {
      console.log(error);
      // Prompt couldn't be rendered in the current environment
    } else {
      console.log(error);
      // Something else went wrong
    }
  });
