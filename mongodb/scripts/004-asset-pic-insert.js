use codenames;

const fs = require('fs').promises;
const path = require('path');
const walk = require("/scripts/includes/walk.js");

async function doMain() {
    let pictures = await walk("/load_pictures");

    print("Adding pictures...");
    await Promise.all(pictures.map(async picture => {
        if (path.basename(picture) === ".save") {
            return;
        }

        const data = await fs.readFile(picture, "base64");

        let source = picture.split("/");
        source = source[source.length - 2]; // parent folder
        if (source == "scripts") {
            source = "";
        }

        await db.asset.insertOne({
            type: "P",
            name: picture,
            value: data,
            collection: source
        });

    }));
}

doMain().then(data => {
    print("Picture inserts completed.");
});

