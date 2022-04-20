const funcs = {};
const videoManager = require("../managers/video");
const folderManager = require("../managers/folder");
const { changeNotesFormat } = require("../utils/notes");
funcs.readNotes = async ({ video_id, user_id }) => {
  console.log(user_id);
  const video = await videoManager.findVideo({ video_id, user_id });
  if (!video) {
    throw {
      message: "video not found",
      status: 404,
    };
  }
  const data = changeNotesFormat(video.notes);
  return data;
};

funcs.deleteVideo = async ({ video_id, user_id }) => {
  const video = await videoManager.update({
    query: { video_id, user_id },
    updateFeat: {
      is_deleted: true,
    },
  });
 
  if (!video) {
    throw {
      message: "video not found",
      status: 404,
    };
  }

  return {};
};
funcs.editName = async ({ video_id, user_id, new_video_name }) => {
  const video = await videoManager.update({
    query: { video_id, user_id },
    updateFeat: {
      video_name: new_video_name,
    },
  });

  if (!video) {
    throw {
      message: "video not found",
      status: 404,
    };
  }

  return {};
};

const changeFolder=async ({video_id, user_id, folder_name})=>{
    const folder=folderManager.findFolder(user_id,folder_name);
    if(folder.length===0){
        throw{
            message:"folder does not exist",
            status:400
        }
    }

    const video = await videoManager.update({
        query: { video_id, user_id },
        updateFeat: {
          folder: folder_name,
        },
      });
    
      if (!video) {
        throw {
          message: "video not found",
          status: 404,
        };
      }

      return {};
    

}

module.exports = funcs;
