// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {


  const NFT = await ethers.getContractFactory("IOTABOTS");

  let nft = await NFT.attach("0x639D119919047EA5b52dAfFD17B30B5A5fc177B4")
  
  let res = await nft.mint("0x525BC0B4970c9dE710d8ceeE512007b976d16D6A", 1);

  console.log("res")
  console.log(res)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
