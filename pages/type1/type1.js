
Page({

  /**
   * 页面的初始数据
   */
  data: {
    org: {},
    dataInfo: {},
    signClick: false
  },

  //点击进入发布者详情
  clickOrganizer: function () {
    var info = JSON.stringify(this.data.org._openid);
    wx.navigateTo({
      url: '/pages/personal1/personal1?info=' + info
    })
  },

  // 报名
  addJoin: function (act_id) {
    const db = wx.cloud.database()
    db.collection('join').add({
      data: {
        act_id: act_id,
        is_reply: false,
        is_agree: false,
        is_opinion: false,
      },
      complete: function (res) {
        wx.showToast({
          title: '报名成功',
          icon: 'success',
          duration: 1000
        });
        console.log(res)
      },
    })
  },

  //取消收藏
  cancel: function(){
    var that = this;

    wx.cloud.callFunction({
      name: 'cancelFavorite',
      data: {
        act_id: that.data.dataInfo._id,
      },
      success: function (res) {
        console.info("success")
        wx.showModal({
          content: '取消成功',
          showCancel: false,
          confirmColor: "#557d8a",
          confirmText: "知道啦",
          success: function (res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '/pages/mine/mine'
              })
            }
          }
        });
        
      },
      fail: console.error
    });
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

  //报名按钮，调用addJoin函数
  signUp: function () {
    var act_id = this.data.dataInfo._id;
    this.addJoin(act_id);
    this.setData({
      signClick: true
    });
  },
})