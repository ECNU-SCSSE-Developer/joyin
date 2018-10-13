// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var openId = event.userInfo.openId;
  const db = cloud.database();
  const _ = db.command;
  var lastdate = event.lastdate;
  var my_joined = [];

  const joined = await db.collection('join').where({
    _openid: openId,
    is_reply: true,
    is_agree: true,
    is_opinion: false
  });
  const joined_count = (await joined.count()).total;

  if (joined_count > 0) {
    var joined_activities_id = [];
    (await joined.get()).data.forEach(function (item) {
      joined_activities_id.push(item.act_id);
    });
    const joined_activities = await db.collection('activity').where({
      _id: _.in(joined_activities_id),
      end_time: _.gt(lastdate)
    }).orderBy('end_time', 'asc').get();
    joined_activities.data.forEach(function (item) {
      console.log(item);
      my_joined.push(item);
    });
  }

  return my_joined;
}