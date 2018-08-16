Page({
    data: {
        example : 'test'
    },
    toRegister: function () {
      wx.navigateTo({
        url: '/pages/register/register'
      })
    }
});
