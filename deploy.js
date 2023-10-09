const {ethers } = require("hardhat");
async function main() {
  const [depolyer] = await ethers.getSigners();
  console.log("Depolying Account :",depolyer.address);
  const YourNFTContract = await ethers.getContractFactory("YourNFTContract");

  // Deploy the contract
  const contract = await YourNFTContract.deploy("YourNFTContract","https://ipfs.io/ipfs/");

  console.log("YourNFTContract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

  