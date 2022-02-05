// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
const axios = require('axios');
const timer = (ms: any) => new Promise(res => setTimeout(res, ms));

async function main() {


    const iotabots_address = "0x5985a17566bFa25f05463E751F924a47384d4f42"

    const url: string = "https://raw.githubusercontent.com/iotabots/save-the-bots/main/all.txt";


    const response = await axios.get(url);
    if (response.data) {

        const array = response.data.split('\n');
        var jsonObj = [];
        var errors = [];
        for (var i = 1; i <= 1000; i++) {
            var data = array[i].split(':');
            var obj = {
                id: data[0],
                address: data[1],
            };

            const NFT = await hre.ethers.
                getContractFactory("IOTABOTS");
            const contract = NFT.attach(iotabots_address);
            let minting = true
            // Brut force minting
            while (minting) {
                await timer(5000);
                try {
                    let mintedNFT = await contract.mint(obj.address, 1, { gasLimit: 285000, gasPrice: 0 });
                    console.log("NFT minted:", obj.id);
                    minting = false
                } catch (error) {
                    console.log("NFT not minted:", obj.id);
                    console.log("Try again...:");
                    errors.push(obj)
                }
            }


        }

        // End
        console.log("Minting successfull!");
        console.log("Errors:");
        console.log(errors);


    } else {
        console.log("No data");
    }
}



// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

