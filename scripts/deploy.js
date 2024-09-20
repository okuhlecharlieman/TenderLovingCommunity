async function main() {
    const [deployer] = await ethers.getSigners();
    const approvers = ["0xYourAddress1", "0xYourAddress2", "0xYourAddress3"];
    
    const MultiSig = await ethers.getContractFactory("MultiSig");
    const multiSig = await MultiSig.deploy(approvers);
  
    await multiSig.deployed();
    console.log("MultiSig deployed to:", multiSig.address);
  }
  
  main().catch((error) => {
    console.error(error);
    process.exit(1);
  });
  