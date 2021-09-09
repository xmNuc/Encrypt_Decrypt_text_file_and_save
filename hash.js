const { createHmac } = require('crypto');
const { SALT } = require('./constans');
const { readFile } = require('fs').promises;

const file = process.argv[2];

const hash = createHmac('sha512', SALT).update(readFile(file)).digest('hex');
console.log(hash);
