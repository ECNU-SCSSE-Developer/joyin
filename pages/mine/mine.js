// pages/mine/mine.js
var template = require('../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    my:[],
    list1: [],
    list2: [],
    list3: [],
    list4: []
  },

  showItems1: function (e){
    var that = this;
    wx.cloud.callFunction({
      name: 'myFavorited',
      data:{
        lastdate: 0
      },
      success: function (res) {
        console.log(res.result)
        that.setData({
          list1: res.result
        });
        if (that.data.list2.length == 0) {
          wx.showModal({
            content: '还没有参加的活动哦',
            showCancel: false,
            confirmColor: "#557d8a",
            confirmText: "知道啦",
          });
        }
      },
      fail: console.error
    });
    var open1 = that.data.open1;
    open1 = !open1;
    that.setData({
      open1 : open1
    });
  },
  showItems2: function (e) {
    var that = this;
    wx.cloud.callFunction({
      name: 'myApplyed',
      data: {
        lastdate: 0
      },
      success: function (res) {
        console.log(res.result)
        that.setData({
          list2: res.result
        });
        if (that.data.list2.length == 0){
          wx.showModal({
            content: '还没有报名的活动哦',
            showCancel: false,
            confirmColor: "#557d8a",
            confirmText: "知道啦",
          });
        }
      },
      fail: console.error
    });
    var open2 = that.data.open2;
    open2 = !open2;
    that.setData({
      open2: open2
    });
  },
  showItems3: function (e) {
    var that = this;
    wx.cloud.callFunction({
      name: 'myPublished',
      data: {
        lastdate: 0
      },
      success: function (res) {
        console.log(res.result)
        that.setData({
          list3: res.result
        });
        if (that.data.list3.length == 0) {
          wx.showModal({
            content: '还没有发布的活动哦',
            showCancel: false,
            confirmColor: "#557d8a",
            confirmText: "知道啦",
          });
        }
      },
      fail: console.error
    });
    var open3 = that.data.open3;
    open3 = !open3;
    that.setData({
      open3: open3
    });
  },
  showItems4: function (e) {
    var that = this;
    wx.cloud.callFunction({
      name: 'myJoined',
      data: {
        lastdate: 0
      },
      success: function (res) {
        console.log(res.result)
        that.setData({
          list4: res.result
        });
        if (that.data.list4.length == 0) {
          wx.showModal({
            content: '还没有参加的活动哦',
            showCancel: false,
            confirmColor: "#557d8a",
            confirmText: "知道啦",
          });
        }
      },
      fail: console.error
    });
    var open4 = that.data.open4;
    open4 = !open4;
    that.setData({
      open4: open4
    });
  },
  goToCalendar: function(){
    wx.navigateTo({
      url: '/pages/calendar/calendar',
    })
  },
  to1: function(e){
    console.info(e.currentTarget.dataset.name)
    // 把要传递的json对象转换成字符串
    var info = JSON.stringify(this.data.list1[e.currentTarget.dataset.name]);
    wx.navigateTo({
      url: "../type1/type1?info=" + info
    })
  },
  to2: function (e) {
    //console.info(e.currentTarget.dataset.name)
    // 把要传递的json对象转换成字符串
    var info = JSON.stringify(this.data.list2[e.currentTarget.dataset.name]);
    wx.navigateTo({
      url: "../type2/type2?info=" + info
    })
  },
  to3: function (e) {
    //console.info(e.currentTarget.dataset.name)
    // 把要传递的json对象转换成字符串
    var info = JSON.stringify(this.data.list3[e.currentTarget.dataset.name]);
    wx.navigateTo({
      url: "../type3/type3?info=" + info
    })
  },
  to4: function (e) {
    //console.info(e.currentTarget.dataset.name)
    // 把要传递的json对象转换成字符串
    var info = JSON.stringify(this.data.list4[e.currentTarget.dataset.name]);
    wx.navigateTo({
      url: "../type4/type4?info=" + info
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    template.tabbar("tabBar", 2, this);
    wx.cloud.callFunction({
      name: 'myInfo',
      success: function (res) {
        console.log(res.result)
        that.setData({
          my: res.result
        });
      },
      fail: console.error
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})