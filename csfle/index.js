require('dotenv').config();
const { MongoClient } = require("mongodb");
const { ClientEncryption } = require('mongodb-client-encryption');


const client = new MongoClient(process.env.mong_ssl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const MasterKey = Buffer.from('01234567890123456789012345678901', 'hex')
const keyVaultNamespace = 'encryption.__keyVault'

const collection = client.db().collection('demo');

const encryption = new ClientEncryption(client, {
    keyVaultNamespace,
    kmsProviders: {
        local: {
            key: MasterKey
        },
    },
});


async function createDataKey() {
    await client.connect();
    const keyVault = client.db().collection('encryption.__keyVault');
    const dataKey = await encryption.createDataKey('local');
    await keyVault.insertOne({
        _id: dataKey['_id'],
        keyAltNames: ['user_encryption_key'],
        masterKey: {
            provider: 'local',
            key: Buffer.from('0123456789012345678901234567890123456789012345678901234567890123', 'hex')
        }
    });
    console.log('Data key created.');
}

createDataKey().catch(console.error).finally(() => client.close());


async function main() {


    const dataKeyId = (await encryption.findOrCreateDataKey('local', {
        keyAltNames: ['user_encryption_key']
    }))['_id']

    encryptedName = await encryption.encrypt("Greg", {
        algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
        keyId: dataKeyId,
    });
    encryptedFoods = await encryption.encrypt(["Cheese", "Grapes"], {
        algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
        keyId: dataKeyId,
    });
    await collection.insertOne({
        name: encryptedName,
        age: 83,
        foods: encryptedFoods,
    });

}


// main()