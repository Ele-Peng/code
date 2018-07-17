// list.js
import { $wuxToast } from '../../components/wux'
import { $wuxLoading } from '../../components/wux'
import { $wuxDialog } from '../../components/wux'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "地址管理",
    lastUrl: "",
    addresses: [],
    inited: false,
    skip_tap_once: false,
    selected_mode: false,
    button_top: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      selected_mode: options.select
    })
    var that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          button_top: res.windowHeight + 14
        })
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
    //获得title 标题栏组件
    this.title = this.selectComponent("#title");
    if (!this.data.inited || wx.getStorageSync('address_changed')) {
      wx.setStorageSync('address_changed', false);
      this.loadAddresses();
    }
    getApp().globalData.lastUrl = '../order/order_list'
    this.setData({
      lastUrl: getApp().globalData.lastUrl,
    });
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

  loadAddresses: function () {
    this.showLoading();
    var that = this;
    console.log(wx.getStorageSync('cookie'))
    wx.request({
      url: 'https://by.edenhe.com/api/address/',
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          addresses: res.data.data,
          inited: true,
        });
        that.hideLoading();
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
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

  onDefaultAddrChanged: function (e) {
    var addresses = this.data.addresses;
    for (var i = 0; i < this.data.addresses.length; i++) {
      addresses[i].is_default = (addresses[i].id == e.target.id);
    }
    this.setData({
      addresses: addresses,
    });

    wx.request({
      url: 'https://by.edenhe.com/api/address/' + e.target.id + '/default/',
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
    });
  },

  onNewAddress: function (e) {
    if (this.data.addresses.length >= 5) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '您最多只能添加五个地址',
      });
    } else {
      wx.navigateTo({ url: 'create', });
    }
  },

  onLongTapAddress: function (e) {
    var that = this;
    this.setData({ skip_tap_once: true });
    var address_id = e.currentTarget.dataset.index;

    $wuxDialog.open({
      title: '确认删除',
      content: '确定要删除这条地址吗？',
      buttons: [
        {
          text: '我要删除',
          type: 'weui-dialog__btn_warn',
          onTap(e) {
            that.removeAddress(address_id);
          },
        },
        {
          text: '我按错了',
        },
      ],
    });
  },

  onTapAddress: function (e) {
    if (this.data.skip_tap_once) {
      this.setData({ skip_tap_once: false });
      return;
    } else {
      if (this.data.selected_mode) {
        var address_id = e.currentTarget.dataset.index;
        for (var i = 0; i < this.data.addresses.length; i++) {
          if (this.data.addresses[i].id == address_id) {
            console.log(this.data.addresses[i]);
            wx.setStorageSync('address_selected', JSON.stringify(this.data.addresses[i]));
            wx.navigateBack();
            return
          }
        }
      }
    }
  },

  removeAddress: function (id) {
    var addresses = this.data.addresses;
    for (var i = 0; i < addresses.length; i++) {
      if (addresses[i].id == id) {
        addresses.splice(i, 1);
        break;
      }
    }
    this.setData({
      addresses: addresses,
    });
    wx.request({
      url: 'https://by.edenhe.com/api/address/' + id + '/delete/',
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res);
      },
      fail: function (res) {
        console.log(res);
      },
    });
  },
  // 需要对接的接口
  onUpdateAddress: function (id) {
    wx:wx.navigateTo({
      url: '../../pages/address/update',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
})