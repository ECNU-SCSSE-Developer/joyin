// pages/personal3/personal3.js
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*绑定第一个卡片上的数据 */
    activity:{},
    /* 绑定第二个卡片上的数据*/
    org:{},
    one_1: '',
    two_1: '',
    one_2: 0, //这个为实际给的星星
    two_2: 5
  },

  //打星
  giveStar: function (e) {
    var give = e.currentTarget.dataset.in;
    var one_2;
    if (give === 'use_sc2') {
      one_2 = Number(e.currentTarget.id);
    } else {
      one_2 = Number(e.currentTarget.id) + this.data.one_2;
    }
    this.setData({
      one_2: one_2,
      two_2: 5 - one_2
    })
    console.info(one_2)
  },

  //添加评价  参数act_id活动id，star星星数，info评价文字，publisher_id这个活动发布者id
  addOpinion: function (act_id, star, info, publisher_id) {
    const db = wx.cloud.database()
    db.collection('opinion').add({
      data: {
        act_id: act_id,
        star: star,
        info: info,
        publisher_id: publisher_id,
        time: new Date().getTime()
      },
      complete: function (res) {
        console.log(res)
      }
    })
  },

  //点击提交按钮
  formSubmit: function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let { info } = e.detail.value;
    this.addOpinion( this.activity._id,this.data.one_2, info, this.activity._openid);
  },

  //添加评价  参数act_id活动id，star星星数，info评价文字，publisher_id这个活动发布者id
  addOpinion: function (act_id, star, info, publisher_id) {
    const db = wx.cloud.database()
    db.collection('opinion').add({
      data: {
        act_id: act_id,
        star: star,
        info: info,
        publisher_id: publisher_id,
        time: new Date().getTime()
      },
      complete: function (res) {
        wx.showModal({//成功发布时弹出的提示框
          content: '发布成功',
          showCancel: false,
          confirmColor: "#557d8a",
          confirmText: "确定",
          success: function (res) {
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    // 把接收到的字符串转换成json对象
    var info = JSON.parse(options.info);
    console.log(info);
    this.setData({
      activity: info
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
  
  }
})