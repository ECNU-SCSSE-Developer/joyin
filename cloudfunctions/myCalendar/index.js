//日历界面数据 无参数


// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const openId = event.userInfo.openId;
  const db = cloud.database();
  const _ = db.command;
  var my_activities = [];

  //已参加
  const joined = await db.collection('join').where({
    _openid: openId,
    is_reply: true,
    is_agree: true,
  });
  const joined_count = (await joined.count()).total;

  if (joined_count > 0) {
    var joined_activities_id = [];
    (await joined.get()).data.forEach(function (item) {
      joined_activities_id.push(item.act_id);
    });
    const joined_activities = await db.collection('activity').where({
      _id: _.in(joined_activities_id),
    }).orderBy('end_time', 'asc').get();
    joined_activities.data.forEach(function (item) {
      item.type = 'joined';
      my_activities.push(item);
    });
  }

  //已发布
  const published = await db.collection('activity').where({
    _openid: openId,
  });
  const published_count = (await published.count()).total;

  if (published_count > 0) {
    const published_activities = await published.orderBy('end_time', 'asc').get()
    published_activities.data.forEach(function (item) {
      item.type = 'published';
      my_activities.push(item);
    })
  }

  //已报名
  const applyed = await db.collection('join').where({
    _openid: openId,
    is_reply: false,
    is_agree: false,
  });
  const applyed_count = (await applyed.count()).total;

  if (applyed_count > 0) {
    var applyed_activities_id = [];
    (await applyed.get()).data.forEach(function (item) {
      applyed_activities_id.push(item.act_id);
    });
    const applyed_activities = await db.collection('activity').where({
      _id: _.in(applyed_activities_id),
    }).orderBy('end_time', 'asc').get();
    applyed_activities.data.forEach(function (item) {
      item.type = 'applyed';
      my_activities.push(item);
    });
  }

  //已收藏
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
    }).orderBy('end_time', 'asc').get();
    favorited_activities.data.forEach(function (item) {
      item.type = 'favorited';
      my_activities.push(item);
    });
  }

  return my_activities;
}