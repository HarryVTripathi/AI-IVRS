const fs = require('fs');
const { Router } = require('express');

const router = Router();

function readText(req, res, next) {
  console.info('Reading text from url...');
  console.log(req.method);
  res.set('Content-Type', 'text/plain');
  const data = fs.readFileSync('./a.txt', { encoding: 'utf-8' });
  res.status(200).send(data);
}

router.get('/', readText);

router.head('/hd', readText);

module.exports = {
  textRouter: router,
}