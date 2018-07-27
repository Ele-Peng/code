// pages/welcome/binding.js
import { $wuxToast } from '../../components/by'
import { $wuxCountDown } from '../../components/by'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    screen_height: 0,
    phone: ""
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
   * 生命周期函数--监听页面初次渲染完成
   */
  onLoad: function () {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getSystemInfo();
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

  onInputPhone: function (e) {
    console.log(e)
    this.setData({
      phone: e.detail.value
    })
  },

  vcode: function () {
    var reg = /^1[0-9]{10}$/;
    var flag = reg.test(this.data.phone)
    if (!flag) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请输入正确的手机号码',
      });
      return
    }

    if (this.c2 && this.c2.interval) return !1
    this.c2 = new $wuxCountDown({
      date: +(new Date) + 60000,
      onEnd() {
        this.setData({
          c2: '重新获取验证码',
        })
      },
      render(date) {
        const sec = this.leadingZeros(date.sec, 2) + ' 秒 '
        date.sec !== 0 && this.setData({
          c2: sec,
        })
      },
    })
    this.requestVerifyCode();
  },

  requestVerifyCode: function () {
    var that = this;
    wx.request({
      url: 'https://by.edenhe.com/api/verify_code/',
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync('cookie'),
      },
      data: {
        phone: that.data.phone
      },
      success: function (res) {
        console.log(res);
        wx.hideLoading();
      },
      fail: function (res) {
        console.log(res);
        wx.hideLoading();
      },
    });
  },

  onSubmit: function(e) {
    console.log(e);

    if (e.detail.value.name.length == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请输入您的昵称',
      });
      return;
    }

    if (e.detail.value.company.length == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请输入您的公司名',
      });
      return;
    }

    if (e.detail.value.brand.length == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请输入您的品牌名',
      });
      return;
    }

    var reg = /^1[0-9]{10}$/;
    var flag = reg.test(this.data.phone);
    if (!flag) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请输入正确的手机号码',
      });
      return;
    };
    reg = /^[0-9]{6}$/;
    flag = reg.test(e.detail.value.code);
    if (!flag) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请输入正确的验证码',
      });
      return;
    };

    var data = e.detail.value;
    data['form_id'] = e.detail.formId;

    console.log(data);
    var that = this;
    wx.request({
      url: 'https://by.edenhe.com/api/bind/',
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync('cookie'),
      },
      data: data,
      success: function (res) {
        console.log(res);
        wx.hideLoading();
        if (res.data.error == 0) {
          $wuxToast.show({
            type: 'success',
            timer: 2000,
            color: '#fff',
            text: '绑定成功',
            success: () => wx.redirectTo({url: "../byindex/index?logged_in=1",})
          });
        } else {
          $wuxToast.show({
            type: 'forbidden',
            timer: 2000,
            color: '#fff',
            text: res.data.msg,
          });
        }
      },
      fail: function (res) {
        console.log(res);
        wx.hideLoading();
      },
    });
  },
})