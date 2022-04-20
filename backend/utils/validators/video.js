const { body, param } = require("express-validator");

const validators = {
  post: {
    "/delete": [body("video_id").exists().withMessage("video_id is missing")],
    "/editname": [
      body("video_id").exists().withMessage("video_id is missing"),
      body("new_video_name").exists().withMessage("new_video_name is missing"),
    ],
    "/changefolder": [
      body("video_id").exists().withMessage("video_id is missing"),
      body("folder_name").exists().withMessage("folder_name is missing"),
    ],
  },
  get: {
    "/videoid": [param("video_id").exists().withMessage("param video_id is missing")],
  },
};

module.exports=validators;
