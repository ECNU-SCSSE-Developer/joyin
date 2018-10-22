// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const _ = db.command;
  const act_id = event.act_id;
  const openId = event.userInfo.openId;

  await db.collection('join').where({
    act_id: act_id,
    _openid: openId
  })
  .update({
    data: {
      is_opinion: true
    }
  });
  
}