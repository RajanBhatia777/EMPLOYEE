/* eslint-disable camelcase */
/* eslint-disable quotes */
const moment = require('moment');
const { date } = require('joi');
const conn = require('../config');

async function currentDate() {
  const todayDate = new Date().toDateString();
  return todayDate;
}
async function currentDateWithTime() {
  todayDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
  return todayDate;
}

const loginemployee = async ({ employee_id }) => {
  const currDate = await currentDate();
  const loginTime = await currentDateWithTime();
  const params = [employee_id, currDate, loginTime];
  const sql = "INSERT INTO employee_management.employee_attendance(employee_id,date,login_time) VALUES($1,$2,$3) RETURNING employee_id,date,login_time";
  const { rows } = await conn.query(sql, params);
  return rows;
};
// const saveLogoutTime = async ({ employee_id }, req, res, next) => {
//     const Date = await currentDate()
//     const logoutTime = await time();
//     const params = [logoutTime, Date, employee_id];
//     const sql = "update employee_management.employee_attendance set logout_time=$1 where date=$2 AND employee_id=$3 RETURNING logout_time,date";
//     const { rows } = await conn.query(sql, params)
//     return (rows)
// }
const getLoginTime = async ({ employee_id, date }, req, res) => {
  const currDate = await currentDate(date);
  // console.log(currDate)
  const params = [employee_id, currDate];
  console.log(currDate);
  const sql = "SELECT login_time from employee_management.employee_attendance where employee_id=$1 AND date=$2";
  const { rows } = await conn.query(sql, params);
  console.log("-------------------------------------------", rows);
  return {
    login_time: rows[0].login_time,

  };
};
const msToTime = async (duration) => {
  // eslint-disable-next-line radix
  const milliseconds = parseInt((duration % 1000) / 100);
  let seconds = Math.floor((duration / 1000) % 60);
  let minutes = Math.floor((duration / (1000 * 60)) % 60);
  let hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;

  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};
const logoutemployeeNew = async ({ employee_id }) => {
  const currDate = await currentDate();

  const loginTimeCal = await getLoginTime({ employee_id, currDate });

  const timeDiff = await msToTime(new Date().toISOString() - new Date(loginTimeCal.login_time).toISOString());
  return loginTimeCal;
};

const logoutemployee = async ({ employee_id }) => {
  const currDate = await currentDate();
  const workingTimeInHours = await logoutemployeeNew({ employee_id });
  // console.log(workingTimeInHours)
  const params = [workingTimeInHours, employee_id, currDate];
  const sql = "update employee_management.employee_attendance set time_duration=$1 where employee_id=$2 AND date=$3 RETURNING employee_id,date,login_time,logout_time,time_duration,total_time";
  const { rows } = await conn.query(sql, params);
  return rows;
};
module.exports = { loginemployee, logoutemployee };

// let t = new Date(`${d},${ti}`)
// console.log(t.valueOf())
// let c = new Date()
// console.log(c.valueOf())
// let diff = c.valueOf() - t.valueOf()
// let days = Math.floor(diff/1000/60/60/24)
// diff -= days*1000*60*60*24
// let hour = Math.floor(diff/1000/60/60)
// diff -= hour*1000*60*60
// let min = Math.floor(diff/1000/60)
// diff -= min*1000*60
// let sec = Math.floor(diff/1000)
// console.log(`${hour}:${min}:${sec}`)
