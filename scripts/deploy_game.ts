// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {

  const NFT_ADDRESS = "0x4da36b053023D470F13753C8cF1dF61b44f2EFEE"

  const GAME = await ethers.getContractFactory("Game");

  const game = await GAME.deploy(NFT_ADDRESS);

  await game.deployed();

  console.log("game deployed to:", game.address);



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
