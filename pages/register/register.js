// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    files:[],
    casArray: ['请选择年级','本科2018级', '本科2017级', '本科2016级', '本科2015级', '研究2018级','研究2017级','研究2016级'],
    casIndex: 0,
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths)
        });
      }
    })
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

  // 在数据库中添加账户信息
  addAccount: function(nickname, year, gender, place, name, stu_id, phone) {
    const db = wx.cloud.database()
    db.collection('account').add({
      data: {
        nickname: nickname,
        year: new Date(year),
        gender: gender,
        place: place,
        name: name,
        stu_id: stu_id,
        phone: phone
      },
      success: function(res) {
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
  
  },
  toSchool: function () {
    wx.navigateTo({
      url: '/pages/school/school'
    })
  },

  bindCasPickerChange: function (e) {
    console.log('用户选的是', this.data.casArray[e.detail.value])
    if (e.detail.value == 4) {
      this.setData({ reply: true })
    } else {
      this.setData({ reply: false })
    }
    this.setData({
      casIndex: e.detail.value
    })

  },

  toastin: function (event) {
    wx.navigateTo({
      url: '../login/login',
      success: function (res) {
      },
      fail: function () {
      },
      complete: function () {
      }
    })
  }
})