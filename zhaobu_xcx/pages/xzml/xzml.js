// pages/xzml/xzml.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    add_list: [],
    num: [],
    now_chose: '#',
    zm_list: [
      '#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    wx.request({
      url: 'http://39.104.71.13:8001/get_all_cloth',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.setData({
          add_list: app.globalData.sjd_t_list,
          num: res.data.data.num
        });
        for (var k in that.data.num) {
          for (var i in res.data.data.list[that.data.num[k]]) {
            var flag = true;
            for (var j in that.data.add_list) {
              if (res.data.data.list[that.data.num[k]][i].id == that.data.add_list[j].id) {
                flag = false;
                break;
              }
            }
            if (flag) {
              res.data.data.list[that.data.num[k]][i].is_chose = false;
            } else {
              res.data.data.list[that.data.num[k]][i].is_chose = true;
            }
          }
        }
        that.setData({
          list: res.data.data.list
        });
        app.globalData.all_chose_list = that.data.list;
        app.globalData.all_chose_num = that.data.num;
      }
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

  chose_cloth: function (e) {
    console.log(e);
    this.data.list[this.data.num[e.target.dataset.idx]][e.target.dataset.idxs].is_chose = !this.data.list[this.data.num[e.target.dataset.idx]][e.target.dataset.idxs].is_chose;
    this.setData({
      list: this.data.list
    })
  },

  move_page: function (e) {
    var idx = e.target.dataset.idx.toLowerCase();
    var height = 0;
    this.setData({
      now_chose: e.target.dataset.idx
    })
    if (idx == '#') {
      this.setData({
        now_chose: this.data.num[0]
      })
      wx.pageScrollTo({
        scrollTop: 0,
        duration: 0
      })
    } else if (this.data.list[idx]) {
      var index = 0;
      for (var i in this.data.num) {
        if (this.data.num[i] == idx) {
          index = i;
          break;
        }
        height += 34;
        for (var j in this.data.list[this.data.num[i]]) {
          height += 60;
        }
      }
      console.log(height)
      wx.pageScrollTo({
        scrollTop: height,
        duration: 100
      })
    }
  },

  submit: function () {
    var t_list = [];
    var app = getApp();
    for (var i in this.data.num) {
      for (var j in this.data.list[this.data.num[i]]) {
        if (this.data.list[this.data.num[i]][j].is_chose) {
          t_list.push(this.data.list[this.data.num[i]][j]);
        }
      }
    }
    app.globalData.sjd_t_list = t_list;
    wx.navigateBack({
      delta: 1
    })
  },
  show_item: function (e) {
    var that = this;
    if (!e.target.dataset.is_pay) {
      e.target.dataset.is_pay = false;
    }
    wx.navigateTo({
      url: '../twxx/twxx?is_pay=' + e.target.dataset.is_pay + '&cloth_id=' + e.target.dataset.cloth_id
    })
  }
})