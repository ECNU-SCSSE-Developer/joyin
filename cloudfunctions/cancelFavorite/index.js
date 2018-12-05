// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var openId = event.userInfo.openId;
  const db = cloud.database();
  const _ = db.command;
  var act_id = event.act_id;

  
  await db.collection('favorite').where({
    _openid: openId,
    act_id: act_id
  }).remove(); 
  
  return 0;
}