// pages/wdsjd/wdsjd.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        currentTab: 0,
        moreTab: 0,
        list: [],
        show_list: [],
        is_chose_all: true,
        show_cloth_list: {}, // 显示的布料信息，不重复显示
        page: 0,
        size: 10,
        order_by: 'None', // 根据什么排序
        cloth_list: [],
    },

    update_show_cloth_list: function() {
      var show_cloth_list = {};
      var list = this.data.list;
      console.log(list);
      for (var i in list) {
        if (list[i].is_chose) {
          for (var j in list[i].cloth_list) {
            console.log(show_cloth_list);
            show_cloth_list[list[i].cloth_list[j].id] = list[i].cloth_list[j];
          }
        }
      }
      this.setData({
        show_cloth_list: show_cloth_list
      });
    },

    getList: function () {
      var that = this;
      wx.request({
        url: 'https://by.edenhe.com/api/shelf/goods/list/?page=' + that.data.page + '&size=' + that.data.size,
        header: {
          'content-type': 'application/json' // 默认值
        },
        data: {
          page: that.data.page,
          size: that.data.size,
          chose: that.data.button_array,
          order_by: that.data.order_by
        },
        method: 'GET',
        success: function (res) {
          console.log(res.data);
          var n = 0;
          for (var i in res.data.data) {
            that.data.cloth_list.push(res.data.data[i]);
          }
          console.log(that.data.cloth_list);
          that.setData({
            cloth_list: that.data.cloth_list,
          })
        }
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var app = getApp();
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
                    show_list: that.data.show_list
                });
                app.globalData.sjd_list = that.data.list;
                that.update_show_cloth_list();
            }
        })
        this.getList();
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
        var that = this;
        var app = getApp();
        //将获取到的json数据，存在名字叫detail的这个数组中
        that.data.list = app.globalData.sjd_list;
        console.log(app.globalData.sjd_list);
        that.data.show_list = [];
        var num = 0;
        for (var i in that.data.list) {
            num += 1;
            if (num < 9 || that.data.list.length <= 9) {
                that.data.show_list.push(that.data.list[i])
            }
        }
        that.setData({
            list: that.data.list,
            show_list: that.data.show_list
        });
        app.globalData.sjd_list = that.data.list;
        this.update_show_cloth_list();
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

    //滑动切换
    swiperTab: function (e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    },

    //点击切换
    clickTab: function (e) {
        var that = this;
        if (this.data.currentTab === e.target.dataset.current) {
            return false;
        } else {
            that.setData({
                currentTab: e.target.dataset.current
            })
        }
    },

    //更多颜色查看
    onMoreTap: function (e) {
        console.log("123");
        wx.navigateTo({
            url: '../../pages/gm/gm?page=1',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
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
        this.update_show_cloth_list();
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
        this.update_show_cloth_list();
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
        this.update_show_cloth_list();
    },

    manager_mianliao: function (e) {
        var that = this
        wx.navigateTo({
            url: '../wdsjd_2/wdsjd_2'
        })
    },
    manager_sjd: function (e) {
        var that = this;
        var app = getApp();
        app.globalData.sjd_chose_list = [];
        wx.navigateTo({
            url: '../sysjd/sysjd'
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