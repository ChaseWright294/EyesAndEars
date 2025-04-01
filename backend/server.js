const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Signup endpoint
app.post('/api/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        await pool.query(
            'INSERT INTO tbl_users (fld_u_name, fld_u_email, fld_u_hashpass) VALUES ($1, $2, $3)',
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
            'SELECT * FROM tbl_users WHERE fld_u_email = $1',
            [email]
        );
        console.log(result);

        if (result.rowCount === 0) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const user = result.rows[0];
        console.log(user);
        const isMatch = await bcrypt.compare(password, user.fld_u_hashpass);

        if (!isMatch) {
            return res.status(401).send({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.fld_u_id_pk }, process.env.JWT_SECRET, { expiresIn: '1h' });
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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));