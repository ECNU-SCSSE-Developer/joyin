// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const db = cloud.database();
  const _ = db.command;
  const act_id = event.act_id;
  const openid = event.openid;

  db.collection('join').where({
    _openid: openid,
    act_id: act_id
  })
    .update({
      data: {
        is_reply: true,
        is_agree: false
      }
    });
}