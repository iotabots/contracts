// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {



  const TOKEN = await ethers.getContractFactory("IOTABOTToken");

  let token = await TOKEN.attach("0xa67cFea03Bfb822308b509CAd5Ad4dF2f2ff20D9")
  
  let token_amount = 1000000000000000

  let res = await token.mint("0xF726E5259ECfA8fe0F590d9EFdE5833cA25f0078", token_amount);

  console.log("res")
  console.log(res)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
