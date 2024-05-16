const express = require('express')

const app = express()

const bcrypt = require('bcrypt')

app.use(express.json())

const users = []

const { Client } = require('pg');

// Create a new PostgreSQL client
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    password: 'firedragon123',
    database: 'users',
    port: 5432,
});

// Connect to the PostgreSQL database
client.connect()
    .then(() => console.log('Connected to PostgreSQL database'))
    .catch(err => console.error('Connection error', err.stack));


// app.get('/users', (req, res) => {
//     res.json(users)
// })

app.get('/users', (req, res) => {
    const usersQuery = 'SELECT * FROM users'
    client.query(usersQuery, (error, results) => {
        if (error) {
            console.error('Error executing query:', error);
            res.status(500).send()
        }
        else {
            res.json(results.rows)
        }
    })
})

app.post('/users', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const user = {username: req.body.name, password: hashedPassword}
        console.log(user)
        const insertQuery = 'INSERT INTO users (username, password) VALUES ($1, $2)'
        client.query(insertQuery, [user.username, user.password])
    .then(result => console.log('Data inserted successfully'))
    .catch(err => console.error('Insertion error', err.stack))
    .finally(() => {
        client.end();
    });
        res.status(201).send()
    } catch {
        res.status(500).send()
    }
})

app.post('/users/login', async (req, res) => {

    const username = req.body.username

    const query = {
        text: 'SELECT * FROM users WHERE username = $1',
        values: [username],
    };



    client.query(query, async (error, results) => {
        if (error) {
            console.error('Error executing query', err);
            res.status(500).send('Internal Server Error');
            return;
        }
        if (results.rows.length === 0) {
            res.status(400).send('User Not Found');
            return;
        }

        const user = results.rows[0]; 
        const hashedPassword = user.password;

        try {
            if (await bcrypt.compare(req.body.password, hashedPassword)) {
                res.send('Success')
            }
            else {
                res.send('Not Allowed')
            }
    
        }
        catch {
            res.status(500).send()
    
        }
    })


})

app.listen(3000)