const conn=require('../config')
const bcrypt=require('bcryptjs')

const time=async ()=>{
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let a= hours +":"+minutes+":"+seconds
    
    return a;

}
const loginemployee =async (req,res,next)=>{

    try{


    const {first_name,last_name,email_id,phone_number,password}= req.body;

    const hash= await bcrypt.hash(password,10)
    
    const loginTime=await time()
    const params =[first_name,last_name,email_id,phone_number,hash,loginTime];
    const sql = "INSERT INTO employee_management.employee_attendance(first_name,last_name,email_id,phone_number,password,login_time) VALUES($1,$2,$3,$4,$5,$6) RETURNING employee_id,first_name,last_name,email_id,phone_number,login_time,password,is_deleted";
     const result =   await conn.query(sql,params)
    console.log(result)

        res.send(result.rows)
    }
    catch(err){
        res.send("error")
    }


     
 }

 const logoutemployee =async (req,res,next)=>{

    const{employee_id}=req.params
    const logoutTime=await time()
    const params =[logoutTime,employee_id];
    const sql = "update employee_management.employee_attendance set logout_time=$1 where employee_id=$2 RETURNING login_time,first_name,last_name,logout_time";
     const result =   await conn.query(sql,params)
    console.log(result)

        res.send(result.rows)

 }
  module.exports={loginemployee,logoutemployee}

   

