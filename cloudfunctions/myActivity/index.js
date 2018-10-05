// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var openId = event.userInfo.openId;
  const db = cloud.database();
  const _ = db.command;
  
  const limited_num = 2;
  var num = 0;       //按照顺序已查询到的活动数
  var my_activities = [];
  

  // 已确认的活动
  const joined = await db.collection('join').where({
    _openid: openId,
    is_reply: true,
    is_agree: true,
    is_opinion: false
  });
  const joined_count = (await joined.count()).total;
  num = num + joined_count;

  if(joined_count > 0){
    var joined_activities_id = [];
    (await joined.get()).data.forEach(function(item){
      joined_activities_id.push(item.act_id);
    });
    console.log(joined_activities_id);
    const joined_activities = await db.collection('activity').where({
      _id: _.in(joined_activities_id),
      end_time: _.gt(new Date().getTime())
    }).orderBy('end_time', 'asc').limit(limited_num).get();
    joined_activities.data.forEach(function(item){
      console.log(item);
      item.type = '已确认';
      my_activities.push(item);
    });
  }
  
  

  //已发布
  if (num < limited_num){
    const published = await db.collection('activity').where({
      _openid: openId,
      end_time: _.gt(new Date().getTime())
    });
    const published_count = (await published.count()).total;
    
    if (published_count > 0) {
      const published_activities = await published.orderBy('end_time', 'asc').limit(limited_num-num).get()
      published_activities.data.forEach(function (item) {
        item.type = '已发布';
        my_activities.push(item);
      })
    }

    num = num + published_count;
  }

  //已报名
  if(num < limited_num){
    const applyed = await db.collection('join').where({
      _openid: openId,
      is_reply: false,
      is_agree: false,
      is_opinion: false
    });
    const applyed_count = (await applyed.count()).total;

    if (applyed_count > 0) {
      var applyed_activities_id = [];
      (await applyed.get()).data.forEach(function (item) {
        applyed_activities_id.push(item.act_id);
      });
      console.log(applyed_activities_id);
      const applyed_activities = await db.collection('activity').where({
        _id: _.in(applyed_activities_id),
        end_time: _.gt(new Date().getTime())
      }).orderBy('end_time', 'asc').limit(limited_num-num).get();
      applyed_activities.data.forEach(function (item) {
        console.log(item);
        item.type = '已报名';
        my_activities.push(item);
      });
    }

    num = num + applyed_count;
  }

  //已收藏
  if (num < limited_num) {
    const favorited = await db.collection('favorite').where({
      _openid: openId,
    });
    const favorited_count = (await favorited.count()).total;

    if (favorited_count > 0) {
      var favorited_activities_id = [];
      (await favorited.get()).data.forEach(function (item) {
        favorited_activities_id.push(item.act_id);
      });
      console.log(favorited_activities_id);
      const favorited_activities = await db.collection('activity').where({
        _id: _.in(favorited_activities_id),
        end_time: _.gt(new Date().getTime())
      }).orderBy('end_time', 'asc').limit(limited_num - num).get();
      favorited_activities.data.forEach(function (item) {
        console.log(item);
        item.type = '已收藏';
        my_activities.push(item);
      });
    }
    num = num + applyed_count;
  }

  //返回结果
  return my_activities;
}