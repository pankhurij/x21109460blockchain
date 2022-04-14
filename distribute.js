// create a method that will be called by the web server

// in this method:
// - read the accounts.txt file 
// put the N accounts into an array 
// get the totalsupply remaining for the token owner
// calculate 5% of that totalSupply
// loop N times, and execute N transactions transferring the token from owner to address in array
// collect tea and medals

let fs = require("fs");

let BigNumber = require("big-number")

//let method = require('./method.js');
let contract = require('./contract.js');

// this sets up my .env file
require('dotenv').config()

// let's load our environment variables
infuraToken = process.env.INFURA_TOKEN
contractAddress = process.env.CONTRACT_ADDRESS
ownerAddress = process.env.OWNER_ADDRESS
privateKey = Buffer.from(process.env.SUPER_SECRET_PRIVATE_KEY, 'hex')

const distribute = async() => {
    // read in the file
    let distributionAddresses = fs.readFileSync('./accounts.txt', 'utf8').split('\n');

    // list the addresses
    console.log(`distro addresses are: ${ distributionAddresses}`);

    // get the symbol of the token
    let tokenSymbol = await contract.getSymbol();
    console.log(`symbol is ${tokenSymbol}`);

    // get the balance of the token owner
    let ownerBalance = await contract.getBalanceOfAccount(ownerAddress);
    let ob = new BigNumber(ownerBalance);
    console.log(`owner balance is ${ob}`);

    // get five percent of this balance
    let fivePerCent = ob.div(20);
    console.log(`five per cent of owner balance is ${fivePerCent}`);

    // work out how many addresses in file (numberOfAddresses)
    let numberOfAddresses = distributionAddresses.length;
    console.log(`number of addresses in file is ${numberOfAddresses}`);

    // divide the 5% by N to get distroAmount
    let distributionAmount = fivePerCent.div(numberOfAddresses)
    console.log(`distribution amount per address is ${distributionAmount}`);

    // loop through N accounts/addresses
    // for each account, do a transfer of distroAmount
    for (looper = 0; looper < numberOfAddresses; looper++) {
        console.log(`about to distribute ${tokenSymbol}, ${distributionAmount} tokens go to ${distributionAddresses[looper]}`)
        // execute a ERC20transfer(ownerAddress, distributionAddresss[looper], distributionAmount);
        let retval = await contract.transferToken(distributionAddresses[looper], distributionAmount)
    }

}

distribute()
//module.exports = { distribute }