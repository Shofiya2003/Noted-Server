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
    "/changepassword":[
      body("oldPassword").exists().withMessage("password is missing"),
      body("newPassword").exists().withMessage("new password is missing"),
    ]
  },
};

module.exports=validators;
