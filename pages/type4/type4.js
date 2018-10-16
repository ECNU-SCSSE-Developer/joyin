var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    org: {},
    dataInfo: {}
  },

  //点击进入发布者详情
  clickOrganizer: function () {
    var info = JSON.stringify(this.data.org._openid);
    wx.navigateTo({
      url: '/pages/personal1/personal1?info=' + info
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 把接收到的字符串转换成json对象
    var info = JSON.parse(options.info);
    console.log(info);
    this.setData({
      dataInfo: info
    });

    //请求发布者信息
    wx.cloud.callFunction({
      name: 'activityInfo',
      data: {
        act_id: that.data.dataInfo._id,
      },
      success: function (res) {
        //console.info("activityInfo")
        console.info(res.result)
        that.setData({
          org: res.result.publisher_info
        });
        console.info(that.data.org)
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

  },

  clickBack: function () {
    wx.navigateBack({
    })
  },


  //评价按钮
  comment: function () {
    console.info("点击评价按钮");
    var info = JSON.stringify(this.data.dataInfo._id);
    wx.navigateTo({
      url: '/pages/personal3/personal3?info' + info,
    })
  }
})