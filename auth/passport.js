const passport = require("passport");
const LocalStrategy  = require("passport-local").Strategy;

const bcrypt = require("bcrypt");
const pool = require("../config/pool");



passport.use(new LocalStrategy( async (username, password, done) => {
    try {
        const { rows } = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
        const user  = rows[0];
        if (!user) {
            return done(null, false, { message: `There is no user with username "${username}"` })
        }
        else {
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return done(false, null, { message: "Incorrect password!" })
            }
        }
        return done(null, user)
    } catch (err) {
        return done(err)
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.users_id)
  })
  
  passport.deserializeUser( async (id, done) => {
    try {
      const { rows } = await pool.query(`SELECT * FROM users WHERE users_id = $1`, [id])
      done(null, rows[0])
    } catch(err) {
       done(err)
    }
  })

module.exports = passport