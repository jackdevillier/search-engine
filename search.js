const fs = require('fs');
let smallFile = fs.readFileSync("./small_open.xml").toString();
// fs.writeFileSync("./text.txt", smallFile);
let searchIndex = Object.create(null);
let titleList = [];

findEnter(smallFile);

fs.writeFileSync("./title.txt", titleList.toString());
let data = JSON.stringify(searchIndex, null, 2);
fs.writeFileSync("./final.txt", data);


function findEnter(li) {
    let newlist = li.split("<page>\n<title>");
    for (let pageIndex = 0; pageIndex < newlist.length; pageIndex++) {
        newlist[pageIndex] = newlist[pageIndex].split("<id>").join("|").split("\n<text>").join("|").split("|");
    }

    // console.log(newlist[2][2]);
    //newlist[i][1] for the tag
    // newlist[i][2] for the text
    makeIndex(newlist);
}


function makeIndex(li, err) {
    let newerlist = li;
    for (let i = 1; i < newerlist.length; i++) {
        titleList.push(newerlist[i][0] + "|" + newerlist[i][1]);
        newerlist[i][2] = newerlist[i][2].split(" ");
        for (let text = 0; text < newerlist[i][2].length; text++) {
            //checks if the index contains the keyword
            if (!searchIndex[newerlist[i][2][text]]) {
                //if not, creates new keyword "e.g. cat"
                searchIndex[newerlist[i][2][text]] = [newerlist[i][1]];
            } else {
                //if a keyword already exists in 
                //the index, the id is added to the 
                //list of ids which the keyword is associated with.
                //Checks if the id before this one is the same as this one, it will not go into the list.
                let idArray = searchIndex[newerlist[i][2][text]];
                let idCurr = newerlist[i][1];
                //console.log(idArray[idArray.length - 1]);
                if (idArray[idArray.length - 1] != idCurr) {
                    idArray.push(idCurr);
                }
            }
        }
    //console.log(i);
    }

}
