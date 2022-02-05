// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {

  const TOKEN_ADRREES = "0xa67cFea03Bfb822308b509CAd5Ad4dF2f2ff20D9"
  const NFT_ADDRESS = "0x4da36b053023D470F13753C8cF1dF61b44f2EFEE"

  // const TOKEN = await ethers.getContractFactory("IOTABOTToken");

  // let token = await TOKEN.attach(TOKEN_ADRREES)

  // console.log("IOTABOT TOKEN deployed to:", token.address);

  // IERC721 _nftToken,
  // IERC20 _erc20Token,
  // address _daoAdmin,
  // uint256 _tokensPerBlock

  let daoAdmin = "0x8719c0e3E5f950ae9b305feD9B2B2f830C127958"

  let tokensPerBlock = 10000;

  const STAKE = await ethers.getContractFactory("NftStake");
  const stake = await STAKE.deploy(NFT_ADDRESS, TOKEN_ADRREES, daoAdmin, tokensPerBlock);


  await stake.deployed();

  console.log("STAKE deployed to:", stake.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
