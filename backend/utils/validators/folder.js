const { body, query } = require("express-validator");
const validators = {
  post: {
    "/create": [
      body("folder_name").exists().withMessage("folder name is missing"),
    ],
    "/delete": [
      body("folder_name").exists().withMessage("folder name is missing"),
    ],
    "/editname": [
      body("new_folder_name")
        .exists()
        .withMessage("new folder name is missing"),
      body("old_folder_name")
        .exists()
        .withMessage("old folder name is missing"),
    ],
  },

  get: {
    "/getfolders": [
      query("deleted")
        .exists()
        .withMessage("deleted query missing")
        .isBoolean({ loose: true })
        .withMessage("query must be 'true' of 'false' "),
    ],
  },
};

module.exports = validators;
