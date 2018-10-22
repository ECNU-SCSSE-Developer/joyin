
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

  //同意申请 参数act_id,acc_id 申请者的id,max_num 活动人数  若参加人数已满会返回false
  agreeApply: function (act_id,acc_id,max_num) {
    const db = wx.cloud.database();
    db.collection('join').where({
      act_id: act_id,
      is_reply: true,
      is_agree: true
    }).count()
    .then(function(res){
      if(res.total >= max_num){
        return false;
      }
    })
    .catch(function(err){
      return err;
    });
    wx.cloud.callFunction({
      name: 'agreeApply',
      data: {
        openid: acc_id,
        act_id: act_id
      }
    }).then(function(res){
      return true;
    }).catch(function(err){
      console.log(err);
      return err;
    })
  },

  //拒绝申请 参数act_id,acc_id 申请者的id
  refuseApply: function (act_id, acc_id) {
    wx.cloud.callFunction({
      name: 'refuseApply',
      data: {
        openid: acc_id,
        act_id: act_id
      }
    }).then(function (res) {
      return true;
    }).catch(function (err) {
      console.log(err);
      return err;
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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

  //取消按钮
  cancel: function () {
    console.info("点击取消按钮")
  },
})