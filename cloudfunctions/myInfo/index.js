//获取我的信息 无参数

// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const openId = event.userInfo.openId;
  const db = cloud.database();
  const _ = db.command;

  const my_info = (await db.collection('account').where({
    _openid: openId
  }).get()).data.shift();

  return my_info;
}