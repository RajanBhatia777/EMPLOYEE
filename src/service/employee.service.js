const conn=require('../config')
const addEmployee =async (req,res,next)=>{
    const {first_name,last_name}= req.body;
    
   const params =[first_name,last_name];
     const sql = "INSERT INTO employee_management.employee(first_name,last_name,is_deleted) VALUES($1,$2,0) RETURNING employee_id,first_name,last_name,is_deleted";
   const result =   await conn.query(sql,params)
    console.log(result)

   res.send(result.rows)

       
   
};



const getEmployee= async (req,res,next)=>{
    const{employee_id} = req.params
    
    const params=[employee_id];
    const sql = "select * from employee_management.employee where employee_id=$1";
    const {rows}= await conn.query(sql,params)
    //const result= await conn.query(sql,params) we use result also
     res.send(rows)
    
}
    const putEmployee= async (req,res,next)=>{
    const{first_name,last_name} = req.body
    const{employee_id}=req.params
    
    const params=[first_name,last_name,employee_id];
    const sql = "update employee_management.employee set first_name =$1 ,last_name=$2 where employee_id=$3 RETURNING employee_id,first_name,last_name";
    
    const result= await conn.query(sql,params)
    
    //const result= await conn.query(sql,params) we use result also
    console.log(result)
     res.send(result.rows)
     
     
    



}

  const deleteEmployee= async (req,res,next)=>{
  const{employee_id}=req.params

  
  const params=[employee_id];
  const sql = "update employee_management.employee set is_deleted=1 where employee_id=$1";

  
  
  const result= await conn.query(sql,params)
  
  //const result= await conn.query(sql,params) we use result also
  console.log(result)
   res.send(result.rows)
   
   
  


  }

module.exports={addEmployee,getEmployee,putEmployee,deleteEmployee};



