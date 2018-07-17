// pages/bjsjd/bjsjd.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    idx: -1,
    list: [],
    name: '未命名',
    add_list: [],
    is_remove: false,
    is_remove_2: false,
    is_edit: false,
    remove_idx: -1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    console.log(options)
    if (options.idx) { // 编辑设计单
      wx.setNavigationBarTitle({
        title: '编辑设计单'
      })
      this.setData({
        idx: options.idx,
        list: app.globalData.sjd_list,
        add_list: app.globalData.sjd_list[options.idx].cloth_list
      })
      app.globalData.sjd_t_list = this.data.add_list;
      this.setData({
        name: this.data.list[this.data.idx].name
      })
    } else { // 新建设计单
      wx.setNavigationBarTitle({
        title: '新建设计单'
      })
      var t_list = [];
      for (var i in app.globalData.sjd_chose_list) {
        t_list.push(app.globalData.sjd_chose_list[i])
      }
      this.setData({
        list: app.globalData.sjd_list,
        add_list: t_list
      })
      app.globalData.sjd_t_list = this.data.add_list;
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
      add_list: app.globalData.sjd_t_list
    })
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

  remove_cloth: function () {
    this.setData({
      is_edit: true
    })
  },

  remove_cloth_2: function () {
    this.setData({
      is_edit: false
    })
  },

  remove_cloth_3: function (e) {
    this.setData({
      remove_idx: e.target.dataset.id,
      is_remove_2: true
    })
  },


  remove_cloth_yes: function () {
    this.data.add_list.splice(this.data.remove_idx, 1);
    this.setData({
      add_list: this.data.add_list,
      is_remove_2: false
    })
  },

  remove_cloth_no: function () {
    this.setData({
      is_remove_2: false
    })
  },

  chose_cloth: function () {
    var app = getApp();
    app.globalData.sjd_t_list = this.data.add_list;
    wx.navigateTo({
      url: '../xzml/xzml'
    })
  },

  save_sjd: function () {
    wx.showLoading({
      title: '正在保存',
    })
    var that = this;
    var app = getApp();
    var t_list = [];
    for (var i in this.data.add_list) {
      t_list.push(this.data.add_list[i].id);
    }
    if (this.data.idx == -1) {
      for (var i in this.data.list) {
        if (this.data.list[i].name == this.data.name) {
          wx.showToast({
            title: '创建失败，已经有重名的设计单',
            icon: 'none',
            duration: 2000
          })
          return;
        }
      }
      var m_list = {};
      m_list.name = this.data.name;
      m_list.cloth_list = this.data.add_list;
      this.data.list.push(m_list);
      app.globalData.sjd_list = this.data.list;
    } else {
      for (var i in this.data.list) {
        if (this.data.list[i].name == that.data.list[that.data.idx].name) {
          console.log(this.data.list[i])
          this.data.list[i].name = this.data.name;
          this.data.list[i].cloth_list = this.data.add_list;
          console.log(this.data.list[i])
          break;
        }
      }
      app.globalData.sjd_list = this.data.list;
    }
    if (that.data.idx != -1) {
      wx.request({
        url: 'http://39.104.71.13:8001/save_sjd',
        data: {
          type_name: that.data.list[that.data.idx].name,
          new_type_name: that.data.name,
          cloth_list: t_list
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          wx.hideLoading();
          wx.navigateBack({
            delta: 1
          })
        }
      });
    } else {
      wx.request({
        url: 'http://39.104.71.13:8001/create_sjd',
        data: {
          new_type_name: that.data.name,
          cloth_list: t_list
        },
        header: {
          'Content-Type': 'application/json'
        },
        success: function (res) {
          wx.hideLoading();
          wx.navigateBack({
            delta: 2
          })
        }
      });
    }
  },

  remove_sjd: function () {
    this.setData({
      is_remove: true
    })
  },

  remove_sjd_yes: function () {
    var that = this;
    var app = getApp();
    this.setData({
      is_remove: false
    })
    if (that.data.idx != -1) {
      if (that.data.list[that.data.idx].length != 0) {
        wx.showModal({
          title: '提示',
          content: '当前设计单中尚存在商品，无法删除当前设计单',
          success: function (res) {
            if (res.confirm) {
              that.remove_cloth();
            }
          }
        })
      } else {
        wx.showLoading({
          title: '删除中',
        })
        wx.request({
          url: 'http://39.104.71.13:8001/del_sjd?type_name=' + that.data.list[that.data.idx].name,
          header: {
            'Content-Type': 'application/json'
          },
          success: function (res) {
            that.data.list.splice(that.data.idx, 1);
            app.globalData.sjd_list = that.data.list;
            wx.hideLoading();
            wx.navigateBack({
              delta: 2
            })
          }
        });
      }
    } else {
      wx.showModal({
        title: '提示',
        content: '是否放弃新建设计单，并返回我的设计单',
        success: function (res) {
          if (res.confirm) {
            wx.navigateBack({
              delta: 2
            });
          }
        }
      });
    }
  },

  remove_sjd_no: function () {
    this.setData({
      is_remove: false
    })
  },

  bindKeyInput: function (e) {
    this.setData({
      name: e.detail.value
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