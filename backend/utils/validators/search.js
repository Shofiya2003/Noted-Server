const { query } = require("express-validator");

const validators = {
  get: {
    "/video": [
      query("deleted")
        .exists()
        .withMessage("deleted query missing")
        .isBoolean({ loose: true })
        .withMessage("query must be 'true' of 'false' "),
    ],
  },
};
