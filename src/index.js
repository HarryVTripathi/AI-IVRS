'use strict'
const express = require('express');
const bodyparser = require('body-parser');
const { ttsRouter } = require('./middleware/tts');

const app = express();


app.use(bodyparser.json());

app.get('/', (req, res) => {
  res.status(200).json({ msg: "Welcome to pucho"});
})
app.use('/tts', ttsRouter)

app.listen(3000, () => {
  console.log("server running on port 3000");
})