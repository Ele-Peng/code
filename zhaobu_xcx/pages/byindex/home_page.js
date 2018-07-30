// pages/byindex/home_page.js
import {
  $wuxToast
} from '../../components/wux'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isIpxpro: false,
    btuBottom: "",
    tracker: false,
    agent: false,
    mode: 'user',
    logged_in: false,
    heading: "布源",
    imgUrls: [
      '../../assets/images/testImg/icon-homePage.jpg',
      '../../assets/images/testImg/icon-homePage.jpg',
      '../../assets/images/testImg/icon-homePage.jpg'
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000,
    screen_height: 0,
    tagClass: [{
        name: "3D数码印花"
      },
      {
        name: "3D数码印花"
      },
      {
        name: "3D数码印花"
      },
      {
        name: "3D数码印花"
      },
      {
        name: "数码印花"
      },
      {
        name: "数码印花"
      },
      {
        name: "3D数码印花"
      },
      {
        name: "3D数码印花"
      },
      {
        name: "3D数码印花"
      },
      {
        name: "3D数码印花"
      },
      {
        name: "3D数码印花"
      },
      {
        name: "数码印花"
      },
      {
        name: "数码印花"
      },
      {
        name: "3D数码印花"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */

  getSystemInfo() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          screen_height: res.windowHeight,
        })
        that.data.windowWidth = res.windowWidth
      }
    })
  },

  onLoad: function(options) {
    this.doLogin();
    this.getSystemInfo();
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
  onReady: function() {
    //获得title 标题栏组件
    this.title = this.selectComponent("#title");
    //获得searchbar 搜索框组件
    this.searchBar = this.selectComponent("#searchBar");
    //获得themeArea 功能主题组件
    this.themeArea = this.selectComponent("#themeArea");
    //获得imgGrid 精选商品图片组件
    this.imgGrid = this.selectComponent("#imgGrid");
    //获得tagGrid 当季热门推荐组件
    this.tagGrid = this.selectComponent("#tagGrid");
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    // this.doLogin();
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

  // doLogin: function () {
  //   var that = this;
  //   wx.login({
  //     success: function (res) {
  //       console.log(res)
  //       if (res.code) {
  //         that.requestUserInfo(res.code);
  //       } else {
  //         console.log('获取用户登录态失败！' + res.errMsg)
  //       }
  //     },
  //     fail: function (res) {
  //       console.log(res);
  //     }
  //   });
  // },

  // //  获取用户信息
  // requestUserInfo(code) {
  //   console.log(code)
  //   console.log('requestUserInfo')
  //   var that = this;
  //   wx.getUserInfo({
  //     withCredentials: true,
  //     success: function (res) {
  //       console.log(res);
  //       that.loginBuyuan(code, res.encryptedData, res.iv)
  //     },
  //     fail: function (res) {
  //       console.log(res);
  //       if (res.errMsg.indexOf('getUserInfo:fail') >= 0) {
  //         //  需要重新获取授权
  //         wx.redirectTo({
  //           url: '../byindex/auth',
  //         });
  //       };
  //     }
  //   })
  // },

  // //  登录布源
  // loginBuyuan(code, encryptedData, iv) {
  //   console.log('loginBuyuan')
  //   var that = this;
  //   wx.removeStorageSync('user_logged_in');
  //   wx.request({
  //     url: 'https://by.edenhe.com/api/wx/xcx_login/',
  //     method: 'post',
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded',
  //     },
  //     data: { 'code': code, 'encrypted_data': encryptedData, 'iv': iv },
  //     success: function (res) {
  //       console.log(res)
  //       if (res.header['Set-Cookie']) {
  //         var cookies = res.header['Set-Cookie'];
  //         var index1 = cookies.indexOf('sessionid=', 0);
  //         var index2 = cookies.indexOf(';', index1);
  //         var index3 = cookies.indexOf(',', index1);
  //         if (index2 < index3) {
  //           cookies = cookies.substring(index1, index2);
  //         } else {
  //           cookies = cookies.substring(index1, index3);
  //         }
  //         wx.setStorageSync('cookie', cookies);
  //         if ('user' in res.data.data.binding) {
  //           wx.setStorageSync('user_id', res.data.data.binding.user);
  //         } else {
  //           wx.removeStorageSync('user_id');
  //         }
  //         wx.setStorageSync('user_role', res.data.data.role);
  //         wx.setStorageSync('binded', 'phone' in res.data.data.binding);
  //         wx.setStorageSync('agent', res.data.data.agent ? 1 : 0);
  //         wx.setStorageSync('tracker', res.data.data.tracker ? 1 : 0);
  //         that.onLoggedIn();
  //         if (!('phone' in res.data.data.binding)) {
  //           wx.redirectTo({
  //             url: "../welcome/binding",
  //           });
  //         }
  //       }
  //     }
  //   });
  // }


  doLogin: function() {
    var that = this;
    wx.login({
      success: function(res) {
        if (res.code) {
          that.requestUserInfo(res.code);
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      },
      fail: function(res) {
        console.log(res);
      }
    });
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

  //  获取用户信息
  requestUserInfo(code) {
    console.log('requestUserInfo')
    var that = this;
    wx.getUserInfo({
      withCredentials: true,
      success: function(res) {
        console.log(res);
        that.loginBuyuan(code, res.encryptedData, res.iv)
      },
      fail: function(res) {
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
      data: {
        'code': code,
        'encrypted_data': encryptedData,
        'iv': iv
      },
      success: function(res) {
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
  
})