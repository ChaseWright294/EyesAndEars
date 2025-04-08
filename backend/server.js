const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const verifyToken = require('./authMiddle.js');
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

//import { getUserId } from './auth.js';
//import verifyToken from './authMiddle.js';

//const userId = getUserId();



// Signup endpoint
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await pool.query(
            'INSERT INTO tbl_users (u_name, u_email, u_hashpass) VALUES ($1, $2, $3)',
            [name, email, hashedPassword]
        );

        res.status(201).send({ message: 'Signup successful.' });
    } catch (error) {
        console.error("Signup error: ", error)
        res.status(500).send({ error: 'Error during signup' });
    }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM tbl_users WHERE u_email = $1',
            [email]
        );
        console.log(result);

        if (result.rowCount === 0) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];
        console.log(user);
        const isMatch = await bcrypt.compare(password, user.u_hashpass);

        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.u_id_pk }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send({ error: 'Error during login' });
    }
});

/*app.post('api/sheetmusic', token,  async (req, res) => {

})*/

app.get('/', (req, res) => {
    res.send('Backend is running in VS Code! Hi there!');
});

app.get('/api/tbl_users', async (req, res) => {
    try {
        // Query to get all users from the database
        const result = await pool.query('SELECT * FROM tbl_users');
        
        // Send the retrieved users data as a response
        res.json(result.rows);  // result.rows contains the data from the query
    } catch (err) {
        console.error('Error retrieving data from database:', err);
        res.status(500).send({ error: 'Error retrieving data' });
    }
});

app.get('/api/instruments', async(req, res) => {
    try {
        const result = await pool.query("SELECT * FROM tbl_instruments ORDER BY i_name ASC");
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching instruments" });
    }
});

app.post('/api/user-instruments', verifyToken, async (req, res) => {
    const { instrument_id } = req.body;
    const user_id = req.user.id;

    try {
        await pool.query(
            "INSERT INTO tbl_user_instruments (u_id_fk, i_id_fk) VALUES ($1, $2) ON CONFLICT DO NOTHING", [user_id, instrument_id]
        );
        res.json({ message: "Instrument added successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error adding instrument"});
    }
});

app.get('/api/user-instruments', verifyToken, async(req, res) => {
    const user_id = req.user.id;
    try {
        const result = await pool.query("SELECT i_name, i_id_pk FROM tbl_users INNER JOIN tbl_user_instruments ON u_id_pk = u_id_fk INNER JOIN tbl_instruments ON i_id_fk = i_id_pk WHERE u_id_pk = $1", [user_id]);
        res.json(result.rows);
        console.log("Fetched user instruments: ", result.rows);  
    } catch (error) {
        console.error("Error fetching user instruments: ", error);
    }
})

//error part
app.delete('/api/user-instruments', verifyToken, async(req, res) => {
    const user_id = req.user.id;
    //const instrument_id = req.query.instrument_id;
    const instrument_id = parseInt(req.query.instrument_id, 10); // Make sure it's an integer

  if (isNaN(instrument_id)) {
    return res.status(400).json({ error: "Invalid instrument_id" });
  }
    try {
        await pool.query("DELETE FROM tbl_user_instruments WHERE u_id_fk = $1 AND i_id_fk = $2", [user_id, instrument_id]); 
    } catch (error) {
        console.error("Error deleting user instrument: ", error);
    }
})



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));