const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql2')
const connection = mysql.createConnection(config)
// const createTable = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key(id));`
// connection.query(createTable)

app.get('/', (req,res) => {
    const dataTime = new Date();;
    const date = ("0" + dataTime.getDate()).slice(-2);
    const month = ("0" + (dataTime.getMonth() + 1)).slice(-2);
    const year = dataTime.getFullYear();
    const hours = dataTime.getHours();
    const minutes = dataTime.getMinutes();
    const seconds = dataTime.getSeconds();    
    const dateTime = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds

    const sql = `INSERT INTO people(name) values('Claudio ${dateTime}')`
    connection.query(sql)
    let html = '<h1>Full Cycle Rocks!</h1>'
    html += '<ul>'
    connection.query("SELECT name FROM people", function (err, result, fields) {
        if (err) throw err;
        result.forEach(item => { 
            console.log(item); 
            html += `<li>${item.name}</li>`
          });
          html += '</ul>'   
          res.send(html)
      }); 
      

})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})