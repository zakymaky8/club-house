const pool = require("../config/pool")

module.exports = {
    getMessages: async()  => {
        const { rows } = await pool.query(`SELECT * FROM messages AS msg JOIN users AS usr ON usr.users_id = msg.user_id`);
        return rows;
    },

    getMessage: async()  => {

    },

    editMessage: async()  => {
        
    },

    createMessage: async (user, entries)  => {
        await pool.query(`INSERT INTO messages (title, timestamp, msg_text, user_id)
                          VALUES ($1, NOW(), $2, $3)`, [entries.msg_title, entries.msg_text, user.users_id])
    },

    deleteMessages: async()  => {

    },

    deleteMessage: async(msg_id) => {
        await pool.query(`DELETE FROM messages WHERE messages_id = $1`, [msg_id]);
    }
}


// title TEXT,
// timestamp TIMESTAMP,
// msg_text TEXT,
// user_id INTEGER REFERENCES users(users_id)