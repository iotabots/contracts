// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
const axios = require("axios");
const timer = (ms: any) => new Promise((res) => setTimeout(res, ms));

async function main() {
  const amount_minted = 1038;

  const IOTABOTS = await ethers.getContractFactory("IOTABOTS");

  const name = "IOTABOTS";
  const symbol = "IOTABOTS";
  const initBaseURI = "https://assets.iotabots.io/";

  const url: string =
    "https://raw.githubusercontent.com/iotabots/save-the-bots/main/all.txt";

  let airdrop_addresses: Array<string> = [];

  try {
    const response = await axios.get(url);
    if (response.data) {
      const array = response.data.split("\n");
      // for (var i = 0; i < array.length; i++) {
      for (var index = 0; index < amount_minted; index++) {
        var data = array[index].split(":");
        var obj = {
          id: data[0],
          address: data[1],
        };

        airdrop_addresses.push(obj.address);
      }

      let chunk_arry = [];
      var i,
        j,
        temporary,
        chunk = 50;
      for (i = 0, j = airdrop_addresses.length; i < j; i += chunk) {
        temporary = airdrop_addresses.slice(i, i + chunk);
        // do whatever
        chunk_arry.push(temporary);
      }

      console.log("chunk_arry length:", chunk_arry.length);

      const iotabots = await IOTABOTS.deploy(
        name,
        symbol,
        initBaseURI,
        chunk_arry[0]
      );

      await iotabots.deployed();

      console.log("IOTABOTS deployed to:", iotabots.address);

      let errors = [];
      for (var chunk = 1; chunk < chunk_arry.length; chunk++) {
        let minting = true;
        // Brut force minting
        while (minting) {
          await timer(5000);
          try {
            // let airdrop = await iotabots.airdrop(chunk_arry[chunk], { gasLimit: 285000, gasPrice: 0 });
            let airdrop = await iotabots.airdrop(chunk_arry[chunk]);
            console.log("airdrop NFTs minted:", chunk);
            console.log("hash:", airdrop.hash);
            minting = false;
          } catch (error) {
            console.log("airdrop NFTs not minted:", chunk);
            console.log("Try again...:");
            errors.push(chunk);
          }
        }
      }

      console.log("Finished!");
      console.log("errors", errors);
    } else {
      console.log("No data");
    }
  } catch (exception) {
    process.stderr.write(`ERROR received from ${url}: ${exception}\n`);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
