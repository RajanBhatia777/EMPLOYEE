const express = require('express');
const router = express.Router();


const controller = require('../controller/attendence.controller');

router.post('/loginemployee',controller.loginemployee);

router.put('/logoutemployee/:employee_id',controller.logoutemployee);
//router.post('/logoutemployee',controller.logoutemployee);

module.exports=router;