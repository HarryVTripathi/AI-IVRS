const fs = require('fs');
const { Router } = require('express');

const streamRouter = Router();

function streamMp3(req, res, next) {
  fs.createReadStream('../../file.mp3').pipe(res);
}

streamRouter.get('/', streamMp3);

module.exports = {
  streamRouter,
}