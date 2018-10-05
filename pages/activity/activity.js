// pages/activity/activity.js
var template = require('../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectAreaH: true,
    areaList: false,
    area: '地点',
    selectTypeH: true,
    typeList: false,
    activityType: '活动类型',
    activities: [] //一开始是空的
  },

  getData: function() {
    var that = this;
    wx.request({
      url: 'xxx', //需要问后端
      data: {
        //发送给后台的参数，如id之类的，需问后端要什么参数
      },
      header: { //请求头，不是必须的，默认就是下面这种，返回json数据
        "Content-Type": "applciation/json"
      },
      method: "GET", //同样也不是必须的，默认为GET
      //以下是关键
      //当后端成功返回数据时执行success，否则执行fail
      success: function(res) {
        console.log(res.data); //意思是在控制台输出返回的数据，这句是用来看返回数据长什么样的，不加也没事，一般都加一下看看成功没有
        that.setData({
          activities: res.data.result //把返回的数据放在activities中，然后通过activities去渲染页面
        })
      },
      fail: function(err) {
        that.setData({//在fail里加上这句，万一返回失败了，至少activities里还有数据
            activities: [{
              title: '数据请求失败',
              place: 'null',
              date: 'null',
              image: '',
              condition: 0,
            }]
          }
        )
      },
    })
  },

  clickPlace: function() {
    var selectAreaH = this.data.selectAreaH;
    if (selectAreaH == true) {
      this.setData({
        areaList: true,
        selectAreaH: false,
      })
    } else {
      this.setData({
        areaList: false,
        selectAreaH: true,
      })
    }
  },
  //点击切换
  selectArea: function(e) {
    this.setData({
      area: e.target.dataset.me,
      selectAreaH: true,
      areaList: false,
    })
  },
  clickType: function() {
    var selectTypeH = this.data.selectTypeH;
    if (selectTypeH == true) {
      this.setData({
        typeList: true,
        selectTypeH: false,
      })
    } else {
      this.setData({
        typeList: false,
        selectTypeH: true,
      })
    }
  },
  //点击切换
  selectType: function(e) {
    this.setData({
      activityType: e.target.dataset.me,
      selectTypeH: true,
      typeList: false,
    })
  },

  clickAdd: function() {
    wx.navigateTo({
      url: '/pages/appointment2/appointment2'
    })
  },

  //获取活动信息
  getActivities: function (last_date) {
    const db = wx.cloud.database();
    const _ = db.command;
    if (last_date == 0) {
      db.collection('activity').where({
        end_time: _.gt(new Date().getTime())
      }).orderBy('end_time', 'asc')
        .limit(10)
        .get()
        .then(function (res) {
          console.log(res.data);
          return res.data;
        })
        .catch(function (err) {
          console.error(err);
        });
    } else {
      db.collection('activity').where({
        end_time: _.gt(last_date)
      }).orderBy('end_time', 'asc')
        .limit(10)
        .get()
        .then(function (res) {
          console.log(res.data);
          return res.data;
        })
        .catch(function (err) {
          console.error(err);
        });
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    template.tabbar("tabBar", 1, this);
    this.getData();
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