// pages/appointment1/appointment1.js
const date = new Date()
const years = []
const months = []
const days = []
const hours = []
const minutes = []
for (let i = 2018; i <= 2020; i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}

for (let i = 0; i <= 23; i++) {
  hours.push(i)
}

for (let i = 0; i <= 59; i++) {
  minutes.push(i)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 1,
    hours: hours,
    hour: 1,
    minutes: minutes,
    minute: 1,
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
  bindChange: function(e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      hour: this.data.hours[val[3]],
      minute: this.data.minutes[val[4]]
    })
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
        start_time: new Date(start_time),
        end_time: new Date(end_time),
        palce_type: place_type,
        palce: place,
        people_num: people_num,
        money: money,
        duration: duration,
        info: info
      },
      complete: function (res) {
        console.log(res)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //this.addActivity('狼人杀', '2018-9-27', '2018-9-28', '中北', '华东师范大学中山北路', 6, 2500, 2000, '测试')
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