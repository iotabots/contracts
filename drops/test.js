
const axios = require('axios');

const url = "https://raw.githubusercontent.com/iotabots/save-the-bots/main/all.txt";


async function main() {

    try {
        const response = await axios.get(url);
        console.log("response: ");
        if (response.data) {
            const array = response.data.split('\n');

            var jsonObj = [];
            for (var i = 0; i < 500; i++) {
                var data = array[i].split(':');
                var obj = {
                    id: data[0],
                    address: data[1],
                }
                for (var j = 500; j < array.length; j++) {
                    var data2 = array[j].split(':');
                    var obj2 = {
                        id: data2[0],
                        address: data2[1],
                    }
                    if (obj.address === obj2.address) {
                        console.log("double found!: ");
                        console.log("address: ", obj.address);
                        console.log("obj id!: ", obj.id);
                        console.log("obj2 id!: ", obj2.id);
                    }
                }
            }
        }
    } catch (exception) {
        console.log("err: ", exception);
    }
}

main()