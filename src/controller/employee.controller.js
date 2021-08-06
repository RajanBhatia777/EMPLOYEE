const service = require('../service/employee.service')
const validation= require('../employeeValidation')

const getEmployee= async (req,res,next)=>{
try{
 const { employee_id } = req.params;
 const data =await service.getEmployee({employee_id});
 res.send(data)
}catch(err){
  res.send(err)
}
}

const addEmployee = async (req, res, next) => {
  try{
  const { first_name, last_name } = req.body;
  //const value = await empSchema.validateAsync({ first_name, last_name });
  const data= await service.addEmployee({first_name, last_name });
  res.send(data)
}catch(err){
  res.send(err)
}
}
const putEmployee = async (req, res, next) => {
  try{
const { first_name, last_name } = req.body
const { employee_id } = req.params
const data = await service.putEmployee({first_name, last_name,employee_id})
res.send(data)
}catch(err){
  res.send(err)
}
}
const deleteEmployee = async (req, res, next) => {
  try{
  const { employee_id } = req.params
  const data = await service.deleteEmployee({employee_id})
res.send(data)
}catch(err){
  res.send(err)
}
}
module.exports={getEmployee,addEmployee,putEmployee,deleteEmployee}