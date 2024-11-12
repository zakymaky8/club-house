const { Client } = require("pg");
require("dotenv").config();



const SQL = `
        CREATE TABLE IF NOT EXISTS users (
            users_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            first_name VARCHAR( 50 ),
            last_name VARCHAR( 50 ),
            username TEXT,
            password VARCHAR( 255 ),
            membership_status TEXT
        );

        INSERT INTO users (first_name, last_name, username, password, membership_status)
                        VALUES('John', 'Doe', 'johny', 'strongpwd', 'unauthorized');

        CREATE TABLE IF NOT EXISTS  messages (
            messages_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
            title TEXT,
            timestamp TIMESTAMP,
            msg_text TEXT,
            user_id INTEGER REFERENCES users(users_id)
        );
        INSERT INTO messages (title, timestamp, msg_text, user_id)
                        VALUES('Greeting', NOW(), 'HELLO WORLD', 1);
`


async function main() {
    console.log("seeding ...");
    const client = new Client({
        connectionString: `${process.env.CONNECTION_STRING}`,
    });
    await client.connect();
    await client.query(SQL);
    await client.end();
    console.log("done!")
}

main()