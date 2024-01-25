const express = require('express')
const mysql = require('mysql2/promise')

const config = require('./config.json')

const app =express();
const port = process.env.PORT || 3000;
 
app.use(express.json());
 
const pool= mysql.createPool({
    host : config.db.host,
    port : config.db.port,
    user : config.db.user,
    password : config.db.user,
    database : 'db',
    waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


app.get('/items', async (req,res) =>{
    try {
        const [rows] = await pool.query('SELECT * FROM employees');
        res.json(rows);
      } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
  
app.post('/addemployee', async (req,res) =>{
try{
    
    const id = req.body.id;
    const name = req.body.name;
    const [result] = await pool.query("insert into employees(id, name) values (?, ?)",[id, name]);
    res.send("data added successfully")
} catch(error){
    console.error("Error adding data");
}
});

app.put('/updateemployee', async (req,res) =>{
    try{
        
        const id = req.body.id;
        const name = req.body.name;
        const [result] = await pool.query("update employees SET name=? WHERE id=?",[name, id]);
        res.send("data updated successfully")
    } catch(error){
        console.error("Error updating data");
    }
    });

app.delete('/removeemployee', async (req,res) =>{
    try{
        
        const id = req.body.id;
        // const name = req.body.name;
        const [result] = await pool.query("delete from employees WHERE id=?",[id]);
        res.send("data removed successfully")
    } catch(error){
        console.error("Error removing data");
    }
    });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})