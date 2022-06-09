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
    -                    OPTION 1 (OK)
    ---------------------------------------------------------------*/
    if (answers.menu === 'View All Departments') {
      const sql = `SELECT * FROM department`
      db.query(sql, (err, rows) => {
        var testing = rows;
        console.table(rows);
      });
    }
    /*---------------------------------------------------------------
    -                    OPTION 2 (OK)
    ---------------------------------------------------------------*/

    else if(answers.menu === 'View All Roles') {
      const sql = `SELECT jobrole.*, department.department_name AS department 
                  FROM jobrole 
                  LEFT JOIN department ON jobrole.department_id = department.id;`
      db.query(sql, (err, rows) => {
        console.table(rows);
      });
    }

    /*----------------------------------------------------------------------------
    -                    OPTION 3 (Missing Manager's Name column)
    ----------------------------------------------------------------------------*/

    else if(answers.menu === 'View All Employees') { 
      const sql = `SELECT employee.*, jobrole.title AS job_title
                  FROM employee
                  LEFT JOIN jobrole ON employee.role_id = jobrole.id;`
      db.query(sql, (err, rows) => {
        console.table(rows);
      });
    }

    /*----------------------------------------------------------------------------
    -                    OPTION 4 (PENDING)
    ----------------------------------------------------------------------------*/

    else if(answers.menu === 'Add Department') { 
      promptAddDepartment();
    }

    /*----------------------------------------------------------------------------
    -                   OPTION 5 (PENDING)
    ----------------------------------------------------------------------------*/

    else if(answers.menu === 'Add Role') { 
      promptAddRole();
    }

    /*----------------------------------------------------------------------------
    -                   OPTION 6 (PENDING)
    ----------------------------------------------------------------------------*/

    else if(answers.menu === 'Add Employee') { 
      promptAddEmployee();
    }

    /*----------------------------------------------------------------------------
    -  OPTION 7 is Selected -> 
    ----------------------------------------------------------------------------*/

    else if(answers.menu === 'Update Employee Role') { 
      promptUpdateEmployee();
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

const promptAddDepartment = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'department',
      message: `New Department Name: `,
      validate: nameInput => {
        if (nameInput) {
          const sql = `INSERT INTO department (department_name) VALUES (?);`;
          const params = [`${nameInput}`];
          db.query(sql, params, (err, rows) => {
            if (err) {
              console.log(err)
            }
            console.table(rows);
          });
          return;
        } 
        else {
          console.log(`Please define the department name`);
          return false;
        }
      }
    }
  ])
  .then()
  .catch((error) => {
    if (error.isTtyError) {
      console.log('did not work. try again');
      return;
    }
  })
};

const promptAddRole = () => {
  var newRole = [];
  return inquirer.prompt([
    {
      type: 'input',
      name: 'role-name',
      message: `New Role Name: `,
      validate: nameInput => {
        if (nameInput) { 
          newRole[0] = nameInput;
          return true;
        } 
        else {
          console.log(`Please define a name for the new role`);
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'role-salary',
      message: `New Role Salary Base: `,
      validate: nameInput => {
        if (nameInput) {
          newRole[1] = nameInput;
          return true;
        } 
        else {
          console.log(`Please define the salary base for the new role`);
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'role-department',
      message: `New Role Department: `,
      validate: nameInput => {
        if (nameInput) {
          newRole[2] = nameInput;
          const sql = `INSERT INTO jobrole (title, salary, department_id) VALUES (?, ?, ?);`;
          params = [`${newRole[0]}`, `${newRole[1]}`, `${newRole[2]}` ]
          db.query(sql, params, (err, rows) => {
            if (err) {
              console.log(err)
            }
            console.table(rows);
            return;
          });
          return;
        } 
        else {
          console.log(`Please define the department of the new role`);
          return false;
        }
      }
    }
  ])
  .then()
  .catch((error) => {
    if (error.isTtyError) {
      console.log('did not work. try again');
    }
  })
}

 const promptAddEmployee = () => {
   var newEmployee = [];
  return inquirer.prompt([
    {
      type: 'input',
      name: 'emlpoyee-first-name',
      message: `Employee's First Name: `,
      validate: nameInput => {
        if (nameInput) {
          newEmployee[0] = nameInput;
          return true;
        } 
        else {
          console.log(`Please provide the employee's first name`);
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'emlpoyee-last-name',
      message: `Employee's Last Name: `,
      validate: nameInput => {
        if (nameInput) {
          newEmployee[1] = nameInput;
          return true;
        } 
        else {
          console.log(`Please provide the employee's last name`);
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'emlpoyee-role',
      message: `Employee's Role ID: `,
      validate: nameInput => {
        if (nameInput) {
          newEmployee[2] = nameInput;
          return true;
        } 
        else {
          console.log(`Please provide the employee's role`);
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'emlpoyee-manager',
      message: `Employee's Manager ID: `,
      validate: nameInput => {
        if (nameInput) {
          newEmployee[3] = nameInput;
          const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?);`;
          params = [`${newEmployee[0]}`, `${newEmployee[1]}`, `${newEmployee[2]}`, `${newEmployee[3]}`]
          db.query(sql, params, (err, rows) => {
            if (err) {
              console.log(err)
            }
            console.table(rows);
            return;
          });
          return;
        } 
        else {
          console.log(`Please provide the employee's manager`);
          return false;
        }
      }
    }
  ])
  .then()
  .catch((error) => {
    if (error.isTtyError) {
      console.log('did not work. try again');
    }
  })
};

const promptUpdateEmployee = () => {

  let employeeList = [];

  const sql = `SELECT id, first_name, last_name FROM employee;`

  db.query(sql, (err, rows) => {
    
    for ( i = 0; i < rows.length; i++ ) {
        employeeList[i] = `${rows[i].first_name} ${rows[i].last_name}`; //REMEMBER DB IDs and Array locations are off by 1
    }  
  /* console.log(employeeList); */
  });

  return inquirer.prompt([
    {
      type: 'list',
      name: 'employee-update',
      message: 'Which Employee requires update?',
      choices: employeeList
    }
  ])
  
  .then()
  .catch((error) => {
    if (error.isTtyError) {
      console.log('did not work. try again');
    }
  })
};


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