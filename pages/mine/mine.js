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
    list1: [{
      title: '狼人杀1',
      place: '闵行',
      date: '2018年12月3日',
      image: '',
    }, {
      title: '三国杀',
      place: '中北',
      date: '2018年12月3日',
      image: '',
    }],
    list2: [{
      title: '狼人杀2',
      place: '闵行',
      date: '2018年12月3日',
      image: '',
    }, {
      title: '三国杀',
      place: '中北',
      date: '2018年12月3日',
      image: '',
    }],
    list3: [{
      title: '狼人杀3',
      place: '闵行',
      date: '2018年12月3日',
      image: '',
    }, {
      title: '三国杀',
      place: '中北',
      date: '2018年12月3日',
      image: '',
    }],
    list4: [{
      title: '狼人杀4',
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

  showItems1: function (e){

    var open1 = this.data.open1;
    open1 = !open1;
    this.setData({
      open1 : open1
    });
  },
  showItems2: function (e) {

    var open2 = this.data.open2;
    open2 = !open2;
    this.setData({
      open2: open2
    });
  },
  showItems3: function (e) {

    var open3 = this.data.open3;
    open3 = !open3;
    this.setData({
      open3: open3
    });
  },
  showItems4: function (e) {

    var open4 = this.data.open4;
    open4 = !open4;
    this.setData({
      open4: open4
    });
  },
  goToCalendar: function(){
    wx.navigateTo({
      url: '/pages/calendar/calendar',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    template.tabbar("tabBar", 2, this)
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