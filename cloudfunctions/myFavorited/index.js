// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var openId = event.userInfo.openId;
  const db = cloud.database();
  const _ = db.command;
  var lastdate = event.lastdate;
  var my_favorited = [];

  const favorited = await db.collection('favorite').where({
    _openid: openId,
  });
  const favorited_count = (await favorited.count()).total;

  if (favorited_count > 0) {
    var favorited_activities_id = [];
    (await favorited.get()).data.forEach(function (item) {
      favorited_activities_id.push(item.act_id);
    });
    const favorited_activities = await db.collection('activity').where({
      _id: _.in(favorited_activities_id),
      end_time: _.gt(lastdate)
    }).orderBy('end_time', 'asc').get();
    favorited_activities.data.forEach(function (item) {
      console.log(item);
      my_favorited.push(item);
    });
  }

  return my_favorited;

}