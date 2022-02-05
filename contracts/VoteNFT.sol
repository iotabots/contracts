// // SPDX-License-Identifier: MIT
// pragma solidity >=0.8.4;
// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

// contract VoteNFT is ERC721, ERC721URIStorage {
//     using Counters for Counters.Counter;
//     Counters.Counter private _tokenIds;

//     constructor() public ERC721("deVoted", "VOTE") {}

//     function tokenURI(uint256 tokenId)
//         public
//         view
//         override(ERC721, ERC721URIStorage)
//         returns (string memory)
//     {
//         return super.tokenURI(tokenId);
//     }

//     function awardItem(address recipient, string memory tokenURI)
//         public
//         returns (uint256)
//     {
//         _tokenIds.increment();

//         uint256 newItemId = _tokenIds.current();
//         _mint(recipient, newItemId);
//         _setTokenURI(newItemId, tokenURI);

//         return newItemId;
//     }
// }
