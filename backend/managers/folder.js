const User=require('../models/user');
const authManager=require('../managers/auth');
const funcs={};

funcs.findFolder=async (user_id, folder_name) => {
    let folder = await User.findOne(
      { _id: user_id },
      {
        folders: {
          $filter: {
            input: "$folders",
            as: "folder",
            cond: {
              $and: [
                { $eq: ["$$folder.folder_name", folder_name] },
                { $eq: ["$$folder.is_deleted", false] },
              ],
            },
          },
        },
      }
    );
    console.log(folder);
    return folder.folders[0];
  };

  funcs.findFolderByIdAndName=async (user_id,folder_id,folder_name)=>{
      let folder = await User.findOne(
        { _id: user_id },
        {
          folders: {
            $filter: {
              input: "$folders",
              as: "folder",
              cond: {
                $and: [
                  { $eq: ["$$folder.folder_name", folder_name] },
                  { $eq: ["$$folder._id", folder_id] },
                  { $eq: ["$$folder.is_deleted", false] },
                ],
              },
            },
          },
        }
      );
    return folder.folders[0];
  }


  funcs.updateFolder=({query,updateFeat})=>{
       const user=await User.findOneAndUpdate(query,{$set:updateFeat});
       return user;
  }

  

  funcs.createFolder=async (folder_name,user_id)=>{
    const user=await authManager.findUser({_id:user_id});
    folder = { folder_name: folder_name, is_deleted: false, user_id:user_id };
    user.folders.push(folder);
    await user.save();
  }

  funcs.getFolders=async ({user_id:_id,deleted:is_deleted})=>{
    const folders = await User.find(
      { _id },
      {
        folders: {
          $filter: {
            input: "$folders",
            as: "folder",
            cond: {
              $and: [{ $eq: ["$$folder.is_deleted", is_deleted === "true"] }],
            },
          },
        },
      }
    ).sort({ "folders.createdAt": 1 });
    console.log(folders);
    return folders[0].folders;
  }
  module.exports=funcs;