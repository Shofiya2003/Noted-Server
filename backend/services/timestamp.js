const { formattimestamp } = require("../utils/notes");
const videoManager = require("../managers/video");
const url=require('url');
const funcs = {};

funcs.readtimestampnotes = async ({ video_url, timestamp, user_id }) => {
  timestamp = formattimestamp(timestamp);
  const { v: video_id } = url.parse(video_url, true).query;
  const video = await videoManager.findVideo({ video_id, user_id });
  if (!video) {
    throw {
      message: "video not found",
      status: 404,
    };
  }
  const currentNotes = getNotesOfTimestamp(video.notes, timestamp);
  if (!currentNotes) {
    throw {
      message: "timestamp not found",
      status: 404,
    };
  }

  return currentNotes;
};

funcs.updateNotes = async ({ video_name, timestamp, content, user_id }) => {
  const video = await videoManager.findVideo({ video_name, user_id });
  console.log(video);
  if (!video) {
    throw {
      message: "video not found",
      status: 404,
    };
  }
  timestamp = formattimestamp(timestamp);
  const currentNotes = getNotesOfTimestamp(video.notes, timestamp);
  if (!currentNotes) {
    throw {
      message: "timestamp not found",
      status: 404,
    };
  }
  const updatednotes = getUpdatedNotes(video.notes, timestamp, content);

  await videoManager.update({
    query: { video_name, user_id },
    updateFeat: {
      notes: updatednotes,
    },
  });

  return {};
};

funcs.createNotes = async ({
  user_id,
  body: { video_url, videoname: video_name, timestamp, content },
}) => {
  const { v: video_id } = url.parse(video_url, true).query;
  const video = await videoManager.findVideo({ video_id, user_id });
  timestamp = formattimestamp(timestamp);
  if (video) {
    const updatednotes = getUpdatedNotes(video.notes, timestamp, content);
    await videoManager.update({
      query: { video_id, user_id },
      updateFeat: {
        notes: updatednotes,
      },
    });
    return {};
  }

  const notes = new Map();
  notes = getUpdatedNotes(notes, timestamp, content);
  await videoManager.createVideo({
    video_id,
    video_url,
    user_id,
    video_name,
    folder: "default",
    notes,
    is_deleted: false,
  });
  return {};
};

funcs.deleteTimestamp = async ({ user_id, body: { video_id, timestamp } }) => {
  const video = await videoManager.findVideo({ video_id, user_id });
  if (!video) {
    throw {
      message: "video not found",
      status: 404,
    };
  }
  timestamp = formattimestamp(timestamp);
  const currentNotes = getNotesOfTimestamp(video.notes, timestamp);
  if (!currentNotes) {
    throw {
      message: "timestamp not found",
      status: 404,
    };
  }
  const updatednotes = deleteNotes(video.notes, timestamp);
  await videoManager.update({
    query: { video_id, user_id },
    updateFeat: {
      notes: updatednotes,
    },
  });
  return {};
};

const getUpdatedNotes = (notes, timestamp, content) => {
  notes.set(timestamp, content);
  return notes;
};

const getNotesOfTimestamp = (notes, timestamp) => {
  if (notes.has(timestamp)) {
    return notes.get(timestamp);
  }
};

const deleteNotes = (notes,timestamp) => {
  notes.delete(timestamp);
  return notes;
};

module.exports=funcs;
