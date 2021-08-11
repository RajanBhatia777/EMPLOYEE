const express = require('express');

const app = express();
const route = express.Router();
const cors = require('cors');
const config = require('./config');

const employeeRoutes = require('./routes/employee.routes');

const computerRoutes = require('./routes/computers.routes');

const attendanceRoutes = require('./routes/attendance.routes');

app.use(express.json());

app.use('/employee', employeeRoutes);

app.use('/computer', computerRoutes);

app.use('/attendance', attendanceRoutes);

app.use(cors());

app.use(route);

app.listen(3000, () => {
  console.log('App is listening to the port 3000');
});
