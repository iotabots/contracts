// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
const axios = require('axios');

async function main() {

    const IOTABOTS = await ethers.getContractFactory("IOTABOTS");

    let iotabots = await IOTABOTS.attach("0x8329A0B5B7c6ef962Ccd8B8D603cc37eB96Ab01f")


    // example consuming code
    interface BotDrop {
        id: number;
        address: string;
    }

    // const start_with_id = 293
    let start_with_id = 1

    let errors = []
    let running = true;

    const url: string = "https://raw.githubusercontent.com/iotabots/save-the-bots/main/all.txt";


    try {
        const response = await axios.get(url);
        if (response.data) {

            while (running) {
                const array = response.data.split('\n');
                var jsonObj = [];
                for (var i = 0; i < array.length; i++) {
                    var data = array[i].split(':');
                    var obj = {
                        id: data[0],
                        address: data[1],
                    };

                    // Mint it!

                    if (obj.id <= start_with_id) {
                        // first NFT was already minted by SC deployment!
                        console.log("Skipping...", obj.id);
                    } else {
                        try {
                            const nft = await iotabots.mint(obj.address, 1);
                            console.log("NFT created with id: ", obj.id);
                        } catch (error) {

                            // Minting failured, try again
                            console.log("Minting failured: ", obj.id);
                            errors.push(obj.id)
                            break;
                        }
                    }


                    jsonObj.push(obj);
                }
                //
                if (start_with_id < array.length) {
                    // Start new
                    start_with_id = start_with_id + 1
                    console.log("Minting not successful! :-(");
                    console.log("Errors:");
                    console.log(errors);

                } else {
                    // Fertig!
                    console.log("Minting successful! :-)");
                    console.log("Errors:");
                    console.log(errors);
                    running = false;

                }
            }
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

