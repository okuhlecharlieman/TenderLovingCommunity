import { JsonRpcProvider, Contract } from 'ethers';

// MultiSig Contract ABI
const multiSigABI = [
  // ABI for the contract (simplified)
  "function approveAction() public",
  "function executeAction() public view returns (bool)"
];

async function connectWallet() {
  // Create a local provider (or point to your specific RPC URL)
  const provider = new JsonRpcProvider("http://127.0.0.1:8545");

  // Get the signer from the provider (usually the first account for local providers)
  const signer = provider.getSigner(0); // Index 0 refers to the first account

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
