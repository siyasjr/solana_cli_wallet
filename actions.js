const web3 = require('@solana/web3.js');
const { loadWallet } = require('./wallet');
const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

async function getBalance() {
  const wallet = loadWallet();
  const balance = await connection.getBalance(wallet.publicKey);
  console.log('Balance:', balance / web3.LAMPORTS_PER_SOL, 'SOL');
}

async function airdropSol(amount) {
  const wallet = loadWallet();
  console.log(`Requesting ${amount} SOL...`);
  const sig = await connection.requestAirdrop(wallet.publicKey, amount * web3.LAMPORTS_PER_SOL);
  await connection.confirmTransaction(sig);
  console.log(`Airdropped!!! ${amount} SOL`);
}

async function sendSol(to, amount) {
  const wallet = loadWallet();
  const toPubkey = new web3.PublicKey(to);
  const tx = new web3.Transaction().add(
    web3.SystemProgram.transfer({
      fromPubkey: wallet.publicKey,
      toPubkey: toPubkey,
      lamports: amount * web3.LAMPORTS_PER_SOL
    })
  );
  const sig = await web3.sendAndConfirmTransaction(connection, tx, [wallet]);
  console.log(`Sent ${amount} SOL to ${to}`);
  console.log(`Tx Signature: ${sig}`);
}

module.exports = { getBalance, airdropSol, sendSol };
