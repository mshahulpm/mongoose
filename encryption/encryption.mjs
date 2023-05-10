import crypto from 'crypto'
import { fieldEncryption, encrypt, decrypt } from 'mongoose-field-encryption'


export const SECRET = "some secret key"

export function defaultSaltGenerator(secret) {


    // return crypto.randomBytes(16) // if searching is not required
    return "1234567890123456"     // if searching required 
    // should ideally use the secret to return a string of length 16, 
    // default = `const defaultSaltGenerator = secret => crypto.randomBytes(16);`, 
    // see options for more details
}



export const _hash = (secret) => crypto.createHash("sha256").update(secret).digest("hex").substring(0, 32);

// const encrypted = encrypt("New Message", _hash(SECRET), defaultSaltGenerator)
// console.log(encrypted);
// const decrypted = decrypt(encrypted, _hash(SECRET))
// console.log(decrypted)

