// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var openId = event.userInfo.openId;
  const db = cloud.database();
  const _ = db.command;
  var lastdate = event.lastdate;
  var my_published = [];

  const published = await db.collection('activity').where({
    _openid: openId,
    end_time: _.gt(lastdate)
  });
  const published_count = (await published.count()).total;

  if (published_count > 0) {
    const published_activities = await published.orderBy('end_time', 'asc').get()
    published_activities.data.forEach(function (item) {
      console.log(item);
      my_published.push(item);
    })
  }

  return my_published;

}