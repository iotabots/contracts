// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

const TX_HASH =
  "0xec089bd5af6ae4a8e2fe2dbcf6488350a5234b11d3653b365f2eefe5781240f";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  const [owner] = await ethers.getSigners();
  console.log("owner");
  console.log(owner.address);
  console.log("Account balance:", (await owner.getBalance()).toString());

  const url = "https://evm.wasp.sc.iota-defi.com";
  const provider = new ethers.providers.JsonRpcProvider(url);
  const a: any = await provider.getTransaction(TX_HASH);
  console.log("a:", a);
  try {
    const code = await provider.call(a, a.blockNumber);
    console.log("code:", code);
  } catch (err: any) {
    const code = err.data.replace("Reverted ", "");
    console.log({ err });
    const reason = ethers.utils.toUtf8String("0x" + code.substr(138));
    console.log("revert reason:", reason);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});