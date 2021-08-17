const express = require('express');

const router = express.Router();

const controller = require('../controller/computer.controller');

router.post('/addComputer', controller.addComputer);

router.get('/getComputer/:allocated_computer_id', controller.getComputer);

router.get('/getAllComputerData', controller.getAllComputerData);

router.put('/updateComputer/:allocated_computer_id', controller.updateComputer);

router.delete('/deleteComputer/:allocated_computer_id', controller.deleteComputer);

module.exports = router;
