import { JsonRpcProvider, Contract } from 'ethers';

// MultiSig Contract ABI
const multiSigABI = [
  // ABI for the contract (simplified)
  "function approveAction() public",
  "function executeAction() public view returns (bool)"
];

async function connectWallet() {
  // Connect to a local JSON-RPC provider (no ENS support here)
  const provider = new JsonRpcProvider("http://127.0.0.1:8545");

  // Get the first account signer from the local node
  const signer = provider.getSigner(0);

  return { provider, signer };
}

async function approveTransaction(contractAddress) {
  // Ensure the contract address is a valid Ethereum address (no ENS names)
  const { provider, signer } = await connectWallet();

  // Create the contract instance with the signer
  const contract = new Contract(contractAddress, multiSigABI, signer);
  
  // Approve the action
  const tx = await contract.approveAction();
  await tx.wait();

  // Check if all signatures have been collected
  const isExecuted = await contract.executeAction();
  return isExecuted;
}

export default approveTransaction;
