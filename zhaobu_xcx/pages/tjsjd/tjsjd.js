// pages/tjsjd/tjsjd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [], // 所有设计单 
    show_list: [], // 展示的设计单
    is_chose_all: true,
    cloth: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var app = getApp();
    var cloth = app.globalData.show_cloth;
    wx.request({
      url: 'http://39.104.71.13:8001/sjd_list',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        that.data.list = res.data.data.list;
        that.data.show_list = [];
        var num = 0;
        for (var i in that.data.list) {
          that.data.list[i].is_chose = true;
          num += 1;
          if (num < 9 || that.data.list.length <= 9) {
            that.data.show_list.push(that.data.list[i])
          }
        }
        that.setData({
          list: that.data.list,
          show_list: that.data.show_list,
          cloth: cloth
        });
        app.globalData.sjd_list = that.data.list;
      }
    })
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

  show_items: function (moreTab) {
    var that = this;
    if (moreTab == 0) {
      this.setData({
        show_list: that.data.list,
      });
    } else {
      that.data.show_list = [];
      var num = 0;
      for (var i in that.data.list) {
        //that.data.list[i].is_chose = true;
        num += 1;
        if (num < 9 || that.data.list.length <= 9) {
          that.data.show_list.push(that.data.list[i])
        }
      }
      that.setData({
        list: that.data.list,
        show_list: that.data.show_list,
      });
    }
  },

  add_sjd: function (name) {
    var that = this;
    wx.request({
      url: 'https://by.edenhe.com/api/create_sjd/',
      method: 'GET',
      data: {
        'new_type_name': name,
        'cloth_list': [that.data.cloth]
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        wx.showToast({
          title: '添加' + name + '成功',
        });
        var t_list = {};
        t_list.cloth_list = [];
        t_list.name = name;
        t_list.cloth_list.push(that.data.cloth);
        t_list.is_chose = true;
        that.data.list.push(t_list);
        that.setData({
          list: that.data.list
        });
        that.show_items(that.data.moreTab);
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },

  finish_input: function (e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否确认创建设计单 ' + e.detail.value,
      success: function (res) {
        if (res.confirm) {
          var flag = false;
          var t_list = null;
          for (var i = 0; i < that.data.show_list.length; i++) {
            if (that.data.show_list[i].name == e.detail.value) {
              flag = true;
              t_list = that.data.show_list[i].cloth_list;
              break;
            }
          }
          if (flag) { // 存在同名的设计单
            wx.showModal({
              title: '提示',
              content: '已经有重名的设计单，是否将面料添加到该设计单中',
              success: function (res) {
                if (res.confirm) {
                  t_list.push(that.data.cloth);
                  wx.request({
                    url: 'http://39.104.71.13:8001/save_sjd',
                    data: {
                      type_name: e.detail.value,
                      new_type_name: e.detail.value,
                      cloth_list: t_list
                    },
                    header: {
                      'Content-Type': 'application/json'
                    },
                    success: function (res) {
                      wx.showToast({
                        title: '添加' + e.detail.value + '成功',
                      });
                      that.setData({
                        list: that.data.list
                      });
                      that.show_items(that.data.moreTab);
                    }
                  });
                }
              }
            })
          } else {
            that.add_sjd(e.detail.value);
          }
        }
      }
    })
  },


  show_all: function () {
    var that = this;
    if (this.data.moreTab == 0) {
      this.setData({
        show_list: that.data.list,
        moreTab: 1
      });
    } else {
      that.data.show_list = [];
      var num = 0;
      for (var i in that.data.list) {
        //that.data.list[i].is_chose = true;
        num += 1;
        if (num < 9 || that.data.list.length <= 9) {
          that.data.show_list.push(that.data.list[i])
        }
      }
      that.setData({
        list: that.data.list,
        show_list: that.data.show_list,
        moreTab: 0
      });
    }
  },

  chose_sjd: function (e) {
    var that = this;
    that.data.list[e.target.dataset.idx].is_chose = !that.data.list[e.target.dataset.idx].is_chose;
    that.data.show_list[e.target.dataset.idx].is_chose = !that.data.show_list[e.target.dataset.idx].is_chose;
    that.data.is_chose_all = false;
    this.setData({
      show_list: that.data.show_list,
      list: that.data.list,
      is_chose_all: that.data.is_chose_all
    })
    console.log(this.data.show_list);
  },

  chose_all: function () {
    var that = this;
    that.data.is_chose_all = !that.data.is_chose_all;
    for (var i in that.data.show_list) {
      that.data.show_list[i].is_chose = that.data.is_chose_all;
    }
    for (var i in that.data.list) {
      that.data.list[i].is_chose = that.data.is_chose_all;
    }
    this.setData({
      show_list: that.data.show_list,
      list: that.data.list,
      is_chose_all: that.data.is_chose_all
    })
  }, 

  save_event: function(e) {
    wx.showToast({
      title: '接口未定义',
    })
  }

})