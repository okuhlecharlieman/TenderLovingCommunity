

// scripts/deploy.js
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const approvers = [
    "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",//3
    "0x90F79bf6EB2c4f870365E785982E1f101E93b906",//4
    "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"//5
  ];
  const approvalsRequired = 3; // Set the number of required approvals

  // Compile and deploy the contract
  const MultiSig = await ethers.getContractFactory("MultiSig");
  const multiSig = await MultiSig.deploy([]);

  console.log("MultiSig deployed to:", multiSig.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

