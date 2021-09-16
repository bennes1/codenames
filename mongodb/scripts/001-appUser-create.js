use codenames;

db.createUser(
    {
        user: "user",
        pwd: "pass",
        roles: [ { role: "readWrite", db: "codenames"} ],
        passwordDigestor: "server",
    }
);
