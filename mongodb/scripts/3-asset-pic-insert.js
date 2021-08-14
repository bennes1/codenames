use codenames;

const fs = require('fs').promises;
const path = require('path');
const walk = require("/scripts/includes/walk.js");

async function doMain() {
    let pictures = await walk("/load_pictures");

    print("Adding pictures...");
    await Promise.all(pictures.map(async picture => {
        const data = await fs.readFile(picture, "base64");

        let source = picture.split("/");
        source = source[source.length - 2]; // parent folder
        if (source == "scripts") {
            source = "";
        }

        db.asset.insertOne({
            type: "picture",
            name: picture,
            value: data,
            collection: source
        });

    }));
}

db.asset.deleteMany({type: "picture"});
doMain().then(data => {
    print("Picture inserts completed.");
});

