// pages/subscribe/subscribe.js
import {
  $wuxToast
} from '../../components/wux'
import {
  $wuxLoading
} from '../../components/wux'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "认购",
    lastUrl: "",
    detail: {},
    cloth_id: 0,
    chose_type: '大货',
    from_needs_id: '',
    from_order_id: '',
    selected_type_index: 0,
    type_range: ['大货', '样布'],
    cloth_id: '',
    price: '',
    unit: '',
    extras: {},
    extra_needed: true,
    total_price: 0,
    amount: 0,
    image_colors: [],
    chose_show_text: '',
    addresses: [],
    selected_address: -1,
    picker_addresses: [],
    receive_addr_id: -1,
    addr_inited: false,
    screen_height: 0,
    search_type: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemInfo();
    console.log(options);
    if (options.type == 0) {
      // 从详情页进来
      this.setData({
        result_id: options.result_id,
        cloth_id: options.cloth_id,
        search_type: options.type
      })
      this.loadAddresses();
    } else {
      var threshold = 0;
      if (!isNaN(options.threshold)) {
        threshold = parseInt(options.threshold);
      }
      this.setData({
        from_needs_id: options.needs_id,
        from_order_id: options.order_id,
        cloth_id: options.cloth_id,
        result_id: options.cloth_id,
        price: options.price,
        sample_price: options.sample_price,
        unit: options.unit,
        // extras: JSON.parse(options.extras),
        threshold: threshold,
      });
      this.loadAddresses();
    }
  },

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

  loadAddresses: function () {
    var that = this;
    wx.request({
      url: 'https://by.edenhe.com/api/address/',
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        var addresses = res.data.data;
        var address_diaplay_list = [];
        var selected_address = -1;
        var receive_addr_id = -1;
        for (var i = 0; i < addresses.length; i++) {
          address_diaplay_list.push(addresses[i].name + " " + addresses[i].phone + " " +
            addresses[i].prov_vb + addresses[i].city_vb + addresses[i].county_vb + addresses[i].detail);
          if (addresses[i].is_default) {
            selected_address = i;
            receive_addr_id = addresses[i].id;
          }
        }
        that.setData({
          addr_inited: true,
          addresses: addresses,
          picker_addresses: address_diaplay_list,
          selected_address: selected_address,
          receive_addr_id: receive_addr_id,
        });
        console.log(that.data)
      },
      fail: function (res) {
        console.log(res.data);
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

  loadClothColors: function (cloth_id) {
    var url = "https://by.edenhe.com/api/cloth/" + cloth_id + "/colors/";
    var that = this;
    console.log(url);
    wx.request({
      url: url,
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        var colors = res.data.data;
        for (var j = 0; j < colors.length; j++) {
          colors[j]['count'] = 0;
        }
        console.log(colors)
        if (colors.length > 0) {
          that.setData({
            image_colors: colors
          })
        } else {
          that.setData({
            image_colors: [{
              id: "color_id_default",
              image: {},
              code: "默认色卡",
              count: 0,
            }]
          })
        }
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

    var that = this;
    var result_id = that.data.result_id;
    that.loadClothColors(result_id);
    var url = 'https://by.edenhe.com/api/cloth/' + result_id + '/';

    wx.request({
      url: url,
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res)
        //将获取到的json数据，存在名字叫detail的这个数组中
        that.setData({
          detail: res.data.data,
          //res代表success函数的事件对，data是固定的
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

    getApp().globalData.lastUrl = '../order/general_order_list'
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

  chose_type: function (e) {
    this.setData({
      chose_type: e.currentTarget.dataset.chose_type
    })
  },

  bindKeyInput: function (e) {
    var idx = e.currentTarget.dataset.idx;
    var colors = this.data.image_colors;
    colors[idx].count = parseInt(e.detail.value);
    this.setData({
      image_colors: colors
    })
    this.update_status();
  },

  update_status: function () {

    var colors = this.data.image_colors;
    var tex = '';
    var price = 0;
    var that = this;

    if (that.data.chose_type == '样布') {
      price = that.data.detail.sample_price;
    } else {
      price = that.data.detail.price;
    }

    var flag = false;
    for (var i in colors) {
      if (colors[i].count != 0) {
        if (flag) {
          tex = tex + ',';
        }

        tex = tex + colors[i].code + '-' + colors[i].count;
        flag = true;
      }
    }
    that.setData({
      chose_show_text: tex
    })
  },

  join_shop_car: function () {

    var colors = this.data.image_colors;
    var price = 0;
    var sum = 0;
    var that = this;

    if (that.data.chose_type == '样布') {
      price = that.data.detail.sample_price;
    } else {
      price = that.data.detail.price;
    }

    var from_needs_id = this.data.from_needs_id;
    if (!from_needs_id || typeof (from_needs_id) == "undefined") {
      from_needs_id = 0;
    }
    var from_order_id = this.data.from_order_id;
    if (!from_order_id || typeof (from_order_id) == "undefined") {
      from_order_id = 0;
    }

    var address = this.get_default_address()
    if (address == -1) {
      return;
    }

    var data = {
      'needs': from_needs_id,
      'order': from_order_id,
      'cloth': this.data.result_id,
      'address': address,
    };

    if (that.data.chose_type == '样布') {
      data.is_sample = 1;
    } else {
      data.is_sample = 0;
    }

    for (var i in colors) {
      if (colors[i].count != 0) {
        data[colors[i].id] = colors[i].count;
        sum = sum + colors[i].count;
      }
    }

    data.amount = sum;
    if (data.amount == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请输入采购数量',
      });
      return;
    }
    if (data.amount < this.data.threshold) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '采购数量不能少于' + this.data.threshold,
      });
      return;
    }
    this.showLoading();
    console.log(data);

    wx.request({
      url: 'http://by.edenhe.com/api/cart/',
      method: 'post',
      header: {
        Cookie: wx.getStorageSync('cookie'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
      success: function (res) {
        console.log(res.data);
        that.hideLoading();
        wx.showToast({
          title: '加入成功',
        })
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    });
  },

  get_default_address: function() {
    var addresses = this.data.addresses

    for (var i in addresses) {
      if (addresses[i].is_default) {
        return addresses[i].id
      }
    }
    if (addresses.length > 0) {
      return addresses[0].id
    } else {
      wx.showToast({
        title: '暂无地址',
      })
      return -1
    }
  },

  onSubmit: function (e) {

    var colors = this.data.image_colors;
    var price = 0;
    var sum = 0;
    var that = this;

    if (that.data.chose_type == '样布') {
      price = that.data.detail.sample_price;
    } else {
      price = that.data.detail.price;
    }

    var address = this.get_default_address()
    if (address == -1) {
      return;
    }

    var data = {
      'cloth': this.data.result_id,
      'address': address,
    };

    if (that.data.chose_type == '样布') {
      data.is_sample = 1;
    } else {
      data.is_sample = 0;
    }

    for (var i in colors) {
      if (colors[i].count != 0) {
        data[colors[i].id] = colors[i].count;
        sum = sum + colors[i].count;
      }
    }

    if (sum == 0) {
      wx.showToast({
        title: '数量不能为0'
      })
      return
    }
    data.amount = sum;

    console.log(data);

    wx.request({
      url: 'https://by.edenhe.com/api/order/',
      method: 'post',
      header: {
        Cookie: wx.getStorageSync('cookie'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
      success: function (res) {
        wx.showToast({
          title: '下单成功',
        })
        console.log(res.data);
        wx.navigateTo({
          url: '../order/general_order_list?tab=1',
        })
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  onSubmit_2: function (e) {

    var colors = this.data.image_colors;
    var price = 0;
    var sum = 0;
    var that = this;

    if (that.data.chose_type == '样布') {
      price = that.data.detail.sample_price;
    } else {
      price = that.data.detail.price;
    }

    var address = this.get_default_address()
    if (address == -1) {
      return;
    }

    var data = {
      'cloth': this.data.result_id,
      'address': address,
    };

    if (that.data.chose_type == '样布') {
      data.is_sample = 1;
    } else {
      data.is_sample = 0;
    }

    for (var i in colors) {
      if (colors[i].count != 0) {
        data[colors[i].id] = colors[i].count;
        sum = sum + colors[i].count;
      }
    }

    data.amount = sum;

    console.log(data);

    wx.request({
      url: 'https://by.edenhe.com/api/order/',
      method: 'post',
      header: {
        Cookie: wx.getStorageSync('cookie'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
      success: function (res) {
        console.log(res.data);
        var order_id = res.data.data.id
        wx.request({
          url: 'https://by.edenhe.com/api/order/' + order_id + '/status/',
          method: 'POST',
          data: {
            'status': 'm',
            'remark': '系统自动确认',
          },
          header: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Cookie: wx.getStorageSync('cookie'),
          },
          success: function (res) {
            console.log(res)
            wx.request({
              url: 'https://by.edenhe.com/api/order/' + order_id + '/status/',
              method: 'POST',
              data: {
                'status': 'u',
                'remark': '系统自动确认',
              },
              header: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Cookie: wx.getStorageSync('cookie'),
              },
              success: function (res) {
                wx.request({
                  url: 'https://by.edenhe.com/api/pay/create/',
                  method: 'post',
                  header: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    Cookie: wx.getStorageSync('cookie'),
                  },
                  data: {
                    'id': order_id,
                    'type': 's',
                  },
                  success: function (res) {
                    console.log(res.data);
                    that.preparePay(res.data.data.id);
                  },
                  fail: function (res) {
                    console.log(res.data);
                    that.hideLoading();
                    that.showPaymentFailed();
                  }
                });
              },
              fail: function (res) {
                console.log(res.data);
              }
            })
          },
          fail: function (res) {
            console.log(res.data);
          }
        })
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },


  showPaymentOK: function () {
    $wuxToast.show({
      type: 'success',
      timer: 1500,
      color: '#fff',
      text: '提交成功',
      success: function () {
        wx.navigateBack();
      }
    })
  },
  showSubmitFailed: function () {
    $wuxToast.show({
      type: 'cancel',
      timer: 1500,
      color: '#fff',
      text: '提交失败',
    })
  },

  startPayment: function (needs_id) {
    this.showLoading();
    var that = this;
    console.log(wx.getStorageSync('cookie'))
    console.log(needs_id)
    wx.request({
      url: 'https://by.edenhe.com/api/pay/create/',
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: wx.getStorageSync('cookie'),
      },
      data: {
        'id': needs_id,
        'type': 'n',
      },
      success: function (res) {
        console.log(res.data);
        that.preparePay(res.data.data.id);
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
        that.showPaymentFailed();
      }
    });
  },

  preparePay: function (order_id) {
    var that = this;
    console.log(wx.getStorageSync('cookie'));
    wx.request({
      url: 'https://by.edenhe.com/api/pay/' + order_id + '/prepare/?platform=xc',
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        that.hideLoading();
        that.startWXPay(order_id, res.data.data);
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
        that.showPaymentFailed();
      }
    });
  },

  startWXPay(order_id, data) {
    // appid:"wxd931d7672c96f87d"
    // noncestr:"4dd937e9a341463bb718b6c5462a03ac"
    // package:"prepay_id=wx20170821231109664c2a5a390676680221"
    // sign:"55B40BFEE1BF8AA2B1CD4539183AA755"
    // signtype:"MD5"
    // timestamp:1503328269
    var that = this;
    wx.requestPayment({
      'appId': data.appid,
      'timeStamp': '' + data.timestamp,
      'nonceStr': data.noncestr,
      'package': data.package,
      'signType': data.signtype,
      'paySign': data.sign,
      'success': function (res) {
        console.log(res);
        that.showPaymentOK();
      },
      'fail': function (res) {
        console.log(res);
        that.showPaymentFailed();
      }
    })
  },

  showPaymentFailed: function () {
    $wuxToast.show({
      type: 'cancel',
      timer: 1500,
      color: '#fff',
      text: '支付失败',
      success: function () {
        wx.redirectTo({
          url: '/pages/order/general_order_list?tab=2',
        })
      }
    })
  },

  showPaymentOK: function () {
    wx.setStorageSync('needs_inprogress_changed', true)
    wx.setStorageSync('needs_unpaid_changed', true)
    $wuxToast.show({
      type: 'success',
      timer: 1500,
      color: '#fff',
      text: '支付成功',
      success: function () {
        wx.redirectTo({
          url: '/pages/order/general_order_list',
        })
      }
    })
  },
})