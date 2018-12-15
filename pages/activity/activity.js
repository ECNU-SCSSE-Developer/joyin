// pages/activity/activity.js
var template = require('../../template/template.js');
var time = require('../../utils/util.js');
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



  toInfo: function(e) {
    console.info(this.data.activities[e.currentTarget.dataset.name])

    var that = this;


    wx.cloud.callFunction({
      name: 'activityInfo',
      data: {
        act_id: that.data.activities[e.currentTarget.dataset.name]._id
      },
      success: function(res) {
        console.info(res.result)

        if (res.result.type == "favoriter") {
          var info = JSON.stringify(that.data.activities[e.currentTarget.dataset.name]);
          console.info("to favorite")
          wx.navigateTo({
            url: "../type1/type1?info=" + info
          })
        }

        if (res.result.type == "applyer") {
          var info = JSON.stringify(that.data.activities[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type2/type2?info=" + info
          })
        }

        if (res.result.type == "publisher") {
          var info = JSON.stringify(that.data.activities[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type3/type3?info=" + info
          })
        }

        if (res.result.type == "joiner") {
          var info = JSON.stringify(that.data.activities[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type4/type4?info=" + info
          })
        }

        if (res.result.type == "stranger") {
          var info = JSON.stringify(that.data.activities[e.currentTarget.dataset.name]);
          console.info("to stranger")
          wx.navigateTo({
            url: "../appointment3/appointment3?info=" + info
          })
        }

        if (res.result.type == "over") {
          var info = JSON.stringify(that.data.activities[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type5/type5?info=" + info
          })
        }

        if (res.result.type == "banner") {
          var info = JSON.stringify(that.data.activities[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type6/type6?info=" + info
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
    const place_type = e.target.dataset.me;
    this.getActivities(0, place_type, null);
    this.setData({
      activityType: '活动类型',
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
    const act_type = e.target.dataset.me
    this.getActivities(0, null, act_type);
    this.setData({
      area: '地点',
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
  getActivities: function(last_date, place_type, act_type) {
    var that = this;
    const db = wx.cloud.database();
    const _ = db.command;

    var getRequest = db.collection('activity').orderBy('end_time', 'asc');
    if(place_type != null) {
      getRequest = getRequest.where({
        place_type: place_type
      });
    }
    if(act_type != null) {
      getRequest = getRequest.where({
        activity_type: act_type
      });
    }
    if(last_date == 0) {
      getRequest = getRequest.where({
        end_time: _.gt(new Date().getTime()-1000*60*60*24)
      });
    } else {
      getRequest = getRequest.where({
        end_time: _.gt(last_date)
      });
    }
    getRequest.get().then(function(res) {
      that.handleData(res.data);
    }).catch(function(err) {
      console.error(err);
      return 1;
    })
    

  },

  //数据处理
  handleData: function(data) {
    for (var i = 0, len = data.length; i < len; i++) {
      data[i].start_time = time.formatTimeTwo(data[i].start_time)
      data[i].end_time = time.formatTimeTwo(data[i].end_time)
      if (data[i].info == "") {
        data[i].info = "无";
      }
    }
    this.setData({
      activities: data
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    template.tabbar("tabBar", 1, this);
    this.getActivities(0, null, null);

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