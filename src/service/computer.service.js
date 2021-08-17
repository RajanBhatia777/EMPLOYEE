/* eslint-disable camelcase */
const conn = require('../config');

const addComputer = async ({ computer_serial_number, employee_id }) => {
  const params = [computer_serial_number, employee_id];

  const sql = 'INSERT INTO employee_management.allocated_computers(computer_serial_number,employee_id) VALUES($1,$2) RETURNING allocated_computer_id,computer_serial_number,employee_id,is_deleted';
  const { rows } = await conn.query(sql, params);
  return rows;
};

const getComputer = async ({ allocated_computer_id }) => {
  const params = [allocated_computer_id];
  const sql = 'Select * from employee_management.allocated_computers where allocated_computer_id=$1 ';
  const { rows } = await conn.query(sql, params);
  return rows;
};
const getAllComputerData = async ({ limit, offset }) => {
  const pagingString = limit && offset ? `LIMIT ${limit} OFFSET ${offset}` : '';

  const sql = `select * from employee_management.allocated_computers where is_deleted=0 order by allocated_computer_id desc ${pagingString}`;
  const { rows } = await conn.query(sql);
  return rows;
};

const updateComputer = async ({ computer_serial_number, allocated_computer_id }) => {
  const params = [computer_serial_number, allocated_computer_id];
  const sql = 'update employee_management.allocated_computers set computer_serial_number=$1 where allocated_computer_id=$2 RETURNING allocated_computer_id,computer_serial_number,employee_id,is_deleted';
  const { rows } = await conn.query(sql, params);
  return rows;
};
const deleteComputer = async ({ allocated_computer_id }) => {
  const params = [allocated_computer_id];
  const sql = 'update employee_management.allocated_computers set is_deleted=1 where allocated_computer_id=$1 RETURNING allocated_computer_id,computer_serial_number,employee_id,is_deleted';
  const { rows } = await conn.query(sql, params);
  return rows;
};

module.exports = {
  addComputer, getComputer, updateComputer, deleteComputer, getAllComputerData,
};
