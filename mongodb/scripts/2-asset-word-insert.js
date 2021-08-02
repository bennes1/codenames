use codenames;

const fs = require('fs').promises;
const path = require('path');
const walk = require("/scripts/includes/walk.js");

async function doMain() {
    print("Get wordlists...");
    let wordlists = await walk("/load_words");

    print("Read word lists...");
    let worddata = await Promise.all(wordlists.map(async wordlist => {
        const data = await fs.readFile(wordlist);
        return data.toString();
    }));
    worddata = worddata.reduce((all, fileContents) => all.concat(fileContents), []);

    print("Insert words into database...");

    wordlists.forEach((wordlist, i) => {
        if (!wordlist.endsWith(".txt")) {
            return;
        }

        let source = path.basename(wordlist).replace(".txt", "");
        let data = worddata[i].split("\n");
        data.forEach(word => {
            word = word.trim().toUpperCase();

            // If word is empty, don't insert
            if (word.length > 0 && !db.asset.findOne({value: word})) {

                print("word is " + word + "...");
                db.asset.insertOne({
                    type: "word",
                    name: word,
                    value: word,
                    collection: source
                });
            }
        });
    });
}

db.asset.deleteMany({type: "word"});
doMain().then(data => {
    print("Word inserts completed.");
});

