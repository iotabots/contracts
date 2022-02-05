// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  const TOKEN = await ethers.getContractFactory("BOLTS");

  const name = "IOTABOTS BOLTS"
  const symbol = "BOLTS"
  const IOTABOTS_ADDRESS = "0xb5A53615170e4684E488C9E1c641aB9dDC307489"
  const token = await TOKEN.deploy(name, symbol, IOTABOTS_ADDRESS);

  await token.deployed();

  console.log("TOKEN deployed to:", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
