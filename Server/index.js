const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./user'); 
const bcrypt = require('bcryptjs');

const port = 3500;
const app = express();


app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


app.listen(port, () => {
    console.log(`App running on port ${port}`);
});


app.get('/start', (req, res) => {
    console.log("Server started...");
    res.send("Hello");
});



app.post('/register', async (req, res) => {
    const { firstName, lastName, email, password, phone } = req.body;
  
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const query = `INSERT INTO usertable (firstName, lastName, email, password, phone) VALUES ($1, $2, $3, $4, $5)`;
      await pool.query(query, [firstName, lastName, email, hashedPassword, phone]);
  
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
      console.error("Error registering user:", err);
      res.status(500).json({ message: 'Error registering user' });
    }
  });

  app.post('/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const query = 'SELECT * FROM usertable WHERE email = $1';
      const user = await pool.query(query, [email]);
  
      if (user.rows.length === 0) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const validPassword = await bcrypt.compare(password, user.rows[0].password);
  
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ message: 'Error logging in' });
    }
  });
  



app.delete('/delete',async(req,res)=>{
    await pool.query("delete from usertable")
    res.send("all data deleted......")
})

