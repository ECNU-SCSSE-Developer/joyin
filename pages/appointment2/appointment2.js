// pages/appointment1/appointment1.js
var startTime = '';
var endTime = '';
var placeType = '中北';
var activityType = "学习";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rules: "1.活动时间请填写邀约当天的时间(小例子：如果你想看12.31的电影，请填写20xx年12月31日)\n2.报名截止时间请填写最晚接受他人报名的时间。(小例子：如果你觉得12.30都没有人报名就不想约了，请填写20xx年12月30日。此后这个活动将不会在邀约页面显示)\n3.由于小程序不具备留言及回复功能，请务必将邀约信息填写清楚，以免他人产生疑惑而停下报名的手。(小例子：如果你想看12.31的电影，请在具体信息里写明你当天有空的时间)\n4.请务必诚信邀约，杜绝无故爽约行为，若遭到投诉，核实为真后将注销失信用户。",
    casArray: ["中北", "闵行", "校外"],
    casIndex: 0,
    actTypeArray: ["学习", "娱乐", "出游", "竞赛组队", "其他"],
    actIndex: 0,
    isAgree: false
  },
  showProtocol: function() {
    wx.showModal({
      content: this.data.rules,
      showCancel: false,
      confirmColor: "#557d8a",
      confirmText: "知道啦",
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  },
  bindAgreeChange: function(e) {
    this.setData({
      isAgree: !!e.detail.value.length
    });
  },
  bindStartTimeChange: function(e) {
    startTime = e.detail.value;
    this.setData({
      fStartTime: e.detail.value
    })
  },
  bindEndTimeChange: function(e) {
    endTime = e.detail.value;
    this.setData({
      fEndTime: e.detail.value
    })
  },
  bindCasPickerChange: function(e) {
    if (e.detail.value == 0) {
      placeType = "中北";
      this.setData({
        casIndex: 0
      })
    }
    if (e.detail.value == 1) {
      placeType = "闵行";
      this.setData({
        casIndex: 1
      })
    }
    if (e.detail.value == 2) {
      placeType = "校外";
      this.setData({
        casIndex: 2
      })
    }
  },
  bindActTypePickerChange: function(e) {
    if (e.detail.value == 0) {
      activityType = "学习";
      this.setData({
        actIndex: 0
      })
    }
    if (e.detail.value == 1) {
      activityType = "娱乐";
      this.setData({
        actIndex: 1
      })
    }
    if (e.detail.value == 2) {
      activityType = "出游";
      this.setData({
        actIndex: 2
      })
    }
    if (e.detail.value == 3) {
      activityType = "竞赛组队";
      this.setData({
        actIndex: 3
      })
    }
    if (e.detail.value == 4) {
      activityType = "其他";
      this.setData({
        actIndex: 4
      })
    }
  },
  clickBack: function() {
    wx.navigateBack({})
  },

  // 在数据库中添加活动
  addActivity: function(name, start_time, end_time, place_type, activity_type, place, people_num, money, duration, info) {
    const db = wx.cloud.database()
    db.collection('activity').add({
      data: {
        name: name,
        start_time: new Date(start_time).getTime(),
        end_time: new Date(end_time).getTime(),
        place_type: place_type,
        activity_type: activity_type,
        place: place,
        people_num: people_num,
        money: money,
        duration: duration,
        info: info
      },
      complete: function(res) {
        console.log(res)
        wx.showModal({ //成功发布时弹出的提示框
          content: '发布成功',
          showCancel: false,
          confirmColor: "#557d8a",
          confirmText: "确定",
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.redirectTo({
                url: '/pages/activity/activity'
              })
            }
          }
        });
      }
    })
  },

  //表单提交时触发的函数，调用addActivity函数
  formSubmit: function(e) {
    //console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let {
      name,
      place,
      people_num,
      money,
      duration,
      info
    } = e.detail.value;
    let start_time = startTime;
    let end_time = endTime;
    let place_type = placeType;
    let activity_type = activityType;
    //console.log(place_type);
    if (this.data.isAgree == false) {
      wx.showModal({
        content: '要先阅读填写须知哦！',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: "知道啦",
      });
    } else if (e.detail.value.name.length == 0) {
      wx.showModal({
        content: '邀约主题不能为空！',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: "知道啦",
      });
    } else if (start_time == 0) {
      wx.showModal({
        content: '活动时间不能为空！',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: "知道啦",
      });
    } else if (new Date(start_time) <= new Date(new Date().toLocaleDateString()).getTime()) { //后者返回当日零点时间
      wx.showModal({
        content: '活动时间不能为过去时间！',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: "知道啦",
      });
    } else if (end_time == 0) {
      wx.showModal({
        content: '报名截止时间不能为空！',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: "知道啦",
      });
    } else if (new Date(end_time) <= new Date(new Date().toLocaleDateString()).getTime()) { //后者返回当日零点时间
      wx.showModal({
        content: '截止时间不能为过去时间！',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: "知道啦",
      });
    } else if (new Date(end_time) > new Date(start_time)) {
      wx.showModal({
        content: '截止时间不能晚于开始时间！',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: "知道啦",
      });
    } else if (e.detail.value.place.length == 0) {
      wx.showModal({
        content: '邀约地点不能为空！',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: "知道啦",
      });
    } else if (e.detail.value.people_num.length == 0) {
      wx.showModal({
        content: '所需人数不能为空！',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: "知道啦",
      });
    } else if (e.detail.value.money.length == 0) {
      wx.showModal({
        content: '预计人均开销不能为空！',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: "知道啦",
      });
    } else if (e.detail.value.duration.length == 0) {
      wx.showModal({
        content: '预计活动时长不能为空！',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: "知道啦",
      });
    } else {
      this.addActivity(name, start_time, end_time, place_type, activity_type, place, people_num, money, duration, info);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //console.log(new Date('2018-9-27').getTime())
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