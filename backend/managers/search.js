const funcs={};
const Video=require('../models/video')
funcs.searchVideo=async (user_id,videoname,deleted)=>{
    const videos = await Video.find({user_id, is_deleted:deleted==='true', video_name: {$regex: `${videoname}`, $options: "i"}});
    return videos;
}

module.exports=funcs;