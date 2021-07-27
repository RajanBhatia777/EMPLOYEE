const conn=require('../config')
const comSchema= require('../computerValidation')
const addComputer =async (req,res,next)=>{
  const {computer_serial_number,employee_id}= req.body;

  try{
       const value= await comSchema.validateAsync({computer_serial_number})
       
       const params =[computer_serial_number,employee_id];
       
       const sql = "INSERT INTO employee_management.allocated_computers(computer_serial_number,employee_id) VALUES($1,$2) RETURNING allocated_computer_id,computer_serial_number,employee_id,is_deleted";
       const result =   await conn.query(sql,params)
       console.log(result)

       res.send(result.rows)
       
      
     }
 catch(err){
       res.send(err)
     }
};
const getComputer =async (req,res,next)=>{
  const {allocated_computer_id}= req.params;

  const params =[allocated_computer_id];
  const sql = "Select * from employee_management.allocated_computers where allocated_computer_id=$1 ";
 const result =   await conn.query(sql,params)
  console.log(result)

 res.send(result.rows)
 
};

const updateComputer =async (req,res,next)=>{

  const {computer_serial_number}= req.body;
  const {allocated_computer_id}= req.params;


  const params =[computer_serial_number,allocated_computer_id];
  const sql = "update employee_management.allocated_computers set computer_serial_number=$1 where allocated_computer_id=$2 RETURNING allocated_computer_id,computer_serial_number,employee_id,is_deleted";
  const result =   await conn.query(sql,params)
  console.log(result)

  res.send(result.rows)
 
};
const deleteComputer= async (req,res,next)=>{

  const{allocated_computer_id}=req.params
  const params=[allocated_computer_id];
  const sql = "update employee_management.allocated_computers set is_deleted=1 where allocated_computer_id=$1 RETURNING allocated_computer_id,computer_serial_number,employee_id,is_deleted";;
  const result= await conn.query(sql,params)
   res.send(result.rows)
   
};

module.exports={addComputer,getComputer,updateComputer,deleteComputer}
