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
    }
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