// pages/appointment1/appointment1.js
var startTime='';
var endTime='';
var placeType='';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    area:["中北","闵行","校外"],
    isAgree:false
  },
  showProtocol: function () {
    wx.showModal({
      content: 'xxx规定',
      showCancel: false,
      confirmColor: "#557d8a",
      confirmText: "知道啦",
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  bindAgreeChange: function (e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  bindStartTimeChange: function (e) {
    startTime = e.detail.value;
    this.setData({
      fStartTime: e.detail.value
    })
  },
  bindEndTimeChange: function (e) {
    endTime = e.detail.value;
    this.setData({
      fEndTime: e.detail.value 
    })
  },
  bindTypeChange: function (e) {
    if (e.detail.value == 0) {
      placeType = "中北";
    }
    if(e.detail.value==1){
      placeType = "闵行";
    }
    if (e.detail.value == 2) {
      placeType = "校外";
    }
  },
  clickBack: function(){
    wx.navigateBack({
    })
  },

  // 在数据库中添加活动
  addActivity: function (name, start_time, end_time, place_type, place, people_num, money, duration, info) {
    const db = wx.cloud.database()
    db.collection('activity').add({
      data: {
        name: name,
        start_time: new Date(start_time).getTime(),
        end_time: new Date(end_time).getTime(),
        place_type: place_type,
        place: place,
        people_num: people_num,
        money: money,
        duration: duration,
        info: info
      },
      complete: function (res) {
        console.log(res)
        wx.showModal({//成功发布时弹出的提示框
          content: '发布成功',
          showCancel: false,
          confirmColor: "#557d8a",
          confirmText: "确定",
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
      }
    })
  },

  //表单提交时触发的函数，调用addActivity函数
  formSubmit: function (e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let { name, place, people_num, money, duration, info } = e.detail.value;
    let start_time = startTime;
    let end_time = endTime;
    let place_type = placeType;
    //console.log(place_type);
    this.addActivity(name, start_time, end_time, place_type, place, people_num, money, duration, info);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // this.addActivity('狼人杀', '2018-9-27', '2018-9-28', '中北', '华东师范大学中山北路', 6, 2500, 2000, '测试1')
    // this.addActivity('狼人杀', '2018-9-28', '2018-9-29', '中北', '华东师范大学中山北路', 6, 2500, 2000, '测试2')
    // this.addActivity('狼人杀', '2018-9-29', '2018-9-30', '中北', '华东师范大学中山北路', 6, 2500, 2000, '测试3')
    //console.log(new Date('2018-9-27').getTime())
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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