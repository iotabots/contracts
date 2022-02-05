// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {

  const TOKEN_ADRREES = "0xC764edd35678eEa7320Ca7f39d6606Caa3AcBD9D"

  const Election = await ethers.getContractFactory("Election");

  const election = await Election.deploy();

  await election.deployed();

  console.log("election deployed to:", election.address);



  // const STAKE = await ethers.getContractFactory("NftStake");

  // console.log("STAKE")
  // console.log(STAKE)


  // const name = "IOTABOTS"
  // const symbol = "IOTABOTS"
  // const initBaseURI = "https://assets.iotabots.io/"

  // IERC721 _nftToken,
  // IERC20 _erc20Token,
  // address _daoAdmin,
  // uint256 _tokensPerBlock

  // const stake = await STAKE.deploy(name, symbol, initBaseURI);

  // await stake.deployed();

  // console.log("IOTABOTS deployed to:", stake.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
