const express = require('express');
const router = express.Router();

const controller = require('../service/computer.service');

router.post('/addComputer',controller.addComputer);

router.get('/getComputer/:allocated_computer_id',controller.getComputer);

router.put('/updateComputer/:allocated_computer_id',controller.updateComputer);

router.delete('/deleteComputer/:allocated_computer_id',controller.deleteComputer)


module.exports=router;