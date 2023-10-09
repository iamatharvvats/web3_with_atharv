const { ethers } = require("hardhat");
const config = {
  API_KEY : "7b917cb4e1b1b2e3578f",
  API_SECRET : "734aa9b26512e129b2f9989a55866e7df63402ae8c900a2282754ca4d170f94c",
  PINATA_BASE_URL : "https://api.pinata.cloud",
}
async function main() {
    const [deployer] =await ethers.getSigners()
    const YourNFTContract = await ethers.getContractFactory("YourNFTContract");
    const contract = await YourNFTContract.deploy();
    await contract.deployed();

    console.log("Contract deployed to:", contract.address);
    const owner = deployer.address;

    // Mint NFT and Get Transaction Hash
    const tokenURI = "ipfs://QmUF1stHSzgFknbkjAdGGzeKCqEQS8GdXSpzdYLWxsQBUq"; // Replace with the actual IPFS URI
    const tx = await contract.mintNFT(tokenURI);
    await tx.wait(); // Wait for the transaction to be mined

    const transactionHash = tx.hash;
    console.log("Transaction Hash:", transactionHash);

    // Change NFT Image by Owner
    const tokenId = 0; // Replace with the desired token ID
    const newTokenURI = "ipfs://QmUF1stHSzgFknbkjAdGGzeKCqEQS8GdXSpzdYLWxsQBUq"; // Replace with the new IPFS URI
    const changeTx = await contract.connect(deployer).changeTokenURI(tokenId, newTokenURI);
    await changeTx.wait(); // Wait for the transaction to be mined

    const changeTransactionHash = changeTx.hash;
    console.log("Change Transaction Hash:", changeTransactionHash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


