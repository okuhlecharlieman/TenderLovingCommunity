import { Contract, Web3Provider } from 'ethers';
import { ethers } from 'ethers'; // MetaMask will inject its own provider when connected

// MultiSig Contract ABI
const multiSigABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "approver",
          "type": "address"
        }
      ],
      "name": "ActionApproved",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "approvalsCount",
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
      "name": "approveAction",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "approved",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "approvers",
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
      "name": "executeAction",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "isApprover",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "requiredApprovals",
      "outputs": [
        {
          "internalType": "uint8",
          "name": "",
          "type": "uint8"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]

// Connect to MetaMask
async function connectWallet() {
  if (typeof window.ethereum !== 'undefined') {
    // Request account access if needed
    await window.ethereum.request({ method: 'eth_requestAccounts' });

    // Create a provider from MetaMask
    const provider = new ethers.BrowserProvider(window.ethereum);

    // Get the MetaMask signer (the first account selected in MetaMask)
    const signer = await provider.getSigner();
console.log("signer ", signer);
    return { provider, signer };
  } else {
    throw new Error('MetaMask is not installed');
  }
}

async function approveTransaction(contractAddress) {
  const { provider, signer } = await connectWallet();
  
  // Create the contract instance with the signer
  const contract = new Contract(contractAddress, multiSigABI, signer);
  
  // Approve the action (sign transaction)
  // await provider.sendTransaction(signedTx);
  const tx = await contract.approveAction();
  await tx.wait();  

  // Check if all signatures have been collected
  const isExecuted = await contract.executeAction();
 
  return isExecuted;
}

export async function getRequiredApprovals(contractAddress) {
  const { provider, signer } = await connectWallet();
  const contract = new Contract(contractAddress, multiSigABI, signer);
  const requiredApprovals = await contract.requiredApprovals();
  return requiredApprovals.toNumber(); // Convert to a number if necessary
}
export async function getCountApprovals(contractAddress) {
  const { provider, signer } = await connectWallet();
  const contract = new Contract(contractAddress, multiSigABI, signer);
  const currentApprovalsCount = await contract.approvalsCount();
  return currentApprovalsCount.toNumber(); // Convert to a number if necessary
}

export default approveTransaction;
