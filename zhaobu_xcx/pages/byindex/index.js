// byindex.js
import { $wuxToast } from '../../components/wux'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "我的",
    unread: true,
    needsStatus: ['进行中', '已完成', '待支付', '已失效'],
    orderStatus: ['进行中', '待接单', '待支付', '已完成'],
    tracker: false,
    agent: false,
    screen_height: 0,
    mode: 'user',
    needs_alert: false,
    orders_alert: false,
    logged_in: false,
    screen_height: 0
  },

  getSystemInfo() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          image_block_size: (res.windowWidth - 75) / 4 + 'px',
          screen_height: res.windowHeight,
        })
        console.log(that.data.image_block_size);
      }
    })
  },

  onClickPublish: function(e) {
    wx.navigateTo({
      url: '/pages/needs/publish',
    })
  },

  onClickNeeds: function (e) {
    wx.navigateTo({
      url: '/pages/needs/general_needs_list?tab=0&user_type=user',
    })
  },

  onClickOrders: function (e) {
    wx.navigateTo({
      url: '/pages/order/general_order_list?tab=0&user_type=user',
    })
  },

  onClickAgentNeeds: function (e) {
    wx.navigateTo({
      url: '/pages/needs/general_needs_list?tab=0&user_type=agent',
    })
  },

  onClickTrackerNeeds: function(e) {
    wx.navigateTo({
      url: '/pages/needs/general_needs_list?tab=0&user_type=tracker',
    })
  },

  onClickAgentOrders: function (e) {
    wx.navigateTo({
      url: '/pages/order/general_order_list?tab=0&user_type=agent',
    })
  },

  onClickTrackerOrders: function (e) {
    wx.navigateTo({
      url: '/pages/order/general_order_list?tab=0&user_type=tracker',
    })
  },

  onClickSettings: function(e) {
    wx.navigateTo({
      url: '/pages/settings/settings',
    })
  },

  onClickAddress: function (e) {
    wx.navigateTo({
      url: '/pages/address/address_list',
    })
  },

  switchMode: function (e) {
    var mode = 'user'
    if (this.data.mode == 'user') {
      if (this.data.tracker) {
        mode = 'tracker'
      } else {
        mode = 'agent'
      }
    }
    this.setData({
      mode: mode,
      needs_alert: false,
      orders_alert: false,
    })

    this.getAlerts()
  },


  /**
   * 二维码扫一扫函数
   */
  onClickScan: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        var strs = res.result.split(':')

        strs = strs[2];

        var cloth_id = strs.split('-')[0];
        var db_id = strs.split('-')[1];

        wx.navigateTo({
          url: '../twxx/twxx?db_id=' + db_id + '&cloth_id=' + cloth_id
        })

        wx.showToast({
          title: '成功',
          icon: 'warn',
          duration: 2000
        })
      },
      fail: (res) => {
        $wuxToast.show({
          type: 'forbidden',
          timer: 2000,
          color: '#fff',
          text: '暂不支持该二维码的内容',
        });
      },
      complete: (res) => {
      }
    });
  },
  // onClickScan: function (e) {
  //   var that = this;
  //   wx.scanCode({
  //     complete: function(r) {
  //       console.log(r)
  //       if (!('result' in r)) {
  //         return;
  //       }
  //       var regex = /q=needs:(\w+)/
  //       var group = r.result.match(regex);
  //       if (group) {
  //         console.log(group[1]); 
  //         wx.navigateTo({ url: '/pages/needs/detail?type=' + that.data.mode
  //              + '&id=' + group[1] });
  //         return;
  //       }

  //       regex = /q=sp:(\w+)\-(\w+)/
  //       group = r.result.match(regex);  
  //       if (group) {
  //         console.log(group[1], group[2]);
  //         var url = '../shelf/goods?from=shelf&goods_id=' + group[1] + '&type=' + that.data.mode + '&db_id=' + group[2];
  //         console.log(url);
  //         wx.navigateTo({
  //           url: url
  //         });
  //         return;
  //       }

  //       regex = /q=team:(\w+)/
  //       group = r.result.match(regex);
  //       if (group) {
  //         console.log(group[1]);
  //         var url = '../team/info?code=' + group[1];
  //         console.log(url);
  //         wx.navigateTo({
  //           url: url
  //         });
  //         return;
  //       }
  //       $wuxToast.show({
  //         type: 'forbidden',
  //         timer: 2000,
  //         color: '#fff',
  //         text: '暂不支持该二维码的内容',
  //       });
  //     }
  //   });
  // },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // if (options.logged_in) {
      // this.onLoggedIn();
    // } else {
    getApp().globalData.lastUrl = '../byindex/index'
    this.doLogin();
    // }
  },

  onLoggedIn: function() {
    var tracker = wx.getStorageSync('tracker') == '1';
    var agent = wx.getStorageSync('agent') == '1';
    if (tracker) {
      this.setData({
        tracker: true,
        agent: false,
        mode: 'tracker',
        needs_alert: false,
        orders_alert: false,
        logged_in: true,
      })
    } else if (agent) {
      this.setData({
        agent: true,
        tracker: false,
        mode: 'agent',
        needs_alert: false,
        orders_alert: false,
        logged_in: true,
      })
    } else {
      this.setData({
        tracker: false,
        agent: false,
        mode: 'user',
        needs_alert: false,
        orders_alert: false,
        logged_in: true,
      })
    }
    this.getSystemInfo();
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
    this.getAlerts()
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
    return {
      title: '布源网小程序',
      path: 'pages/byindex/index',
    }
  },

  getAlerts: function() {
    var that = this;
    wx.request({
      url: 'https://by.edenhe.com/api/alert/home/' + this.data.mode + '/',
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        var needs_alert = false;
        var orders_alert = false;
        for (var i = 0; i < res.data.data.alerts.length; i++) {
          if (res.data.data.alerts[i] == 'needs') {
            needs_alert = true
          } else if (res.data.data.alerts[i] == 'orders') {
            orders_alert = true
          }
          that.setData({
            needs_alert: needs_alert,
            orders_alert: orders_alert,
          })
        }
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  doLogin: function () {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          that.requestUserInfo(res.code);
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: function (res) {
        console.log(res);
      }
    });
  },

  //  获取用户信息
  requestUserInfo(code) {
    console.log('requestUserInfo')
    var that = this;
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        console.log(res);
        that.loginBuyuan(code, res.encryptedData, res.iv)
      },
      fail: function (res) {
        console.log(res);
        if (res.errMsg.indexOf('getUserInfo:fail') >= 0) {
          //  需要重新获取授权
          wx.redirectTo({
            url: '../byindex/auth',
          });
        };
      }
    })
  },

  //  登录布源
  loginBuyuan(code, encryptedData, iv) {
    console.log('loginBuyuan')
    var that = this;
    wx.removeStorageSync('user_logged_in');
    wx.request({
      url: 'https://by.edenhe.com/api/wx/xcx_login/',
      method: 'post',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: { 'code': code, 'encrypted_data': encryptedData, 'iv': iv },
      success: function (res) {
        console.log(res)
        if (res.header['Set-Cookie']) {
          var cookies = res.header['Set-Cookie'];
          var index1 = cookies.indexOf('sessionid=', 0);
          var index2 = cookies.indexOf(';', index1);
          var index3 = cookies.indexOf(',', index1);
          if (index2 < index3) {
            cookies = cookies.substring(index1, index2);
          } else {
            cookies = cookies.substring(index1, index3);
          }
          wx.setStorageSync('cookie', cookies);
          if ('user' in res.data.data.binding) {
            wx.setStorageSync('user_id', res.data.data.binding.user);
          } else {
            wx.removeStorageSync('user_id');
          }
          wx.setStorageSync('user_role', res.data.data.role);
          wx.setStorageSync('binded', 'phone' in res.data.data.binding);
          wx.setStorageSync('agent', res.data.data.agent ? 1 : 0);
          wx.setStorageSync('tracker', res.data.data.tracker ? 1 : 0);
          that.onLoggedIn();
          if (!('phone' in res.data.data.binding)) {
            wx.redirectTo({
              url: "../welcome/binding",
            });
          }
        }
      }
    });
  },

  my_team: function() {
    wx.navigateTo({
      url: '../team/my_team',
    })
  },

  my_address: function() {
    wx.navigateTo({
      url: '../address/address_list',
    })
  }
})