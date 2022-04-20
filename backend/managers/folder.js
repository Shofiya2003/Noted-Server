const User=require('../models/user');
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
    return folder;
  };

  module.exports=funcs;