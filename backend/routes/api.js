const { Router, application } = require("express");
const express = require("express");
const router = express.Router();

// routes

const signup = require("./signup");
const signin = require("./signin");
const changepassword = require("./changepassword");
const createnotes = require("./createnotes");
const readtimestampnotes = require("./timestampnotes");
const deletetimestamp=require("./deletetimestampnotes");

router.use("/v1/signup", signup);
router.use("/v1/signin", signin);
router.use("/v1/resetpassword", changepassword);
router.use("/v1/notes/timestamp/create",createnotes);
router.use("/v1/notes/timestamp/read", readtimestampnotes);
router.use("/v1/notes/timestamp/delete",deletetimestamp);
module.exports = router;
