require('dotenv').config();
const express = require('express');
const { connectToDB, disconnectFromDB, mongooseConnection } = require('./config/dbConn');

const app = express();
const port = 3000;

connectToDB();

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
