// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var openId = event.openid;
  const db = cloud.database();
  const _ = db.command;
  var my_opinion = [];

  const opinion = await db.collection('opinion').where({
    publisher_id: openId,
  });
  const opinion_count = (await opinion.count()).total;

  if (opinion_count > 0) {
    const opinions = await opinion.orderBy('time', 'desc').get();
    opinions.data.forEach(function (item) {
      console.log(item);
      my_opinion.push(item);
    });
  }

  return my_opinion;
}