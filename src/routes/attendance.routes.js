const express = require('express');
const router = express.Router();

const controller = require('../service/attendance.service');

router.post('/loginemployee',controller.loginemployee);

router.put('/logoutemployee/:employee_id',controller.logoutemployee);

router.get('/getLoginTime/:employee_id',controller.getLoginTime);




module.exports=router;