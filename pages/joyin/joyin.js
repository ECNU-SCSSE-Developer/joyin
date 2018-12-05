// pages/joyin/joyin.js
var template = require('../../template/template.js');
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageSrc:'/image/joyin.png',
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    myList: [],
    waitList: []
  },

  //等你加入
  waitYouActivity: function(last_date){
    var that = this;
    const db = wx.cloud.database();
    const _ = db.command;
    if(last_date == 0){
      db.collection('activity').where({
        end_time: _.gt(new Date().getTime())
      }).orderBy('end_time', 'asc')
      .limit(10)
      .get()
      .then(function(res) {
        //console.info(res.data)
        //时间戳转化
        for (var i = 0, len = res.data.length; i < len; i++) {
          //console.info(time.formatTimeTwo(res.data[i].end_time))
          res.data[i].start_time = time.formatTimeTwo(res.data[i].start_time)
          res.data[i].end_time = time.formatTimeTwo(res.data[i].end_time)
          //console.info(res.data[i].end_time)
          if (res.data[i].info == "") {
            res.data[i].info = "无";
          }
        }
        that.setData({
          waitList: res.data
        });
      })
      .catch(function(err) {
        console.error(err);
      });
    }else{
      db.collection('activity').where({
        end_time: _.gt(last_date)
      }).orderBy('end_time', 'asc')
        .limit(10)
        .get()
        .then(function (res) {
          //console.info(res.data)
          //时间戳转化
          for (var i = 0, len = res.data.length; i < len; i++) {
            //console.info(time.formatTimeTwo(res.data[i].end_time))
            res.data[i].start_time = time.formatTimeTwo(res.data[i].start_time)
            res.data[i].end_time = time.formatTimeTwo(res.data[i].end_time)
            //console.info(res.data[i].end_time)
            if (res.data[i].info == "") {
              res.data[i].info = "无";
            }
          }
          that.setData({
            waitList: res.data
          });
        })
        .catch(function (err) {
          console.error(err);
        });
    }
    
  },

  toInfo1: function (e) {
    console.info(e.currentTarget.dataset.name)
    // 把要传递的json对象转换成字符串
    var info = JSON.stringify(this.data.myList[e.currentTarget.dataset.name]);

    if (this.data.myList[e.currentTarget.dataset.name].type == "已收藏")
    wx.navigateTo({
      url: "../type1/type1?info=" + info
    })
    if (this.data.myList[e.currentTarget.dataset.name].type == "已报名")
      wx.navigateTo({
        url: "../type2/type2?info=" + info
      })
    if (this.data.myList[e.currentTarget.dataset.name].type == "已发布")
      wx.navigateTo({
        url: "../type3/type3?info=" + info
      })
    if (this.data.myList[e.currentTarget.dataset.name].type == "已确认")
      wx.navigateTo({
        url: "../type4/type4?info=" + info
      })
      
  },

  toInfo2: function (e) {
    //console.info(this.data.waitList[e.currentTarget.dataset.name])

    var that = this;


    wx.cloud.callFunction({
      name: 'activityInfo',
      data: {
        act_id: that.data.waitList[e.currentTarget.dataset.name]._id
      },
      success: function (res) {
        //console.info(res.result)

        if (res.result.type == "favoriter") {
          var info = JSON.stringify(that.data.waitList[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type1/type1?info=" + info
          })
        }

        if (res.result.type == "applyer") {
          var info = JSON.stringify(that.data.waitList[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type2/type2?info=" + info
          })
        }

        if (res.result.type == "publisher") {
          var info = JSON.stringify(that.data.waitList[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type3/type3?info=" + info
          })
        }

        if (res.result.type == "joiner") {
          var info = JSON.stringify(that.data.waitList[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type4/type4?info=" + info
          })
        }

        if (res.result.type == "stranger") {
          var info = JSON.stringify(that.data.waitList[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../appointment3/appointment3?info=" + info
          })
        }

        if (res.result.type == "over") {
          var info = JSON.stringify(that.data.waitList[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type5/type5?info=" + info
          })
        }

        if (res.result.type == "banner") {
          var info = JSON.stringify(that.data.waitList[e.currentTarget.dataset.name]);
          wx.navigateTo({
            url: "../type6/type6?info=" + info
          })
        }

      },
      fail: console.error
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    template.tabbar("tabBar", 0, this)//0表示第一个tabbar
    
    //获取等你加入
    this.waitYouActivity(0);
    
    //获取我的邀约
    wx.cloud.callFunction({
      name: 'myActivity',
      success: function (res) {
        //console.log(res.result)
        //时间戳转化
        for (var i = 0, len = res.result.length; i < len; i++) {
          res.result[i].start_time = time.formatTimeTwo(res.result[i].start_time)
          res.result[i].end_time = time.formatTimeTwo(res.result[i].end_time)
          if (res.result[i].info == "") {
            res.result[i].info = "无";
          }
        }
        that.setData({
          myList: res.result
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
  
  },

  toastmyapp:function(event) {
    wx.navigateTo({
      url: '../mine/mine',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  },

  toastapp: function (event) {
    wx.navigateTo({
      url: '../activity/activity',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  }
})