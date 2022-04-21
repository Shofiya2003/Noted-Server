const express = require("express");
const requestHandler = require("./requestHandler");
const router = express.Router();
const notes=require('../services/timestamp');
router.post(
  "/read",
  requestHandler.handlerequest(async (req, res, next) => {
    let { videourl: video_url, timestamp } = req.body;
    let { user_id } = req.decodedTokenData;
    return res
      .status(200)
      .json({
        message: "success",
        notes:
          (await notes.readtimestampnotes({
            video_url,
            user_id,
            timestamp,
          })) || {},
      });
  })
);
router.put(
  "/update",
  requestHandler.handlerequest(async (req, res, next) => {
    let { videoname: video_name, timestamp, content } = req.body;
    let { user_id } = req.decodedTokenData;
    await notes.updateNotes({ video_name, timestamp, content, user_id });
    return res.status(200).json({ message: "success" });
  })
);

router.post(
  "/create",
  requestHandler.handlerequest(async (req, res, next) => {
    await notes.createNotes({
      user_id: req.decodedTokenData.user_id,
      body: req.body,
    });
    return res.status(200).json({ message: "success" });
  })
);


router.post(
  "/delete",
  requestHandler.handlerequest(async (req, res, next) => {
      await notes.deleteTimestamp({
        user_id: req.decodedTokenData.user_id,
        body: req.body,
      });
      return res.status(200).json({message: "success" });
  })
);

module.exports = router;
