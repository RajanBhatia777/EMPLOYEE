const conn = require('../config')
const empSchema = require('../employeeValidation')



const addEmployee = async ({first_name, last_name}) => {
    
  const params = [first_name, last_name];
    const sql = "INSERT INTO employee_management.employee(first_name,last_name) VALUES($1,$2) RETURNING employee_id,first_name,last_name,is_deleted";
    const {rows} = await conn.query(sql, params)
    console.log(rows)
    return rows;
};
const getEmployee = async ({employee_id}) => {
 
  const params = [employee_id];
  const sql = "select * from employee_management.employee where employee_id=$1";
  const { rows } = await conn.query(sql, params)
  //const result= await conn.query(sql,params) we use result also
 return rows;

}
const putEmployee = async ({first_name, last_name,employee_id}) => {
  

  const params = [first_name, last_name, employee_id];
  const sql = "update employee_management.employee set first_name =$1 ,last_name=$2 where employee_id=$3 RETURNING employee_id,first_name,last_name";

  const {rows} = await conn.query(sql, params)
  //const result= await conn.query(sql,params) we use result also 
  return rows;
}

const deleteEmployee = async ({employee_id}) => {
  
  const params = [employee_id];
  const sql = "update employee_management.employee set is_deleted=1 where employee_id=$1 RETURNING employee_id,first_name,last_name,is_deleted";
  const result = await conn.query(sql, params)
  return rows;
}

module.exports = { addEmployee, getEmployee, putEmployee, deleteEmployee };



