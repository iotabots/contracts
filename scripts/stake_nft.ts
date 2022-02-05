// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners()
  console.log("owner")
  console.log(owner.address)

  const POOL = await ethers.getContractFactory("NftStake");
  const NFT = await ethers.getContractFactory("IOTABOTS");

  let pool = await POOL.attach("0xAD9837Dd281Ac6e846BEc272000467Eb4aA59511")
  let nft = await NFT.attach("0x4da36b053023D470F13753C8cF1dF61b44f2EFEE")
  
  let res2 = await nft.balanceOf(owner.address,{ gasLimit: 285000, gasPrice: 0});
  console.log("res2")
  console.log(res2)
  let res = await pool.stakeNFT([res2],{ gasLimit: 285000, gasPrice: 0});

  console.log("res")
  console.log(res)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

