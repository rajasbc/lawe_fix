// const crypto = require('crypto');
import crypto from 'crypto';
const algorithm = 'aes-256-cbc'; //Using AES encryption
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

//Encrypting text
export async function encrypt(text) {
   let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
   let encrypted = cipher.update(text);
   encrypted = Buffer.concat([encrypted, cipher.final()]);
   console.log("iv"+ iv.toString('hex')+ "encryptedData"+ encrypted.toString('hex'))
   return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}