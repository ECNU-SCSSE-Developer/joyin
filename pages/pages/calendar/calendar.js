// pages/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my:[],
    days_style: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  back: function() {
    wx.navigateBack({

    })
  },
  onLoad: function(options) {
    var that = this;
    wx.cloud.callFunction({
      name: 'myCalendar',
      success: function (res) {
        that.setData({
          my: res.result,
        });
      },
      fail: console.error
    });
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this
    for (var i = 0; i < that.data.my.length; i++) {
      var month = 'days_style[' + i + '].month'
      var day = 'days_style[' + i + '].day'
      var color = 'days_style[' + i + '].color'
      var background = 'days_style[' + i + '].background'
      that.setData({
        [month]: "current",
        [day]: new Date(that.data.my[i].start_time).getDate(),
        [color]: "white",
        [background]: "#ff2366"
      })
    }
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