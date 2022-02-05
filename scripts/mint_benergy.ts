// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {

  const TOKEN = await ethers.getContractFactory("BOLTS");

  let token = await TOKEN.attach("0x705efdAb207C41772A6d656B1b56C49BCaC50823")

  let res = await token.requestTokens({ gasLimit: 285000, gasPrice: 0})

  console.log("res")
  console.log(res)

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
