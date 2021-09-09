const { encryptText, hash } = require('./cipher');
const { SALT, HASH_SALT } = require('./constant');
const { writeFile, readFile } = require('fs').promises;

const file = process.argv[2];
const userPass = process.argv[3];

(async () => {
  const fileContent = await readFile(file, 'utf8');
  // console.log(fileContent);
  const contentHash = hash(fileContent, HASH_SALT);
  // console.log('Hash =  ' + contentHash);
  const encrypted = await encryptText(fileContent, userPass, SALT);
  encrypted.hash = contentHash;
  // console.log(encrypted);
  await writeFile(file, JSON.stringify(encrypted), 'utf8');
  console.log('File is Saved');
})();
