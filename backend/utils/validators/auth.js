const { body } = require("express-validator");
const validators = {
  post: {
    "/signup": [
      body("username").exists().withMessage("username is missing"),
      body("email")
        .exists()
        .withMessage("email is missing")
        .isEmail()
        .withMessage("email is invalid"),
      body("password").exists().withMessage("password is missing"),
    ],
    "/signin": [
      body("email")
        .exists()
        .withMessage("email is missing")
        .isEmail()
        .withMessage("email is invalid"),
      body("password").exists().withMessage("password is missing"),
    ],
  },
};

module.exports=validators;
