// pages/joyin/joyin.js
var template = require('../../template/template.js');
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
        console.info(res.data)
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
          console.info(res.data)
          that.setData({
            waitList: res.data
          });
        })
        .catch(function (err) {
          console.error(err);
        });
    }
    
  },

  toInfo: function (e) {
    console.info(e.currentTarget.dataset.name)
    // 把要传递的json对象转换成字符串
    var info = JSON.stringify(this.data.waitList[e.currentTarget.dataset.name]);
    wx.navigateTo({
      url: "../appointment3/appointment3?info=" + info
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    template.tabbar("tabBar", 0, this)//0表示第一个tabbar
    
    //获取等你加入
    this.waitYouActivity(0);
  /*  
    //获取我的邀约
    wx.cloud.callFunction({
      name: 'myActivity',
      data:{
        applyed_count: 2,
      },
      success: function (res) {
        console.log(res.result)
        that.setData({
          myList: res.result
        });
      },
      fail: console.error
    });
*/
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