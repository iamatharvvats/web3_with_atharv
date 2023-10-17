const axios = require('axios');
const ipfsClient = require('ipfs-http-client');

const pinataApiKey = '';
const pinataApiSecret = '';

const pinata = pinataApiKey && pinataApiSecret
    ? require('@pinata/sdk')(pinataApiKey, pinataApiSecret)
    : null;

async function uploadToIPFS(imagePath) {
    try {
        const imageBuffer = require('fs').readFileSync(imagePath);
        const response = await pinata.pinFileToIPFS(imageBuffer);
        return response.IpfsHash;
    } catch (error) {
        console.error('Error uploading to IPFS:', error);
    }
}

const imagePath = 'C:\Users\ATHARV VATS\pinata\Screenshot 2023-10-11 182213.png';
uploadToIPFS(imagePath).then(ipfsHash => {
    console.log(`Image uploaded to IPFS with IPFS hash: ${ipfsHash}`);
});
