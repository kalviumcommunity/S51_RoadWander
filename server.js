const express = require('express')
const app = express()
const port = 3000

app.get('/ping', (req, res) => {
    res.send('Hello World');
  });

app.get('/test', (req, res) => {
    res.send('Hello World testing');
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})