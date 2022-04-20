const express = require("express");
const router = express.Router();
const requestHandler = require("./requestHandler");
const video = require("../services/video");

const {
  readnotes,
  deleteVideo,
  editName,
  changeFolder,
} = require("../controllers/notes/video");
router.get(
  "/:video_id",
  requestHandler.handlerequest(async (req, res, next) => {
    const { video_id } = req.params;
    const { user_id } = req.decodedTokenData;
    const notes = await video.readNotes({ video_id, user_id });
    return res.status(200).json({ message: "success", data: notes || {} });
  })
);
router.post(
  "/delete",
  requestHandler.handlerequest(async (req, res, next) => {
    const { video_id } = req.body;
    const { user_id } = req.decodedTokenData;
    await video.deleteVideo({ video_id, user_id });
    return res.status(200).json({ message: "success"});
  })
);


router.post(
  "/editname",
  requestHandler.handlerequest(async (req, res, next) => {
    const { video_id,new_video_name} = req.body;
    const { user_id } = req.decodedTokenData;
    await video.editName({ video_id, user_id,new_video_name });
    return res.status(200).json({ message: "success"});
  })
);


router.post(
    "/changefolder",
    requestHandler.handlerequest(async (req, res, next) => {
      const { video_id,folder_name} = req.body;
      const { user_id } = req.decodedTokenData;
      await video.changeFolder({ video_id, user_id,folder_name });
      return res.status(200).json({ message: "success"});
    })
  );



module.exports = router;
