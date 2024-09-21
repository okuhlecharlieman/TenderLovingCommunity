import { JsonRpcProvider, Contract } from 'ethers';
import { useState } from 'react';

// MultiSig Contract ABI
const multiSigABI = [
  // ABI for the contract (simplified)
  "function approveAction() public",
  "function executeAction() public view returns (bool)"
];

async function connectWallet() {
  // Correct the import for JsonRpcProvider
  const provider = new JsonRpcProvider("http://127.0.0.1:8545");
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  return { provider, signer };
}

async function approveTransaction(contractAddress) {
  const { provider, signer } = await connectWallet();
  const contract = new Contract(contractAddress, multiSigABI, signer);
  
  // Approve the action
  const tx = await contract.approveAction();
  await tx.wait();

  // Check if all signatures have been collected
  const isExecuted = await contract.executeAction();
  return isExecuted;
}

export default approveTransaction;
