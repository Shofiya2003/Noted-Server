const Video=require('../models/video');
const funcs={};

funcs.findVideo=async (query)=>{
    return await Video.findOne(query);
}

funcs.update=async ({query,updateFeat})=>{
    const video=await Video.findOneAndUpdate(query,{
        $set:updateFeat
    });
    console.log(video);
    return video;
}

module.exports=funcs;