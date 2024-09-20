import { ethers } from 'ethers';

async function connectWallet() {
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  return { provider, signer, address };
}
