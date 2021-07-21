const express= require("express");
const app = express();
const route = express.Router();
const config= require("./config");
const employeeRoutes = require("../src/routes/employee.routes");

app.use(express.json());
app.use("/employee",employeeRoutes);
 app.use(route);

app.listen(3000,()=>{
    console.log("App is listening to the port 3000");
})

