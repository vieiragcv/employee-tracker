const express = require('express');
const inquirer = require('inquirer');



const promptHomeMenu = () => {

  return inquirer.prompt([
    {
      type: 'list',
      name: 'Menu Options',
      message: 'What would you like to do?',
      choices: ['View All Departments', 
                'View All Roles', 
                'View All Employees',
                'Add Department',
                'Add Role',
                'Add Employee',
                'Update Employee Role']
    }
  ])
  .then((answers) => {
    console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } 
    else {
      // Something else went wrong
    }
  })
};

promptHomeMenu();