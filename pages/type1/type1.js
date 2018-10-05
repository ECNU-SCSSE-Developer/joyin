
Page({

  /**
   * 页面的初始数据
   */
  data: {
    org: {
      name: "名字",
      grade: "16级",
      area: "中北",
      img: "xxx",
      sex: 1
    },
    dataInfo: {}
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
        console.log(res)
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.cloud.callFunction({
    //   name: 'myActivity',
    //   data: {},
    //   success: function(res) {
    //     console.log("云函数")
    //     console.log(res.result)
    //   },
    //   fail: function(res) {
    //     console.log(res.errMsg)
    //   }
    // })

    // this.addJoin("W7HPBN2AWotkUTBh")
    // this.addJoin("W7HVI92AWotkUT6d")
    // this.addJoin("W7HVLp25dhqgAKDO")

    // 把接收到的字符串转换成json对象
    var info = JSON.parse(options.info);
    console.log(info);
    this.setData({
      dataInfo: info
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
    this.addJoin();
  },
})