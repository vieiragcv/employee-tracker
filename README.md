# employee-tracker

AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business

GIVEN a command-line application that accepts user input

WHEN I start the application
THEN I am presented with the following options: 

  view all departments,   (OK - PROMPT APPEARING)
  view all roles,         (OK - PROMPT APPEARING)
  view all employees,     (OK - PROMPT APPEARING)
  
  add a department,       (OK - PROMPT APPEARING)
  add a role,             (OK - PROMPT APPEARING)
  add an employee, and    (OK - PROMPT APPEARING)
  
  update employee role    (OK - PROMPT APPEARING)

WHEN I choose to view all departments
THEN I am presented with a formatted 
table showing 
  department names and 
  department ids  

    (OK - PASTING SUCCESSFULLY)      

WHEN I choose to view all roles   
THEN I am presented with the 
  job title, 
  role id, the 
  department that role belongs to, and the 
  salary for that role     

    (OK - PASTING SUCCESSFULLY) 

WHEN I choose to view all employees
THEN I am presented with a formatted table showing 

  employee data, including employee ids, first names, last names, job titles, departments, salaries, and 
  managers that the employees report to 
  
    (OK - Potential Improvement: Show Manager's Name instead of ID)

WHEN I choose to add a department
THEN I am prompted to enter the 
  name of the department and that department is added to the database

  (PENDING)

WHEN I choose to add a role
THEN I am prompted to enter the 
  name, 
  salary, and 
  department for the role and that role is added to the database

(OK)
  
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s 
  first name, 
  last name, 
  role, and 
  manager, and that employee is added to the database

(OK)
  
WHEN I choose to update an employee role
THEN I am prompted to select an 
  employee to update and 
  their new role and this information is updated in the database

(PENDING)
  