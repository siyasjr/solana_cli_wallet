const fs = require('fs');
const web3 = require('@solana/web3.js');
const file = 'wallet.json';

function generateWallet() {
  const keypair = web3.Keypair.generate();
  fs.writeFileSync(file, JSON.stringify(Array.from(keypair.secretKey)));
  console.log('✅ Wallet created!');
  console.log('Public Key:', keypair.publicKey.toBase58());
}

function loadWallet() {
  if (!fs.existsSync(file)) {
    console.log('Wallet not found. Run: npm start generate');
    process.exit(1);
  }
  const secret = JSON.parse(fs.readFileSync(file));
  return web3.Keypair.fromSecretKey(Uint8Array.from(secret));
}

module.exports = { generateWallet, loadWallet };
