// pages/mine/mine.js
var template = require('../../template/template.js');
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    open1: false,
    open2: false,
    open3: false,
    open4: false,
    open5: false,
    my:[],
    list1: [],
    list2: [],
    list3: [],
    list4: [],
    list5: []
  },


  toMyInfo: function(){
    var info = JSON.stringify(this.data.my._openid);
    var join = JSON.stringify("1")
    wx.navigateTo({
      url: '/pages/personal1/personal1?info=' + info + '&join=' + join
    })
  },
  showItems1: function (e){
    var that = this;
    wx.cloud.callFunction({
      name: 'myFavorited',
      data:{
        lastdate: 0
      },
      success: function (res) {
        console.log(res.result)
        //时间戳转化
        for (var i = 0, len = res.result.length; i < len; i++) {
          //console.info(time.formatTimeTwo(res.result[i].end_time))
          res.result[i].start_time = time.formatTimeTwo(res.result[i].start_time)
          res.result[i].end_time = time.formatTimeTwo(res.result[i].end_time)
          //console.info(res.result[i].end_time)
          if (res.result[i].info == "") {
            res.result[i].info = "无";
          }
        }
        that.setData({
          list1: res.result
        });
        if (that.data.list1.length == 0) {
          wx.showModal({
            content: '还没有收藏的活动哦',
            showCancel: false,
            confirmColor: "#557d8a",
            confirmText: "知道啦",
          });
        }
      },
      fail: console.error
    });
    var open1 = that.data.open1;
    open1 = !open1;
    that.setData({
      open1 : open1
    });
  },
  showItems2: function (e) {
    var that = this;
    wx.cloud.callFunction({
      name: 'myApplyed',
      data: {
        lastdate: 0
      },
      success: function (res) {
        console.log(res.result)
        //时间戳转化
        for (var i = 0, len = res.result.length; i < len; i++) {
          //console.info(time.formatTimeTwo(res.result[i].end_time))
          res.result[i].start_time = time.formatTimeTwo(res.result[i].start_time)
          res.result[i].end_time = time.formatTimeTwo(res.result[i].end_time)
          //console.info(res.result[i].end_time)
          if (res.result[i].info == "") {
            res.result[i].info = "无";
          }
        }
        that.setData({
          list2: res.result
        });
        if (that.data.list2.length == 0){
          wx.showModal({
            content: '还没有报名的活动哦',
            showCancel: false,
            confirmColor: "#557d8a",
            confirmText: "知道啦",
          });
        }
      },
      fail: console.error
    });
    var open2 = that.data.open2;
    open2 = !open2;
    that.setData({
      open2: open2
    });
  },
  showItems3: function (e) {
    var that = this;
    wx.cloud.callFunction({
      name: 'myPublished',
      data: {
        lastdate: 0
      },
      success: function (res) {
        console.log(res.result)
        //时间戳转化
        for (var i = 0, len = res.result.length; i < len; i++) {
          //console.info(time.formatTimeTwo(res.result[i].end_time))
          res.result[i].start_time = time.formatTimeTwo(res.result[i].start_time)
          res.result[i].end_time = time.formatTimeTwo(res.result[i].end_time)
          //console.info(res.result[i].end_time)
          if (res.result[i].info == "") {
            res.result[i].info = "无";
          }
        }
        that.setData({
          list3: res.result
        });
        if (that.data.list3.length == 0) {
          wx.showModal({
            content: '还没有发布的活动哦',
            showCancel: false,
            confirmColor: "#557d8a",
            confirmText: "知道啦",
          });
        }
      },
      fail: console.error
    });
    var open3 = that.data.open3;
    open3 = !open3;
    that.setData({
      open3: open3
    });
  },
  showItems4: function (e) {
    var that = this;
    wx.cloud.callFunction({
      name: 'myJoined',
      data: {
        lastdate: 0
      },
      success: function (res) {
        console.log(res.result)
        //时间戳转化
        for (var i = 0, len = res.result.length; i < len; i++) {
          //console.info(time.formatTimeTwo(res.result[i].end_time))
          res.result[i].start_time = time.formatTimeTwo(res.result[i].start_time)
          res.result[i].end_time = time.formatTimeTwo(res.result[i].end_time)
          //console.info(res.result[i].end_time)
          if (res.result[i].info == "") {
            res.result[i].info = "无";
          }
        }
        that.setData({
          list4: res.result
        });
        if (that.data.list4.length == 0) {
          wx.showModal({
            content: '还没有参加的活动哦',
            showCancel: false,
            confirmColor: "#557d8a",
            confirmText: "知道啦",
          });
        }
      },
      fail: console.error
    });
    var open4 = that.data.open4;
    open4 = !open4;
    that.setData({
      open4: open4
    });
  },
  showItems5: function (e) {
    var that = this;
    /*wx.cloud.callFunction({
      name: 'xxx',
      data: {
        lastdate: 0
      },
      success: function (res) {
        console.log(res.result)
        //时间戳转化
        for (var i = 0, len = res.result.length; i < len; i++) {
          //console.info(time.formatTimeTwo(res.result[i].end_time))
          res.result[i].start_time = time.formatTimeTwo(res.result[i].start_time)
          res.result[i].end_time = time.formatTimeTwo(res.result[i].end_time)
          //console.info(res.result[i].end_time)
          if (res.result[i].info == "") {
            res.result[i].info = "无";
          }
        }
        that.setData({
          list5: res.result
        });
        if (that.data.list5.length == 0) {
          wx.showModal({
            content: '还没有评价的活动哦',
            showCancel: false,
            confirmColor: "#557d8a",
            confirmText: "知道啦",
          });
        }
      },
      fail: console.error
    });*/
    var open5 = that.data.open5;
    open5 = !open5;
    that.setData({
      open5: open5
    });
  },
  goToCalendar: function(){
    wx.navigateTo({
      url: '/pages/calendar/calendar',
    })
  },
  to1: function(e){
    console.info(e.currentTarget.dataset.name)
    // 把要传递的json对象转换成字符串
    var info = JSON.stringify(this.data.list1[e.currentTarget.dataset.name]);
    wx.navigateTo({
      url: "../type1/type1?info=" + info
    })
  },
  to2: function (e) {
    var that = this;
    wx.cloud.callFunction({
      name: 'activityInfo',
      data: {
        act_id: that.data.list2[e.currentTarget.dataset.name]._id
      },
      success: function (res) {
        console.info(res.result)

        if (res.result.type == "favoriter") {
          var info = JSON.stringify(that.data.list2[e.currentTarget.dataset.name]);
          console.info("to favorite")
          wx.navigateTo({
            url: "../type1/type1?info=" + info
          })
        }

        if (res.result.type == "applyer") {
          var info = JSON.stringify(that.data.list2[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type2/type2?info=" + info
          })
        }

        if (res.result.type == "publisher") {
          var info = JSON.stringify(that.data.list2[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type3/type3?info=" + info
          })
        }

        if (res.result.type == "joiner") {
          var info = JSON.stringify(that.data.list2[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type4/type4?info=" + info
          })
        }

        if (res.result.type == "stranger") {
          var info = JSON.stringify(that.data.list2[e.currentTarget.dataset.name]);
          console.info("to stranger")
          wx.navigateTo({
            url: "../appointment3/appointment3?info=" + info
          })
        }

        if (res.result.type == "over") {
          var info = JSON.stringify(that.data.list2[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type5/type5?info=" + info
          })
        }

        if (res.result.type == "banner") {
          var info = JSON.stringify(that.data.list2[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type6/type6?info=" + info
          })
        }

      },
      fail: console.error
    });
  },
  to3: function (e) {
    //console.info(e.currentTarget.dataset.name)
    // 把要传递的json对象转换成字符串
    console.info(this.data.list3[e.currentTarget.dataset.name]);
    var info = JSON.stringify(this.data.list3[e.currentTarget.dataset.name]);
    wx.navigateTo({
      url: "../type3/type3?info=" + info
    })
  },
  to4: function (e) {
    //console.info(e.currentTarget.dataset.name)
    // 把要传递的json对象转换成字符串
    var info = JSON.stringify(this.data.list4[e.currentTarget.dataset.name]);
    wx.navigateTo({
      url: "../type4/type4?info=" + info
    })
  },
  to5: function (e) {
    //console.info(e.currentTarget.dataset.name)
    // 把要传递的json对象转换成字符串
    var info = JSON.stringify(this.data.list5[e.currentTarget.dataset.name]);
    wx.navigateTo({
      url: "../type5/type5?info=" + info
    })
  },
  conn: function(){
    wx.showModal({
      content: '        非常抱歉哟~由于目前小程序暂未开发出客服功能，如有疑问、建议或投诉，请添加酌盈君微信dcy1225848868或拨打13648484307，我们将第一时间为您解决。',
      showCancel: false,
      confirmColor: "#557d8a",
      confirmText: "知道啦",
    });
  },
  help: function(){
    wx.showModal({
      content: "        目前小程序仅支持华东师范大学学生使用。\n        你可以在这里发布邀约或参与他人邀约，如果参与他人邀约，需等待发布者选择同意或拒绝。为了妥善保护用户隐私，只有在发布者点击同意后，你才可以看见TA的手机号码获得具体联系方式哦~\n\n特别提醒：\n1.由于小程序规则限制，用户需自行点进活动页面实时查看自己发布的活动是否有人报名/所报活动的发布者是否已同意或拒绝。\n2.完成邀约后不要忘记给对方填写评价哦～（请勿恶意差评，违者一经核实注销账号。）",
      showCancel: false,
      confirmColor: "#557d8a",
      confirmText: "知道啦",
    });
  },
  about: function(){
    wx.showModal({
      content: '        我们是来自华东师范大学2016级的学生创业团队，有一天负责人作为追星狗突然觉得每次去演唱会都找不到人非常烦恼，所以一群人说干就干有了今天的酌盈。希望它能帮助大家天冷有人陪吃饭，天热有人陪跑步，清晨有人陪学习，深夜有人陪电影^_^',
      showCancel: false,
      confirmColor: "#557d8a",
      confirmText: "知道啦",
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    template.tabbar("tabBar", 2, this);
    wx.cloud.callFunction({
      name: 'myInfo',
      success: function (res) {
        //console.log(res.result)
        that.setData({
          my: res.result
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