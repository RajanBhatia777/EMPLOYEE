const service = require('../service/attendance.service')

const loginemployee = async (req, res, next) => {
try{
const { employee_id } = req.body
const data=await service.loginemployee({employee_id})
res.send(data)
}catch(err){
    res.send(err)
}
}
const logoutemployee = async (req, res, next) => {
    try{
    const { employee_id } = req.params
    const data=await service.logoutemployee({employee_id})
    res.send(data)
}catch(err){
    res.send(err)
}
}


module.exports={loginemployee,logoutemployee}