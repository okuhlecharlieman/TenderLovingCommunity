async function main() {
    const MultiSig = await ethers.getContractFactory("MultiSig");
    const multiSig = await MultiSig.deploy([
      "0xYourAddress1",
      "0xYourAddress2",
      "0xYourAddress3"
    ]);
  
    await multiSig.deployed();
    console.log("MultiSig deployed to:", multiSig.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  