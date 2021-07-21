const { Pool } = require('pg')
const pool = new Pool({
  user: 'flolite',
  host: 'mumbai-flolite-db.c0uta0ghdiza.ap-south-1.rds.amazonaws.com',
  database: 'flolite',
  password: 'flolite123',
  port: '5432',
})
pool.query('SELECT NOW()', (err, res) => {
  console.log( "Database Connected")  
})


module.exports=pool;