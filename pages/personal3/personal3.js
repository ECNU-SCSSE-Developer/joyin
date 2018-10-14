// pages/personal3/personal3.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*绑定第一个卡片上的数据 */
    activity:{
      title:"三国杀",
      place:"中北",
      date:"2018年8月20日",
      img:"xxx"
    },
    /* 绑定第二个卡片上的数据*/
    organizer:{
      img:"/image/actDemo.png",
      sex:2,/*1为男2为女 */
      name:"名字",
      grade:"16级",
      area:"中北"
    },
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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