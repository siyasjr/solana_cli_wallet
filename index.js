const { program } = require('commander');
const { generateWallet, loadWallet } = require('./wallet');
const { getBalance, airdropSol, sendSol } = require('./actions');

program
  .command('generate')
  .description('Generate a new wallet')
  .action(generateWallet);

program
  .command('balance')
  .description('Show wallet balance')
  .action(getBalance);

program
  .command('airdrop <amount>')
  .description('Airdrop SOL (devnet only)')
  .action(airdropSol);

program
  .command('send <to> <amount>')
  .description('Send SOL to another address')
  .action(sendSol);

program.parse(process.argv);
