// this loads the web3 dependency
const Web3 = require("web3")

// this loads our ethereum tx dependency
const Tx = require('ethereumjs-tx').Transaction

// this sets up my .env file
require('dotenv').config()

// let's load our environment variables
infuraToken = process.env.INFURA_TOKEN
contractAddress = process.env.CONTRACT_ADDRESS
ownerAddress = process.env.OWNER_ADDRESS

// set up a RPC (remote procedure call) to connect to an ethereum node
const rpcURL = "https://ropsten.infura.io/v3/" + infuraToken;

// instantiate web3 with this URL
const web3 = new Web3(rpcURL);

console.log("connected to web3");

// get the ABI (interface) for our contract (from remix)
const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "_totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "tokenOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "recipient",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

// instantiate a contract object
const contract = new web3.eth.Contract(abi, contractAddress);
console.log("connected to contract on ropsten");

// run some of the methods in our contract (using javascript)
const getTotalSupply = async() => {
    let totSupply = await contract.methods.totalSupply().call();
    return totSupply;
}

const getName = async() => {
    let name = await contract.methods.name().call();
    return name
}

const getBalanceOfAccount = async(account) => {
    let bal = await contract.methods.balanceOf(ownerAddress).call();
    return bal;
}

const getDecimals = async() => {
    let decimals = await contract.methods.decimals().call();
    return decimals;
}

const getSymbol = async() => {
    let symbol = await contract.methods.symbol().call();
    return symbol;
}

// set up a transfer token method
// this will send AMOUNT to TOACCOUNT from OWNERADDRESS
const transferToken = async(toAccount, amount) => {

    // generate a nonce
    let txCount = await web3.eth.getTransactionCount(ownerAddress);
    console.log("tx count is " + txCount);

    // generate tx data
    const txObject = {
        nonce: web3.utils.toHex(txCount),
        gasLimit: web3.utils.toHex(500000),
        gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
        to: contractAddress,
        data: contract.methods.transfer(toAccount, amount).encodeABI()
    }

    // assign a chain id (ropsten: 3)
    const tx = new Tx(txObject, {chain: 'ropsten', hardfork: 'petersburg'})

    // sign the tx - THIS USES THE SECRET PRIVATE KEY
    tx.sign(privateKey);

    console.log("signed transaction with super secret private key");

    // generate the raw tx
    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    // broadcast the raw transaction
	console.log('about to broadcast transaction' + raw)
    let txResponse = await web3.eth.sendSignedTransaction(raw);

    console.log("transaction hash: " + txResponse.transactionHash)
    console.log("transaction in block: " + txResponse.blockNumber)
}


module.exports = { getSymbol, getDecimals, getBalanceOfAccount, getName, transferToken }



