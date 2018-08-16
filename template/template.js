// pages/template/template.js
//初始化数据
function tabbarinit() {
  return [
    {
      "current": 0,
      "pagePath": "/pages/joyin/joyin",
      "iconPath": "/image/homeIcon.png",
      "selectedIconPath": "/image/homeIconS.png",
      "text": "JoyIn"
    },
    {
      "current": 0,
      "pagePath": "/pages/activity/activity",
      "iconPath": "/image/messageIcon.png",
      "selectedIconPath": "/image/messageIconS.png",
      "text": "邀约"

    },
    {
      "current": 0,
      "pagePath": "/pages/mine/mine",
      "iconPath": "/image/profileIcon.png",
      "selectedIconPath": "/image/profileIconS.png",
      "text": "我的"
    }
  ]

}
//tabbar 主入口
function tabbarmain(bindName = "tabdata", id, target) {
  var that = target;
  var bindData = {};
  var otabbar = tabbarinit();
  otabbar[id]['iconPath'] = otabbar[id]['selectedIconPath']//换当前的icon
  otabbar[id]['current'] = 1;
  bindData[bindName] = otabbar
  that.setData({ bindData });
}

module.exports = {
  tabbar: tabbarmain
}