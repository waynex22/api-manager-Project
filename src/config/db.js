const mongoose = require('mongoose')


const mogoDb_Url = process.env.MONGODB_URL
mongoose.connect(mogoDb_Url,  { useNewUrlParser: true, useUnifiedTopology: true })

mongoose.connection.on('connected', res => {
    console.log('connected');
})
mongoose.connection.on('error', error => {
    console.log(error);
})