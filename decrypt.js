const { decryptText, hash } = require('./cipher');
const { SALT, HASH_SALT } = require('./constans');
const { writeFile, readFile } = require('fs').promises;

const file = process.argv[2];
const userPass = process.argv[3];

(async () => {
  const fileContent = await readFile(file, 'utf8');
  // console.log(fileContent);
  const fileX = JSON.parse(fileContent);
  // console.log(fileX);
  const decrypted = await decryptText(
    fileX.encrypted,
    userPass,
    SALT,
    fileX.iv
  );
  const decryptedHash = hash(decrypted, HASH_SALT);
  if (decryptedHash === fileX.hash) {
    await writeFile(file, decrypted, 'utf8');
    console.log('Checkign hash... OK');
  } else {
    console.log('File is not orginal');
  }

  console.log(decrypted);

  await writeFile(file, JSON.stringify(decrypted), 'utf8');
  console.log('File is Saved');
})();
