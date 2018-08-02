/* pages/twxx/twxx.js */
import { $wuxLoading } from '../../components/wux'
import { $wuxDialog } from '../../components/wux'
Page({
  data: {
    heading:"面料详情",
    lastUrl:"",
    detail: {},
    currentTab: 0,
    cloth_id: 0,
    is_click: 0,
    is_pay: false,
    is_show_pay: false,
    db_id: 0,
    screen_height: 0,
    result_id: 0,
    similar_list: []
  },


  onLoad: function (options) {
    this.getSystemInfo();
    console.log(options)
    var app = getApp();
    // 页面初始化 options为页面跳转所带来的参数

    // 是否有cloth_id传入
    if (options.cloth_id) {
      console.log(options.cloth_id);
      this.setData({
        cloth_id: options.cloth_id
      })
      app.globalData.cloth_id = options.cloth_id;
    } else {
      this.setData({
        cloth_id: app.globalData.cloth_id
      })
    }

    // this.setData({
    //   is_pay: app.globalData.is_pay
    // })

    console.log(this.data)

    // 是否点击查布源
    // if (options.is_click) {
    //   this.setData({
    //     is_click: options.is_click
    //   })
    // }

    // 是否有原色卡编号
    if (options.db_id) {
      this.setData({
        db_id: options.db_id
      })
    }

    // 如果已经支付，并且点击了查布源
    // if (this.data.is_pay == true && this.data.is_click != 0) {
    //   wx.redirectTo({
    //     url: '../by/by',
    //   })
    //   return;
    // } else if (this.data.is_click == 1) {
    //   this.setData({
    //     is_show_pay: true
    //   })
    // }
    var that = this;
    console.log(that.data.cloth_id);
    var url = 'https://by.edenhe.com/api/record/sample/' + that.data.cloth_id + '/';
    // var url = 'https://by.edenhe.com/api/record/sample/93338500599527/';

    if (that.data.db_id) {
      url = url + that.data.db_id;
    }
    wx.request({
      url: url,
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(that.data.cloth_id);
        console.log(res)
        //将获取到的json数据，存在名字叫detail的这个数组中
        that.setData({
          detail: res.data.data,
          //res代表success函数的事件对，data是固定的
        });
        app.globalData.show_cloth = that.data.detail;
        //app.globalData.userLevel = that.data.detail.userLevel;
        console.log(that.data.detail);
        // that.setData({
        //   is_pay: that.data.detail.is_show_pay
        // })
        app.globalData.is_pay = that.data.detail.is_show_pay;
        that.hideLoading();
      }
    });
    if (options.currentTab) {
      that.setData({
        currentTab: options.currentTab
      });
    }

    var url = '';
    var result_id = this.data.cloth_id;
    url = 'https://by.edenhe.com/api/cloth/from_goods/' + this.data.cloth_id + "/";
    console.log(wx.getStorageSync('cookie'))
    wx.request({
      url: url,
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          db_id: res.data.data.card_id,
          result_id: res.data.data.id,
        })
        that.hideLoading();
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    });

    var url = 'https://by.edenhe.com/api/record/sample/' + that.data.cloth_id + '/similar/';
    wx.request({
      url: url,
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          similar_list: ''
        })
        that.hideLoading();
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    })
  },

  getSystemInfo() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          screen_height: res.windowHeight,
        })
        console.log(that.data.screen_height)
      }
    })
  },
  /**
  * 生命周期函数--监听页面显示
  */
  onShow: function () {
    getApp().globalData.lastUrl = '../order/order_list'
    this.setData({
      lastUrl: getApp().globalData.lastUrl,
    });
  },

  showLoading: function () {
    $wuxLoading.show({
      text: '数据加载中',
    });
  },

  hideLoading: function () {
    $wuxLoading.hide();
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
  // onMoreTap: function (e) {
  //   console.log("123");
  //   var that = this;
  //   wx.navigateTo({
  //     url: '../../pages/gm/gm?page=1&cloth_id=' + that.data.cloth_id,
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },

  //更多颜色查看
  // onMoreTap2: function (e) {
  //   console.log("123");
  //   var that = this;
  //   wx.navigateTo({
  //     url: '../../pages/gm/gm?page=0&cloth_id=' + that.data.cloth_id,
  //     success: function (res) { },
  //     fail: function (res) { },
  //     complete: function (res) { },
  //   })
  // },



  onClickBuy: function() {
    var that = this;
    wx.navigateTo({
      url: '../../pages/subscribe/subscribe?result_id=' + that.data.result_id + '&type=0&cloth_id=' + that.data.cloth_id,
    })
    console.log(that.data.cloth_id);
  },

  // 多张图预览
  onPreviewImage: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var urls = [];
    for (var i = 0; i < e.currentTarget.dataset.imgurls.length ; i++) {
      urls.push(e.currentTarget.dataset.imgurls[i]);
    }

    wx.previewImage({
      current: urls[parseInt(index)],
      urls: urls,
    });
  },

  // 主题图预览
  onPreivewTitleImg: function (e) {
    console.log(e);
    var index = e.currentTarget.dataset.index;
    var urls = [];
    if (e.currentTarget.dataset.colorsurl) {
      urls.push(e.currentTarget.dataset.colorsurl[0]);
    }
    if (e.currentTarget.dataset.globalurl) {
      urls.push(e.currentTarget.dataset.globalurl[0]);
    }
    if (e.currentTarget.dataset.colorsurl) {
      urls.push(e.currentTarget.dataset.colorsurl[1]);
    }
    if (e.currentTarget.dataset.colorsurl) {
      urls.push(e.currentTarget.dataset.colorsurl[2]);
    }
    if (e.currentTarget.dataset.localurl) {
      urls.push(e.currentTarget.dataset.localurl[0]);
    }
    console.log(urls);
    wx.previewImage({
      current: urls[parseInt(index)],
      urls: urls,
    });
  },

  onSearch: function (e) {
    $wuxDialog.open({
      title: '查布源',
      content: '付费后，可查看布料详细来源',
      buttons: [
        {
          text: '我按错了',
        },
        {

          text: '我要查布源',
          type: 'weui-dialog__btn_warn',
          onTap(e) {
            wx.navigateTo({
              url: '../../pages/pay/search',
              success: function(res) {},
              fail: function(res) {},
              complete: function(res) {},
            })
          },
        },
      ],
    })
  },

  // doPay: function () {

  // }
})

