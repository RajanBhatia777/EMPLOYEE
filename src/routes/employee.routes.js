const express = require('express');

const router = express.Router();

const controller = require('../service/employee.service');

router.post('/addEmployee',controller.addEmployee);

router.get('/getEmployee/:employee_id',controller.getEmployee);

router.put('/putEmployee/:employee_id',controller.putEmployee);

router.delete('/deleteEmployee/:employee_id',controller.deleteEmployee)

module.exports = router;

