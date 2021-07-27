const express = require('express');
const router = express.Router();

const controller = require('../service/attendance.service');

router.post('/loginemployee',controller.loginemployee);

router.put('/logoutemployee/:employee_id',controller.logoutemployee);




module.exports=router;