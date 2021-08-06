const conn = require('../config')
const moment = require('moment');
const { date } = require('joi');
const time = async () => {
    let date_ob = new Date();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    let a = hours + ":" + minutes + ":" + seconds
    return a;
}
async function currentDate() {

    todayDate = moment(new Date()).format("YYYY-MM-DD");
    return todayDate;
}


const loginemployee = async ({ employee_id }) => {

    const Date = await currentDate()
    const loginTime = await time()
    const params = [employee_id,Date,loginTime];
    const sql = "INSERT INTO employee_management.employee_attendance(employee_id,date,login_time) VALUES($1,$2,$3) RETURNING employee_id,date,login_time";
    const { rows } = await conn.query(sql, params)
    return rows;
}

// const getLoginTime = async ({ employee_id }) => {
//     const params = [employee_id];

//     const sql = "select login_time from employee_management.employee_attendance where employee_id=$1";

//     const { rows } = await conn.query(sql, params)

//     return rows[0].login_time;
// }
const saveLogoutTime = async ({ employee_id }, req, res, next) => {
    const Date = await currentDate()
    const logoutTime = await time();
    const params = [logoutTime,Date, employee_id];
    const sql = "update employee_management.employee_attendance set logout_time=$1 where date=$2 AND employee_id=$3 RETURNING logout_time,date";
    const { rows } = await conn.query(sql, params)
    return (rows)
}
// const saveLogoutTime = async ({ employee_id }, req, res, next) => {

//     const logoutTime = await time();
//     const params = [logoutTime, employee_id];
//     const sql = "select logout_time from employee_management.employee_attendance where employee_id=$1";
//     const { rows } = await conn.query(sql, params)
//     return (rows)
// }
const calculateTime = async ({ employee_id }, req, res) => {
    //const login_time=await getLoginTime({employee_id});
    const params = [employee_id]
    const sql = "SELECT (logout_time-login_time) from employee_management.employee_attendance where employee_id=$1 "
    const { rows } = await conn.query(sql, params)
    return rows;
}

//let arr=[]

// const calculateTotalTimeFunction = async({workingHours,workingMinutes,workingSeconds})=>{
//     console.log(`${workingHours}:${workingMinutes}:${workingSeconds}`)
//     let tHours=0;
//     let tMinutes=0;
//     let tSeconds=0;
//  tSeconds += Number(workingSeconds);
//  tMinutes += Number(workingMinutes)
//  tHours += Number(workingHours);
//  let total_timeee = `${tHours}:${tMinutes}:${tSeconds}`
// return total_timeee;
// }
const logoutemployee = async ({ employee_id}) => {
    
    const Date = await currentDate()
   const saveTime = await saveLogoutTime({ employee_id });
    const working_hours = await calculateTime({ employee_id });

    var a = Object.values(working_hours).map((item) => {
        return Object.values(item).map((val) => {
            return Object.values(val)

        })
    });
    //console.log("....................",a[0][0][0],a[0][0][1],a[0][0][2])

    if (a[0][0].length < 3) {
        var workingHours = "00";
        var workingMinutes = a[0][0][0];
        var workingSeconds = a[0][0][1]
    } else {
        var workingHours = a[0][0][0];
        var workingMinutes = a[0][0][1];
        var workingSeconds = a[0][0][2]
        if (workingHours <= 10) {
            workingHours = "0" + workingHours
        }
    }
    if (workingMinutes <= 9) {
        workingMinutes = "0" + workingMinutes
    }
    else if(workingMinutes==0){
        workingMinutes="00"+workingMinutes
    }
    if (workingSeconds <= 10) {
        workingSeconds = "0" + workingSeconds...........................
    }
    var workingTimeInHours = workingHours +":"+ workingMinutes +":"+ workingSeconds;

    // const totalWorkingTime= await calculateTotalTimeFunction({workingHours,workingMinutes,workingSeconds});
     const params = [workingTimeInHours,employee_id,Date];

    const sql = "update employee_management.employee_attendance set time_duration=$1 where employee_id=$2 AND date=$3 RETURNING employee_id,date,login_time,logout_time,time_duration";
    const { rows } = await conn.query(sql, params)
    // console.log(rows)
    return rows;
}
module.exports = { loginemployee, logoutemployee}



