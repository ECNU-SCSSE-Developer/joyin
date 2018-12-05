// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var openId = event.userInfo.openId;
  const db = cloud.database();
  const _ = db.command;
  var lastdate = event.lastdate;
  var my_applyed = [];

  const applyed = await db.collection('join').where({
    _openid: openId,
    is_agree: false,
    is_opinion: false
  });
  const applyed_count = (await applyed.count()).total;

  if (applyed_count > 0) {
    var applyed_activities_id = [];
    (await applyed.get()).data.forEach(function (item) {
      applyed_activities_id.push(item.act_id);
    });
    const applyed_activities = await db.collection('activity').where({
      _id: _.in(applyed_activities_id),
      end_time: _.gt(lastdate)
    }).orderBy('end_time', 'asc').get();
    applyed_activities.data.forEach(function (item) {
      console.log(item);
      my_applyed.push(item);
    });
  }

  return my_applyed;

}