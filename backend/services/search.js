const funcs={};
const Video=require('../models/video');
const search=require('../managers/search')

funcs.searchVideo=async ({user_id,query:{videoname,deleted}})=>{
  const videos=await search.searchVideo(user_id,videoname,deleted);
  return videos;
}

module.exports=funcs;