const pool = require("../config/pool")

module.exports = {
    getUsers: async () => {

    },

    getUser: async () => {
        
    },

    editUser: async (user) => {
        if (user.membership_status === "not member") {
            await pool.query(`UPDATE users SET membership_status = 'member' WHERE users.users_id = $1`, [ user.users_id])
        } else if (user.membership_status === "member") {
            await pool.query(`UPDATE users SET membership_status = 'not member' WHERE users.users_id = $1`, [ user.users_id])
        }
    },

    createUser: async (fname, lname, uname, pwd, isAdmin) => {
        await pool.query(`INSERT INTO users (
                                    first_name,
                                    last_name,
                                    username,
                                    password,
                                    membership_status
                                )
                            VALUES ($1, $2, $3, $4, $5)`, [fname, lname, uname, pwd, isAdmin === "on" ? "admin" : "not member"])
    },

    deleteUser: async () => {

    },

    deleteUsers: async () => {

    }
}