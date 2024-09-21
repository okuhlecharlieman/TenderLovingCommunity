async function main() {
    const MultiSig = await ethers.getContractFactory("MultiSig");
    const multiSig = await MultiSig.deploy([
        "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC",//2
        "0x90F79bf6EB2c4f870365E785982E1f101E93b906",//3
        "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65"//4
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
