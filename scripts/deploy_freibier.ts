// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {


  const FREIBIER = await ethers.getContractFactory("Freibier");

  const name = "einfachIOTA Freibier"
  const symbol = "FREIBIER"
  const initBaseURI = ""

  const freibier = await FREIBIER.deploy(name, symbol, initBaseURI);

  await freibier.deployed();

  console.log("FREIBIER deployed to:", freibier.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
