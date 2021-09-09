const { createHmac } = require('crypto');
const { HASH_SALT } = require('./constant');
const { readFile } = require('fs').promises;

const file = process.argv[2];

const hash = createHmac('sha512', HASH_SALT)
  .update(readFile(file))
  .digest('hex');
console.log(hash);
