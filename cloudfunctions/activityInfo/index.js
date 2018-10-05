//活动详情界面数据 参数act_id


// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  var openId = event.userInfo.openId;
  const db = cloud.database();
  const _ = db.command;
  var act_id = event.act_id;

  var act_info = (await db.collection('activity').where({
    _id: act_id,
  }).get()).data.shift();
  if(act_info._openid == openId){   //当前用户是该活动的发布者
    act_info.is_publisher = true;
    //活动的参加者
    const joiner = await db.collection('join').where({
      act_id: act_id,
      is_reply: true,
      is_agree: true,
    });
    const joiner_count = (await joiner.count()).total;
    if (joiner_count > 0) {
      var joiners_id = [];
      (await joiner.get()).data.forEach(function (item) {
        joiners_id.push(item._openid);
      });
      const joiner_info = (await db.collection('account').where({
        _openid: _.in(joiners_id),
      }).get()).data;
      act_info.joiner_info = joiner_info;
    }
    //活动的报名者
    const applyer = await db.collection('join').where({
      act_id: act_id,
      is_reply: false,
    });
    const applyer_count = (await applyer.count()).total;
    if (applyer_count > 0) {
      var applyers_id = [];
      (await applyer.get()).data.forEach(function (item) {
        applyers_id.push(item._openid);
      });
      const applyer_info = (await db.collection('account').where({
        _openid: _.in(applyers_id),
      }).get()).data;
      act_info.applyer_info = applyer_info;
    }
  } else {   //当前用户不是该活动的发布者
    act_info.is_publisher = false;
    const publisher_info = (await db.collection('account').where({
      _openid: act_info._openid
    }).get()).data.shift();
    act_info.publisher_info = publisher_info;
  }

  return act_info;

}