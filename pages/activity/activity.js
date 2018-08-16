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
    activities: [{
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
    }]
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    template.tabbar("tabBar", 1, this)
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