const User = require("../models/user");
const folderManager = require("../managers/folder");
const videoManager = require("../managers/video");
const funcs = {};

funcs.createFolder = async ({ user_id, body: { folder_name } }) => {
  const folder = await folderManager.findFolder(user_id, folder_name);
  console.log(folder);
  if (folder) {
    throw {
      message: "folder already exist",
      status: 400,
    };
  }

  folderManager.createFolder(folder_name, user_id);
};

funcs.getFolders = async ({ user_id, query: { deleted } }) => {
    console.log(user_id);
  const folders = await folderManager.getFolders(user_id, deleted);
  return folders;
};

funcs.deleteFolder = async ({ user_id, body: { folder_id, folder_name } }) => {
  const folder = await folderManager.findFolderByIdAndName(
    user_id,
    folder_id,
    folder_name
  );
  if (!folder) {
    throw {
      message: "folder does not exist",
      status: 404,
    };
  }
  await folderManager.updateFolder({
    query: { _id: user_id, "folders._id": folder_id },
    updateFeat: {
      "folders.$.is_deleted": true,
    },
  });

  await videoManager.updatMany({
    query: { user_id, folder:folder_name },
    updateFeat: {
      is_deleted: true,
    },
  });
};

funcs.editName = async ({user_id,body:{new_folder_name, old_folder_name, folder_id}}) => {
    const folder = await folderManager.findFolderByIdAndName(
        user_id,
        folder_id,
        folder_name
      );
    if (!folder) {
        throw {
          message: "folder does not exist",
          status: 404,
        };
    }

    folder=await folderManager.findFolder(user_id,new_folder_name);
    if(!folder){
        throw {
            message: `folder with name ${new_folder_name} already exist`,
            status: 404,
        };
    }

    await folderManager.updateFolder({
        query:{ _id: _id, "folders._id": folder_id},
        updateFeat:{
        "folders.$.folder_name": new_folder_name,
      }});

    await videoManager.updatMany({
        query: { user_id: user_id, folder: old_folder_name },
        updateFeat: {
        folder: new_folder_name,
      }})
    
};

module.exports=funcs;
