const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/UserModels");
const Message = require('../models/MessageModels');
const pool = require("../config/pool");
const { validateRegistration } = require("../middlewares/validate")


const getHomePage = (req, res) => {
    res.render("index", {title: "Home"});
}

const getSignUpPage = (req, res)  => {
    res.render("sign_up", { title: "Register" })
}

const getLoginPage = (req, res)  => {
    const errMsg = req.flash("error");
    res.render("login", { title: "Log in", errMsg: errMsg, fieldValues: req.body })
}

const getCreateMessageForm = (req, res) => {
    res.render("newMessage", {title: "New Message"})
}

const getJoinForm = (req, res) => {
    res.render("join_prompt", {title: "Join the Club"})
}

const changeMembershipStatusToMember = async (req, res) =>  {
    const { passcode } = req.body;
    console.log(passcode);
    if (passcode === "zekyhero") {
        await User.editUser(req.user);
        res.redirect("/messages");
        return;
    } else {
        res.render("join_prompt", { failureMsg: "Incorrect passcode!" })
    }
}

const changeMembershipStatusToNotMember = async (req, res) => {
    console.log(req.user);
    await User.editUser(req.user);
    res.redirect("/messages");
}

const logUserOut = (req, res) => {
    req.logOut(err => {
        console.log(err)
    })
    res.redirect('/')
}


const postRegistrationData = [validateRegistration, async function (req, res, next)  {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.render("sign_up", {title: "Register", errors: errors.array(), fieldValues: req.body});
        return;
    } else {
        try {
            const { first_name, last_name, username, password, isAdmin } = req.body;
            const hashed_pwd = await bcrypt.hash(password, 10);
            await User.createUser(first_name, last_name, username, hashed_pwd, isAdmin);
            res.redirect('/login');
        } catch (err) {
            next("error")
        }
    }
}]

const getMessages = async (req, res, next) => {
    try {

        const messages = await Message.getMessages();
        res.render("messages", {messages: messages, title: "Messages", user: req.user});

    } catch(err) {
        next(err)
    }
}

const deleteMessageAsAdmin = async (req, res) => {
    const { msg_id } = req.params;
    console.log(msg_id);
    await Message.deleteMessage(Number(msg_id));
    res.redirect("/messages")
}


const createNewMessage = async (req, res) => {
    await Message.createMessage(req.user, req.body);
    res.redirect("/messages")
}



module.exports = {
                   getHomePage,
                   getSignUpPage,
                   getLoginPage,
                   postRegistrationData,
                   getMessages,
                   getCreateMessageForm,
                   logUserOut,
                   getJoinForm,
                   changeMembershipStatusToMember,
                   deleteMessageAsAdmin,
                   createNewMessage,
                   changeMembershipStatusToNotMember
            }