// pages/register/register.js
var year = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    files: [],
    hasImg: false,
    casArray: ['请选择年级', '本18', '本17', '本16', '本15', '研18', '研17', '研16'],
    casIndex: 0,
  },
  chooseImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          files: that.data.files.concat(res.tempFilePaths),
          hasImg: true
        });
      }
    })
  },

  showProtocol: function() {
    wx.showModal({
      content: 'xxx规定',
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

  // 在数据库中添加账户信息
  addAccount: function(nickname, year, sex, place, name, stu_id, phone) {
    const db = wx.cloud.database()
    db.collection('account').add({
      data: {
        nickname: nickname,
        year: year,
        sex: sex,
        place: place,
        name: name,
        stu_id: stu_id,
        phone: phone
      },
      success: function(res) {
        wx.showModal({ //成功发布时弹出的提示框
          content: '您已成功注册',
          showCancel: false,
          confirmColor: "#557d8a",
          confirmText: "JoyIn",
          success: function(res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.redirectTo({
                url: '/pages/joyin/joyin'
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
  onLoad: function(options) {

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

  },

  bindCasPickerChange: function(e) {
    console.log(e.detail.value);
    if (e.detail.value == 7) {
      year = this.data.casArray[7];
      this.setData({
        casIndex: e.detail.value
      })
    }
    if (e.detail.value == 6) {
      year = this.data.casArray[6];
      this.setData({
        casIndex: e.detail.value
      })
    }
    if (e.detail.value == 5) {
      year = this.data.casArray[5];
      this.setData({
        casIndex: e.detail.value
      })
    }
    if (e.detail.value == 4) {
      year = this.data.casArray[4];
      this.setData({
        casIndex: e.detail.value
      })
    }
    if (e.detail.value == 3) {
      year = this.data.casArray[3];
      this.setData({
        casIndex: e.detail.value
      })
    }
    if (e.detail.value == 2) {
      year = this.data.casArray[2];
      this.setData({
        casIndex: e.detail.value
      })
    }
    if (e.detail.value == 1) {
      year = this.data.casArray[1];
      this.setData({
        casIndex: e.detail.value
      })
    }
    if (e.detail.value == 0) {
      year = this.data.casArray[0];
      this.setData({
        casIndex: e.detail.value
      })
    }
  },

  formSubmit: function(e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let myear = year;
    let {
      nickname,
      sex,
      place,
      name,
      stu_id,
      phone
    } = e.detail.value;
    console.log(myear);
    if (e.detail.value.nickname.length < 4 || e.detail.value.nickname.length > 8) {
      wx.showModal({
        title: '请输入4-8位昵称!',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: '知道啦',
      });
    } else if (myear == 0) {
      wx.showModal({
        title: '请选择年级！',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: '知道啦',
      });
    } else if (e.detail.value.name.length == 0) {
      wx.showModal({
        title: '请输入真实姓名！',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: '知道啦',
      });
    } else if (e.detail.value.stu_id.length == 0) {
      wx.showModal({
        title: '请输入学号  ！',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: '知道啦',
      });
    } else if (e.detail.value.phone.length == 0) {
      wx.showModal({
        title: '手机号码并不能为空！',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: '知道啦',
      });
    } else if (e.detail.value.phone.length > 0 && e.detail.value.phone.length != 11) {
      wx.showModal({
        title: '请输入11位手机号码!',
        showCancel: false,
        confirmColor: "#557d8a",
        confirmText: '知道啦',
      });
    } else {
      this.addAccount(nickname, myear, sex, place, name, stu_id, phone);
    }
  },
  //页面跳转
  toastin: function(event) {
    wx.navigateTo({
      url: '../login/login',
      success: function(res) {},
      fail: function() {},
      complete: function() {}
    })
  }
})