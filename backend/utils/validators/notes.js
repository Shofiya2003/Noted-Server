const { body } = require("express-validator");

const validators = {
  post: {
    "/read": [
      body("videourl")
        .exists()
        .withMessage("videourl is missing")
        .isURL()
        .withMessage("invalid url"),
      body("timestamp")
        .exists()
        .withMessage("timestamp is missing")
        .isByteLength({ min: 0, max: 8 }),
    ],

    "/create": [
      body("video_url")
        .exists()
        .withMessage("videourl is missing")
        .isURL()
        .withMessage("invalid url"),
      body("timestamp")
        .exists()
        .withMessage("timestamp is missing")
        .isByteLength({ min: 0, max: 8 })
        .withMessage("timestamp is invalid"),
      body("videoname").exists().withMessage("video name is missing"),
    ],

    "/delete":[
        body("video_id").exists().withMessage("video_id is missing"),
        body("timestamp")
        .exists()
        .withMessage("timestamp is missing")
        .isByteLength({ min: 0, max: 8 })
        .withMessage("timestamp is invalid")
    ],
    
    
},
put: {
    '/update':[
        body("videoname").exists().withMessage("video name is missing"),
        body("timestamp")
        .exists()
        .withMessage("timestamp is missing")
        .isByteLength({ min: 0, max: 8 })
        .withMessage("timestamp is invalid")
        
      ]
  },
};

module.exports=validators;
