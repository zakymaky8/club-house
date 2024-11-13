const { Router } = require("express");
const { getHomePage, getSignUpPage, getLoginPage, postRegistrationData, getMessages, getCreateMessageForm, logUserOut, getJoinForm, changeMembershipStatus, deleteMessageAsAdmin, createNewMessage } = require("../controllers/indexController");
const passport = require("../auth/passport");
const flash = require("connect-flash");
const session = require("express-session");
const {isLogged} = require("../middlewares/logger")

const indexRouter = Router();

indexRouter.use(session({
             secret: "zeki",
             resave: false,
             saveUninitialized: false,
             rolling: true,
             cookie: {
                maxAge: 1000 * 60 * 60 * 24
             }
        }));
indexRouter.use(passport.session());
indexRouter.use(flash())


indexRouter.use(require("express").urlencoded({extended: false}))


indexRouter.get("/", getHomePage)

indexRouter.get("/register", getSignUpPage)

indexRouter.get("/login", getLoginPage);

indexRouter.post("/register", postRegistrationData);

indexRouter.post("/login",
     passport.authenticate(
            "local",
                {
                    failureRedirect: "/login",
                    successRedirect: "/messages",
                    failureFlash: true,
                    failureMessage: "Incorrect username or password!"
                }
            ));

indexRouter.get("/messages", isLogged, getMessages)

indexRouter.get("/new_message", isLogged, getCreateMessageForm)

indexRouter.get("/log_out", logUserOut)

indexRouter.get("/join_club", isLogged, getJoinForm)

indexRouter.post("/join_club", isLogged, changeMembershipStatus)

indexRouter.post("/delete_msg/:msg_id", isLogged, deleteMessageAsAdmin)

indexRouter.post("/create_msg", isLogged, createNewMessage)

module.exports = indexRouter

