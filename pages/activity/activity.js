// pages/activity/activity.js
var template = require('../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectAreaH: true,
    areaList: false,
    area: '地点',
    selectTypeH: true,
    typeList: false,
    activityType: '活动类型',
    activities: [] //一开始是空的
  },



  toInfo: function (e) {
    //console.info(this.data.activities[e.currentTarget.dataset.name])

    var that = this;

    //请求发布者信息
    wx.cloud.callFunction({
      name: 'activityInfo',
      data: {
        act_id: that.data.activities[e.currentTarget.dataset.name]._id
      },
      success: function (res) {
        //console.info("activityInfo")
        //console.info(res.result)
        if (res.result.is_publisher == true) {
          // 把要传递的json对象转换成字符串
          //console.info("是发布者")
          var info = JSON.stringify(that.data.activities[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type3/type3?info=" + info
          })
        }
        else{
          // 把要传递的json对象转换成字符串
          //console.info("不是发布者")
          var info = JSON.stringify(that.data.activities[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../appointment3/appointment3?info=" + info
          })
        }
      },
      fail: console.error
    });
  },

  clickPlace: function() {
    var selectAreaH = this.data.selectAreaH;
    if (selectAreaH == true) {
      this.setData({
        areaList: true,
        selectAreaH: false,
      })
    } else {
      this.setData({
        areaList: false,
        selectAreaH: true,
      })
    }
  },

  //点击切换
  selectArea: function(e) {
    this.setData({
      area: e.target.dataset.me,
      selectAreaH: true,
      areaList: false,
    })
  },

  clickType: function() {
    var selectTypeH = this.data.selectTypeH;
    if (selectTypeH == true) {
      this.setData({
        typeList: true,
        selectTypeH: false,
      })
    } else {
      this.setData({
        typeList: false,
        selectTypeH: true,
      })
    }
  },

  //点击切换
  selectType: function(e) {
    this.setData({
      activityType: e.target.dataset.me,
      selectTypeH: true,
      typeList: false,
    })
  },

  //点击加号触发事件
  clickAdd: function() {
    wx.navigateTo({
      url: '/pages/appointment2/appointment2'
    })
  },

  //获取活动信息
  getActivities: function (last_date) {
    var that = this;

    const db = wx.cloud.database();
    const _ = db.command;
    if (last_date == 0) {
      db.collection('activity').where({
        end_time: _.gt(new Date().getTime())
      }).orderBy('end_time', 'asc')
        .limit(10)
        .get()
        .then(function (res) {
          console.info(res.data);
          that.setData({
            activities: res.data //把返回的数据放在activities中，然后通过activities去渲染页面
          });
        })
        .catch(function (err) {
          console.error(err);
        });
    } else {
      db.collection('activity').where({
        end_time: _.gt(last_date)
      }).orderBy('end_time', 'asc')
        .limit(10)
        .get()
        .then(function (res) {
          //console.log(res.data);
          that.setData({
            activities: res.data //把返回的数据放在activities中，然后通过activities去渲染页面
          });
        })
        .catch(function (err) {
          console.error(err);
        });
    }
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    template.tabbar("tabBar", 1, this);
    this.getActivities(0);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})