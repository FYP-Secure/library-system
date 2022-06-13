const express = require('express');
const { PORT } = require('config')


const app = express();
app.use(express.json());

app.listen(PORT, () => {
    console.log("User service Listening to Port 8001")
})

module.exports = app;