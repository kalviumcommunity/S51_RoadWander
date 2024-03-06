require('dotenv').config();
const express = require('express');
const { connectToDB, disconnectFromDB, mongooseConnection } = require('./config/dbConn');
const router = require('./routes/routes')
const cookie = require("cookie-parser")
const jwt = require("jsonwebtoken")
const bodyparser= require('body-parser')
const app = express();
const port = 3000;

connectToDB();

app.use(bodyparser.json())
app.use(express.json())
app.use('/',router)
app.use(cookie())

// Function to check MongoDB connection status
const isConnected = () => mongooseConnection.readyState === 1;

// Route handler for the root endpoint '/'
app.get('/', async (req, res) => {
    const databaseStatus = isConnected() ? 'connected' : 'disconnected';
    res.json({ message: 'o_0', database: databaseStatus });
});

// Other routes
app.get('/ping', (req, res) => {
    res.send('Hello World');
});

app.get('/test', (req, res) => {
    res.send('Hello World testing');
});


app.get("/login", (req, res) => {
    const {userName} = req.body
    res.cookie('user', userName)
    res.send("login successful")
})

app.get("/logout", (req, res) => {
    const {userName} = req.body
    res.clearCookie('user', userName) 
    res.send("logout successful")
})

app.post('/auth', (req, res) => {
    const { username, password } = req.body;
    const token = jwt.sign({ username: username }, process.env.SECRET_KEY);
    res.cookie('token', token);
    res.send({ token });
});


// 404 Not Found handler
app.use((req, res) => {
    res.status(404).send("404 - Not Found");
});

// Start the server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// Disconnect from MongoDB when the process is terminated
process.on('SIGINT', async () => {
    await disconnectFromDB();
    process.exit(0);
});