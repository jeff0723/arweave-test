import Arweave from 'arweave'
import fs from 'fs'
const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
});

let key = fs.readFileSync('my-key.json')
key = JSON.parse(key);
let image = fs.readFileSync('0.png')
let address = await arweave.wallets.jwkToAddress(key).then((_address) => {
    return _address;
    //1seRanklLU_1VTGkEk7P0xAwMJfA7owA1JHW5KyZKlY
});
arweave.wallets.getBalance(address).then(balance => {
    let winston = balance;
    let ar = arweave.ar.winstonToAr(balance);

    console.log(winston);
    //125213858712

    console.log(ar);
})

const transaction = await arweave.createTransaction(
    {
        data: image,
    },
    key
);
await arweave.transactions.sign(transaction, key);
await arweave.transactions.post(transaction);

console.log("transaction ID", transaction.id);
fs.writeFileSync('transaction-id.txt',transaction.id)