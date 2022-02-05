let list = require('./list_first_500');
const fs = require('fs');

function write(array, path) {
    fs.writeFileSync(path, JSON.stringify(array));
}
// console.log("list")
// console.log(list)

let newList = []

let row;
for (let i = 0; i < list.length; i++) {
    for (let j = 0; j < list[i].dna.length; j++) {
        row = parseInt(list[j].dna.split(''))
        newList.push([row])
    }
}


console.log("newList")
console.log(newList)

write(JSON.stringify(newList), "./newList.txt")