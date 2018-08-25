// pages/calendar/calendar.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*当同时有多个事件在同一天时，使用类似渐变色*/
    days_style: [{
      month: 'current',
      day: 11,
      color: 'white',
      background: 'radial-gradient(#ff2366 50%, #2f97fc 50%);'
    },{
        month: 'current',
        day: 10,
        color: 'white',
        background: 'radial-gradient( #ff2366 , #7ed321 , #face15, #2f97fc );'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  back: function() {
    wx.navigateBack({

    })
  },
  onLoad: function(options) {

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