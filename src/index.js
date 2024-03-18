const express = require('express')
require('dotenv').config()
require('./config/db')
const app = express()
// const cors = require('cors');
const port = process.env.PORT || 3000
const route = require('./routes/api.routes.js')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type , Authorization');
  next();
});

// app.use(cors(corsOptions));
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
