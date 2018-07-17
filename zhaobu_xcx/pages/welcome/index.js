// pages/welcome/index.js
Page({

  show_auth: false,

  /**
   * 页面的初始数据
   */
  data: {
  
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
    this.checkLogin(0)
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

  checkLogin: function(index) {
    var loggedin = 0;
    loggedin = wx.getStorageSync('user_logged_in');
    if (loggedin == 1) {
      console.log("already logged in");
      if (wx.getStorageSync('binded')) {
        wx.redirectTo({
          url: "../byindex/index?agent=" + wx.getStorageSync('agent') + '&tracker=' + wx.getStorageSync('tracker'),
        });
      } else {
        wx.redirectTo({
          url: "../welcome/binding",
        });
      }
    } else {
      console.log("not logged in");
      var that = this;
      if (wx.getStorageSync('unauthorized')) {
        wx.removeStorageSync('unauthorized');
        console.log('unauthorized');
        if (!that.show_auth) {
          that.show_auth = true;
          wx.navigateTo({
            url: '../byindex/auth',
          });
        }
      }
      setTimeout(
        function() {
          that.checkLogin(index + 1);
        }, 1000);
    }
  }
})