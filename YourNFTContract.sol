// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract YourNFTContract is ERC721Enumerable, Ownable {
    uint256 public constant max = 3000;
    uint256 private _tokenCounter = 0;
    mapping(uint256 => string) private _tokenURIs;

    constructor() ERC721("YourNFTCollection", "YNFT") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://"; // Base URI for your token URIs
    }

    function setTokenURI(uint256 tokenId, string memory tokenURI1) external onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        _tokenURIs[tokenId] = tokenURI1;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        string memory baseURI = _baseURI();
        return bytes(_tokenURIs[tokenId]).length > 0 ? string(abi.encodePacked(baseURI, _tokenURIs[tokenId])) : "";
    }

    function mintNFT(string memory tokenURI1) public onlyOwner {
        require(_tokenCounter < max, "Max limit reached");
        _safeMint(msg.sender, _tokenCounter);
        _tokenURIs[_tokenCounter] = tokenURI1;
        _tokenCounter++;
    }

    function changeTokenURI(uint256 tokenId, string memory newTokenURI) external onlyOwner {
        require(_exists(tokenId), "Token does not exist");
        _tokenURIs[tokenId] = newTokenURI;
    }
}
