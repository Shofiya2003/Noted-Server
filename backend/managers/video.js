const Video = require("../models/video");
const funcs = {};

funcs.findVideo = async (query) => {
  return await Video.findOne(query);
};

funcs.update = async ({ query, updateFeat }) => {
  const video = await Video.findOneAndUpdate(query, {
    $set: updateFeat,
  });
  console.log(video);
  return video;
};

funcs.updatMany = async ({ query, updateFeat }) => {
  await Video.updateMany(query, {
    $set: updateFeat,
  });

  return;
};

funcs.createVideo = async ({ feat }) => {
  const video = await Video.create(feat);
  return video;
};

module.exports = funcs;
