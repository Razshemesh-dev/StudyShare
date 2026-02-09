const mysql=require('mysql2');
const pool=mysql.createPool({
   host:'localhost',
    user:'root',
    database:'studyshare',
    password:'Rs979353!'
});
module.exports=pool.promise();
// data