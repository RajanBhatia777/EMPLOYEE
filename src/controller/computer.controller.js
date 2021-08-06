const service= require('../service/computer.service')
const validation = require('../computerValidation')

const addComputer = async (req, res, next) => {
    try{
    const { computer_serial_number, employee_id } = req.body;
    //const value = await comSchema.validateAsync({ computer_serial_number })
    const data = await service.addComputer({computer_serial_number, employee_id})
    res.send(data)
}catch(err){
    res.send(err)
}
}
module.exports={addComputer}