const mysql = require('mysql2');
const express = require('express');
const inquirer = require('inquirer');
const cTable = require('console.table');

const PORT = process.env.PORT || 3001;
const app = express();

/*---------------------------------------------------------------

-                            CONNECT TO DB

---------------------------------------------------------------*/

const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'X9s0R0xpto#i7rzX8$*',
    database: 'employee_tracker_db'
  },
  console.log('Connected to the election database.')
);


/*---------------------------------------------------------------
-                       Express middleware
---------------------------------------------------------------*/

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*---------------------------------------------------------------

-                            PROMPTS

---------------------------------------------------------------*/

const promptHomeMenu = () => {

  return inquirer.prompt([
    {
      type: 'list',
      name: 'menu',
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
  .then(answers => { 
    /*---------------------------------------------------------------
    -                       OPTION 1 is Selected
    ---------------------------------------------------------------*/
    if (answers.menu === 'View All Departments') {
      db.query(`SELECT * FROM department`, (err, rows) => {
        console.table(rows);
      });
    }
    /*---------------------------------------------------------------
    -                       OPTION 2 is Selected
    ---------------------------------------------------------------*/
    else if(answers.menu === 'View All Roles') {

      db.query(`SELECT * FROM jobrole`, (err, rows) => {
        console.table(rows);
      });
    }
    /*---------------------------------------------------------------
    -                       OPTION 3 is Selected
    ---------------------------------------------------------------*/
    else if(answers.menu === 'View All Employees') { 
      db.query(`SELECT * FROM employee`, (err, rows) => {
        console.table(rows);
      });
    }
  })
    /*---------------------------------------------------------------
    -                       Catch Error
    ---------------------------------------------------------------*/
  .catch((error) => {
    if (error.isTtyError) {
    } 
  })
};

/*---------------------------------------------------------------

-                            ROUTES

---------------------------------------------------------------*/

app.get('/api/department', (req, res) => {

  const sql = `SELECT * FROM department`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

/*---------------------------------------------------------------

-                            LISTENERS

---------------------------------------------------------------*/

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

promptHomeMenu();