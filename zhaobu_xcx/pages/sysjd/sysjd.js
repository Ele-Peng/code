// pages/sysjd/sysjd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    action_type: 'show',
    list: [],
    add_list: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    if (options.action_type) {
      this.setData({
        action_type: options.action_type,
        list: app.globalData.sjd_list,
        add_list: app.globalData.sjd_chose_list
      })
    }
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
    var app = getApp();
    this.setData({
      list: app.globalData.sjd_list
    })
    console.log(this.data.list);
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

  edit_sjd: function (e) {
    wx.navigateTo({
      url: '../bjsjd/bjsjd'
    })
  },

  show_sjd: function (e) {
    wx.navigateTo({
      url: '../bjsjd_3/bjsjd_3?idx=' + e.target.dataset.idx
    })
  },

  add_cloth: function (e) {
    var that = this;
    var app = getApp();
    var idx = e.target.dataset.idx;
    var t_list = []; // 非重复面料
    var l_list = []; // 非重复面料
    var m_list = []; // 重复面料
    for (var i in this.data.add_list) {
      var flag = true;
      for (var j in this.data.list[idx].cloth_list) {
        if (this.data.list[idx].cloth_list[j].id == i) {
          flag = false;
          break;
        }
      }
      if (flag) {
        t_list.push(i);
        l_list.push(this.data.add_list[i])
      } else {
        m_list.push(i);
      }
    }
    var text = '重复面料:' + m_list + ' 以及' + '将要添加面料:' + t_list + '。请问是否确认添加';
    if (m_list.length == 0) {
      text = '将要添加面料:' + t_list + '。请问是否确认添加';
    }
    if (t_list.length != 0) {
      wx.showModal({
        title: '提示',
        content: text,
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: 'http://39.104.71.13:8001/sjd_add_cloth',
              data: {
                'addList': t_list,
                'add_type_name': that.data.list[idx].name
              },
              method: 'GET',
              header: {
                'Content-Type': 'application/json'
              },
              success: function (res) {
                if (res.data.data.is_success) {
                  for (var i in l_list) {
                    that.data.list[e.target.dataset.idx].cloth_list.push(l_list[i]);
                  }
                  that.setData({
                    list: that.data.list
                  })
                  app.globalData.sjd_list = that.data.list;
                  wx.showToast({
                    title: '加入成功',
                    icon: 'success',
                    duration: 1000
                  });
                  wx.navigateBack({
                    delta: 1
                  });

                } else {
                  wx.showToast({
                    title: res.data.data.text,
                    icon: 'none',
                    duration: 1000
                  })
                }
              }
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: '该设计单内与当前选择内容部分一致，不需要添加面料',
        icon: 'none',
        duration: 1000
      })
    }
  },
})