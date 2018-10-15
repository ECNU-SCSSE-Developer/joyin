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
  act_info.type = "stranger";   //默认用户为stranger
  if(act_info._openid == openId){   //当前用户是该活动的发布者
    act_info.type = "publisher";
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
    //报名者
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
    const join = (await db.collection('join').where({
      _openid: openId,
      act_id: act_id
    }).get()).data;
    if(join.length > 0){  //不是stranger
      const user_type = join.shift();
      if (user_type.is_reply == true && user_type.is_agree == true) {
        act_info.type = "joiner";   //是参加者
      } else if (user_type.is_reply == false && user_type.is_agree == false) {
        act_info.type = "applyer";  //是报名者
      } else {
        var is_favorite = (await db.collection('favorite').where({
          _openid: openId,
          act_id: act_id
        }).count()).total;
        if (is_favorite > 0) {
          act_info.type = "favoriter";  //是已收藏者
        }
      }
    }
    
    
    const publisher_info = (await db.collection('account').where({
      _openid: act_info._openid
    }).get()).data.shift();
    act_info.publisher_info = publisher_info;
  }

  return act_info;

}