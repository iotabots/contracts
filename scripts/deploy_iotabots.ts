// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {


  const IOTABOTS = await ethers.getContractFactory("IOTABOTS");

  const name = "IOTABOTS"
  const symbol = "IOTABOTS"
  const initBaseURI = "https://assets.iotabots.io/"

  const iotabots = await IOTABOTS.deploy(name, symbol, initBaseURI);

  await iotabots.deployed();

  console.log("IOTABOTS deployed to:", iotabots.address);

  

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
