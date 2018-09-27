// pages/joyin/joyin.js
var template = require('../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc:'/image/joyin.png',
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    myList: [{
      title: '狼人杀',
      place: '闵行',
      date: '2018年12月3日',
      image: '',
      condition: 1,
    }, {
      title: '三国杀',
      place: '中北',
      date: '2018年12月3日',
      image: '',
      condition: 2,
    }],
    waitList: [{
      title: '狼人杀',
      place: '闵行',
      date: '2018年12月3日',
      image: '',
    }, {
      title: '三国杀',
      place: '中北',
      date: '2018年12月3日',
      image: '',
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 0, this)//0表示第一个tabbar
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
  
  },

  toastmyapp:function(event) {
    wx.navigateTo({
      url: '../mine/mine',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },

  toastapp: function (event) {
    wx.navigateTo({
      url: '../activity/activity',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  }
})