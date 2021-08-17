/* eslint-disable camelcase */
const service = require('../service/computer.service');
const validation = require('../computerValidation');

const addComputer = async (req, res, next) => {
  try {
    const { computer_serial_number, employee_id } = req.body;
    await validation.comSchema.validateAsync({ computer_serial_number });
    const data = await service.addComputer({ computer_serial_number, employee_id });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};
const getComputer = async (req, res, next) => {
  try {
    const { allocated_computer_id } = req.params;
    const data = await service.getComputer({ allocated_computer_id });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};
const getAllComputerData = async (req, res, next) => {
  try {
    const { limit, offset } = req.query;
    const data = await service.getAllComputerData({ limit, offset });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};
const updateComputer = async (req, res, next) => {
  try {
    const { computer_serial_number } = req.body;
    const { allocated_computer_id } = req.params;
    const data = await service.updateComputer({ computer_serial_number, allocated_computer_id });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};
const deleteComputer = async (req, res, next) => {
  try {
    const { allocated_computer_id } = req.params;
    const data = await service.deleteComputer({ allocated_computer_id });
    res.send(data);
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  addComputer,
  getComputer,
  getAllComputerData,
  updateComputer,
  deleteComputer,
};
