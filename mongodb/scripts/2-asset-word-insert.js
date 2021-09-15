use codenames;

const fs = require('fs').promises;
const path = require('path');
const walk = require("/scripts/includes/walk.js");

async function doMain() {
    let wordlists = await walk("/load_words");

    let worddata = await Promise.all(wordlists.map(async wordlist => {
        const data = await fs.readFile(wordlist);
        return data.toString();
    }));
    worddata = worddata.reduce((all, fileContents) =>
        all.concat(fileContents), []);

    await Promise.all(
        wordlists.map(async (wordlist, i) => {
            if (!wordlist.endsWith(".txt")) {
                return;
            }

            print ("Adding words from " + wordlist + "...");

            let source = path.basename(wordlist).replace(".txt", "");
            let data = worddata[i].split("\n");

            await Promise.all(
                data.map(async (word) => {
                    word = word.trim().toUpperCase();

                    // If word is empty, don't insert
                    if (word.length > 0 && !db.asset.findOne({value: word})) {

                        await db.asset.insertOne({
                            type: "W",
                            name: word,
                            value: word,
                            collection: source
                        });
                    }
                })
            );
        })
    );
}

doMain().then(data => {
    print("Word inserts completed.");
});

