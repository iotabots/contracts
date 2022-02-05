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

  const NFT = await ethers.getContractFactory("IOTABOTS");

  let nft = await NFT.attach("0x4da36b053023D470F13753C8cF1dF61b44f2EFEE")
  
  let res = await nft.walletOfOwner(owner.address,{ gasLimit: 285000, gasPrice: 0});
  
    console.log("res")
    console.log(res)

  let res2 = await nft.transferFrom(owner.address, "0xC2d08F1C753B72D0227c1Bd5Ae9913187A18D36e", 2, { gasLimit: 285000, gasPrice: 0});
  
    console.log("res2")
    console.log(res2)


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

