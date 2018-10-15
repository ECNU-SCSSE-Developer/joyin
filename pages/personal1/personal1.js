// pages/personal1/personal1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    star: 5,
    sex: "男",
    grade:"16级",
    area:"中北",
    phoneNumber:"12345678945",
    times:"10",
    openid:0,
    acc:{},
    comments:{}
  },

  clickBack: function () {
    wx.navigateBack({
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
      openid: info
    });

    //需要一个传openid然后返回这个账户信息的云函数

    //请求评价信息，写入comments
    wx.cloud.callFunction({
      name: 'myOpinion',
      data: {
        openid: that.data.openid,
      },
      success: function (res) {
        console.info("comments")
        console.info(res.result)
        that.setData({
          comments: res.result
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