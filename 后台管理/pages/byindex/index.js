// pages/byindex/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigateToUrl: "",
    screen_height: 0,
    heading: "后台管理系统",
    isShow: false,
    type: `grid`, 
    amount: 0,
    components: [
      {
        title: 'season',
        remark: '季节设置',
        url: '../../pages/season/index',
        icon: '../../assets/images/icon-season.png',
      },
      {
        title: 'class',
        remark: '适用品类设置',
        url: '../../pages/class/index',
        icon: '../../assets/images/icon-class.png',
      },
      {
        title: 'price',
        remark: '价格设置',
        url: '../../pages/price/index',
        icon: '../../assets/images/icon-price.png',
      },
      {
        title: 'like',
        remark: '相似商品设置',
        url: '../../pages/like/index',
        icon: '../../assets/images/icon-putPos.png',
      },
      {
        title: 'duration',
        remark: '货期设置',
        url: '../../pages/duration/index',
        icon: '../../assets/images/icon-duration.png',
      },
      {
        title: 'colorCount',
        remark: '色卡库存设置',
        url: '../../pages/colorCount/index',
        icon: '../../assets/images/icon-colorCount.png',
      },
      {
        title: 'search',
        remark: '商品查询',
        url: '../../pages/search/index',
        icon: '../../assets/images/icon-search.png',
      },
      {
        title: 'detail',
        remark: '成分大小类',
        url: '../../pages/detail/index',
        icon: '../../assets/images/icon-detail.png',
      },
      {
        title: 'colorStyle',
        remark: '颜色样式设置',
        url: '../../pages/colorStyle/index',
        icon: '../../assets/images/icon-colorStyle.png',
      }
    ],
  },

  getSystemInfo() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          screen_height: res.windowHeight,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemInfo();
    this.doLogin();
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
    this.doLogin();
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

  modSwitch(e) {
    this.setData({
      type: e.currentTarget.dataset.type,
    })
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
      data: {
        'code': code,
        'encrypted_data': encryptedData,
        'iv': iv
      },
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
          if (!('phone' in res.data.data.binding)) {
            wx.redirectTo({
              url: "../welcome/binding",
            });
          }
        }
      }
    });
  },
  
  // 显示二维码搜索框和id输入框
  showQRCode : function (e) {
    var that = this;
    that.setData({
      isShow: true,
      navigateToUrl: e.currentTarget.dataset.urltext,
    })
  },

  //modal隐藏
  hideModal: function (e) {
    if (e) {
      let type = e.currentTarget.dataset.type;
      if (type == 'mask' && !this.data.backdrop) {
        return;
      }
    }
    if (this.data.isShow) this._toggleModal();
  },

  //modal显示
  showModal: function () {
    if (!this.data.isShow) {
      this._toggleModal();
    }
  },

  //切换modal的显示还是隐藏
  _toggleModal: function () {
    if (!this.data.animated) {
      this.setData({
        isShow: !this.data.isShow
      })
    }
    else {
      let isShow = !this.data.isShow;
      this._executeAnimation(isShow);
    }


  },

  //根据需求执行动画
  _executeAnimation: function (isShow) {

    let animation = this.animation;
    if (isShow) {

      animation.opacity(0).step();

      this.setData({
        animationData: animation.export(),
        isShow: true
      })

      setTimeout(function () {
        animation.opacity(1).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 50)
    }
    else {
      animation.opacity(0).step()
      this.setData({
        animationData: animation.export()
      })

      setTimeout(function () {
        this.setData({
          isShow: isShow
        })
      }.bind(this), this.data.animationOption.duration)

    }
  },

  _cancelModal: function (e) {
    this.setData({
      isShow: !this.data.isShow
    });
  },

  bindKeyInput: function (e) {
    console.log(e);
    this.setData({
      amount: parseInt(e.detail.value)
    })
  },

  _confirmModal: function (e) {
    var that = this;
    that.setData({
      isShow: !that.data.isShow
    });
    wx.navigateTo({
      url: that.data.navigateToUrl + "?cloth_id=" + that.data.amount,
    })
  },

  scanCode: function() {
    var that = this;
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res);
        var code = res.result
        code = code.split(':')[2]
        code = code.split('-')[0]
        that.setData({
          amount: code
        })
      }
    })
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
})