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

  //获得账户信息  参数openid
  accountInfo: function (openid) {
    var that = this;
    const db = wx.cloud.database();
    db.collection('account').where({
      _openid: openid
    })
    .get()
    .then(function(res){
      that.setData({
        acc: res.data.shift()
      });
    })
    .catch(function(err){
      console.log(err);
    })
  },

  //获得账户评价 参数openid
  accountOpinion: function (openid) {
    const db = wx.cloud.database();
    var account_opinion = [];

    const opinion = db.collection('opinion').where({
      publisher_id: openid,
    });
    
    opinion.count().then(function(res){
      const opinion_count = res.total;
    }).catch(function(err){
      console.log(err);
    });

    if (opinion_count > 0) {
      opinion.orderBy('time', 'desc').get().then(function(res){
        const opinions = res.data;
      }).catch(function(err){
        console.log(err);
      });
      opinions.data.forEach(function (item) {
        console.log(item);
        account_opinion.push(item);
      });
    }

    return account_opinion;
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

    //请求账户信息
    console.info("传入的openid:", that.data.openid)
    this.accountInfo(that.data.openid)
    
    //请求评价信息，写入comments
    wx.cloud.callFunction({
      name: 'myOpinion',
      data: {
        openid: that.data.openid,
      },
      success: function (res) {
        //console.info("comments")
        //console.info(res.result)
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