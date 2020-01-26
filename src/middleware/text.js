const fs = require('fs');
const { Router } = require('express');

const router = Router();

function readText(req, res, next) {
  const data = fs.readFileSync('../../a.txt', { encoding: 'utf-8' });
  res.status(200).send(data);
}

router.get('/', readText);

module.exports = {
  textRouter: router,
}