const fs = require('fs');
const obj = JSON.parse(fs.readFileSync("./final.txt").toString());
let titles = fs.readFileSync("./title.txt").toString();
titles = titles.split(",");
for (let page = 0; page < titles.length; page++) {
    // titles[page][0] is title and titles[page][1] is id
    titles[page] = titles[page].split("\n|");
}
let idList = (obj[process.argv[2]]);
let finalTitle = [];
//find each id in the title list and associate that id with the title,
// add that title to a new list and log that list
for (let idNum = 0; idNum < idList.length; idNum++) {

    for (let i = 0; i < titles.length; i++) {

        if (idList[idNum] == titles[i][1]) {
            finalTitle.push(titles[i][0] + " " + titles[i][1] + "\n");
        }
    }
}
for (let title = 0; title < finalTitle.length;title++) {
	console.log(finalTitle[title]);
}
