'use strict'
const express = require('express');
const bodyparser = require('body-parser');
const { ttsRouter } = require('./middleware/tts');
const { streamRouter } = require('./middleware/streamMp3');

const app = express();


app.use(bodyparser.json());

app.get('/', (req, res) => {
  res.status(200).json({ msg: "Welcome to pucho"});
});

app.use('/tts', ttsRouter);

app.use('/stream', streamRouter);

app.listen(3006, () => {
  console.log("server running on port 3006");
})