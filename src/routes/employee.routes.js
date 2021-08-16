const express = require('express');

const router = express.Router();

const controller = require('../controller/employee.controller');

router.post('/addEmployee', controller.addEmployee);

router.get('/getEmployee/:employee_id', controller.getEmployee);

router.get('/getAllEmployees', controller.getAllEmployee);

router.put('/putEmployee/:employee_id', controller.putEmployee);

router.delete('/deleteEmployee/:employee_id', controller.deleteEmployee);

module.exports = router;
