import { $wuxPrompt } from '../../components/wux'
import { $wuxLoading } from '../../components/wux'
import { $wuxButton } from '../../components/wux'
import { $wuxToast } from '../../components/wux'
import { $wuxPicker } from '../../components/wux'
import { $wuxColorselector } from '../../components/wux'

Page({
  data: {
    heading:"订购记录",
    lastUrl:"",
    tabs: [],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth: 96,
    windowWidth: 0,
    order_loaded: [false, false, false, false, false],
    order_loading: [false, false, false, false, false],
    orders_data: [[], [], [], [], []],
    order_page: [-1, -1, -1, -1, -1],
    order_page_more: [true, true, true, true, true],
    show_username: false,
    has_zhifu_checked: false,
    animationData: {}
  },

  user_type: 'user',
  show_team: false,
  team_mode: true,

  user_tabs: ['进行中', '待接单', '待支付', '已完成'],
  tracker_tabs: ['待下单', '进行中', '已完成'],
  agent_tabs: ['待下单', '进行中', '已完成',],
  tab_status: [],
  user_tab_status: [
    'c,d,p,t,s',  // 进行中
    'n,m',  //  待接单
    'u',  //  未支付
    'f',  //  已完成
  ],
  agent_tab_status: [
    'n',  // 待下单
    'm,c,s,p,u',  //  进行中
    'f',  //  已完成
  ],
  tracker_tab_status: [
    'n',  // 待下单
    'm,c,s,p,u',  //  进行中
    'f',  //  已完成
  ],

  onLoad: function (options) {
    $wuxPrompt.init('msg_empty', {
      title: '空空如也',
      text: '暂时没有相关数据',
    }).show()

    var index = 0;
    if (options.tab) {
      index = parseInt(options.tab);
    }
    if (options.user_type) {
      this.user_type = options.user_type;
    }
    this.team_mode = (options.mode != 'personal');

    this.getSystemInfo();

    var tabs = [];
    var show_username = false;
    var show_team = false;
    if (this.user_type == 'user') {
      tabs = this.user_tabs;
      this.tab_status = this.user_tab_status;
      var role = wx.getStorageSync('user_role');
      show_team = (role == 'm' || role == 'p');
      show_username = show_team;
    } else if (this.user_type == 'agent') {
      tabs = this.agent_tabs;
      this.tab_status = this.agent_tab_status;
      show_username = true;
    } else if (this.user_type == 'tracker') {
      tabs = this.tracker_tabs;
      this.tab_status = this.tracker_tab_status;
      show_username = true;
    }

    var tabWidth = this.data.windowWidth / tabs.length;
    if (tabWidth < this.data.sliderWidth) {
      this.data.sliderWidth = tabWidth
    } else {
      this.data.sliderLeft = (tabWidth - this.data.sliderWidth) / 2
    }
    console.log(tabWidth, this.data.sliderWidth, this.data.sliderLeft)

    this.setData({
      tabs: tabs,
      activeIndex: index,
      sliderOffset: tabWidth * index,
      sliderWidth: this.data.sliderWidth,
      sliderLeft: this.data.sliderLeft,
      show_username: show_username,
      lastUrl: getApp().globalData.lastUrl,
    });

    console.log(this.data)
    this.show_team = show_team;

    if (show_team) {
      this.initButton();
    }
    this.loadOrderList(index);
  },

  onShow: function () {
    if (this.data.activeIndex == 0) {
      if (wx.getStorageSync('order_inprogress_changed')) {
        this.data.order_page[0] = -1;
        this.data.order_page[1] = -1;
        this.setData({
          order_page: this.data.order_page,
        })
        this.loadOrderList(0);
        this.loadOrderList(1);
      }
    } else {
      if (wx.getStorageSync('order_unpaid_changed')) {
        this.data.order_page[1] = -1;
        this.data.order_page[2] = -1;
        this.setData({
          order_page: this.data.order_page,
        })
        this.loadOrderList(1);
        this.loadOrderList(2);
      }
    }
    console.log('asd')
    getApp().globalData.lastUrl = '../order/general_order_list'
    this.setData({
      lastUrl: getApp().globalData.lastUrl,
    });
  },

  getSystemInfo() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.data.windowWidth = res.windowWidth
      }
    })
  },

  tabClick: function (e) {
    if (!this.data.order_loaded[e.currentTarget.id] &&
      !this.data.order_loading[e.currentTarget.id]) {
      this.loadOrderList(e.currentTarget.id);
    }
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    })
  },

  loadOrderList: function (index) {
    console.log(this.tab_status[index]);
    if (index == 0) {
      wx.removeStorageSync('order_inprogress_changed');
    } else if (index == 2) {
      wx.removeStorageSync('order_unpaid_changed');
    }
    var status = this.tab_status[index];
    var order_loading = this.data.order_loading;
    order_loading[index] = true;
    this.setData({
      order_loading: order_loading,
    });
    var page = this.data.order_page[index] + 1;
    this.showLoading();
    var that = this;
    console.log(wx.getStorageSync('cookie'))
    console.log(page);
    console.log(status);
    var url = 'https://by.edenhe.com/api/order/'
    if (this.user_type == 'user' && this.show_team && this.team_mode) {
      url = 'https://by.edenhe.com/api/order/team/'
    } else if (this.user_type == 'agent') {
      url = 'https://by.edenhe.com/api/order/agent/'
    } else if (this.user_type == 'tracker') {
      url = 'https://by.edenhe.com/api/order/tracker/'
    }
    console.log(url, page, status)
    wx.request({
      url: url,
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      data: {
        page: page,
        status: status,
      },
      success: function (res) {
        console.log(res.data);
        that.hideLoading();
        that.onRequestReturned(index, res.data.data);
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
        that.onRequestFailed(index);
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

  onRequestReturned: function (index, data) {
    var order_loading = this.data.order_loading;
    var order_loaded = this.data.order_loaded;
    var order_page = this.data.order_page;
    var order_page_more = this.data.order_page_more;
    order_loading[index] = true;
    order_loaded[index] = true;
    order_page[index] = order_page[index] + 1;
    order_page_more[index] = data.length >= 10;

    var orders_data = this.data.orders_data;
    console.log("set to", index);
    orders_data[index].push(...data);
    
    this.setData({
      order_loading: order_loading,
      order_loaded: order_loaded,
      order_page: order_page,
      order_page_more: order_page_more,
      orders_data: orders_data,
    })
  },

  onRequestFailed: function (index) {

  },

  onClickOrder: function (e) {
    var order_id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: 'order_detail?type=' + this.user_type + '&id=' + order_id });
  },

  loadMoreOrder: function (e) {
    this.loadOrderList(this.data.activeIndex);
  },

  initButton(position = 'bottomRight') {
    var that = this;
    this.setData({
      opened: !1,
    })

    this.button = $wuxButton.init('br', {
      position: position,
      buttons: [
        {
          label: '企业模式',
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAOGSURBVGje7VhLSFVRFF1HLROtLHtmhVJmz0c/NUstoQ84KAuSauKkdJDQh2pghRAFkTQwiKIoMppFk0ALKioKggbmQEJCsAQjKIMc9Ochymqg73Pf3ed+n4PgreG+e6+1zn7nnbvPBVJI4X8Dq3iOA5Twhq1cPZ3S63mPTnCNoeSL1/OnI/EIBrgpeeKVHHElHkEPV/gXz+QVT+IRnKLyIx/kuC/5yR+jwKt8nW/xCMq8yO9NmjxJ1rqV351UeZKsciNfk3R5kiyWtIQ9ygKMeNw21pjAHPU3MZhmkk/Do4TQHzz3IBfGg4RIOq47af9BU+uOAADX8q7jZrdzEQAIFXV28vkCXWn0aYB34uIf+ZJd7OYrfomLXmRWNH+nwDbL2kCnUJJjyNjIowyKtRU8zVWGSLHAdsJKvlBs6EwPO0Dfz4QFGTdhq8gzw6sByO1u1PnN1mypIDxCe5jHLTu+A1s1PPs8d6BFE18p+32i8ZvvuQMhDeMFKXmmJnmz5/UD4H6RM0whtURM7fUjDzBds6y5kYzYHlgjMrT5M6AmcEh8sMxsoFJM9NkBAE/FaHRujhkoFxN/+TYgv1kFA6VC2mc/E+UUxsToUrMBaXQc968PitGA2YB0bOYlwUCaGM00Pw4LaTm+pvoEKQOiajEDX8XEbN8GAmJ01GzgvZgoDpKuIN8Jhs0G3oqJDb4NHBCjg6YI92gOzXQ/6pytYS03d6Bfw7Hd1/qbNPFhU0T7NkwYoVytf4mGcSx2OEQ7oMbwTMPTRU9DGXO1Xe0Q/93cpe1BHxe6lg9RD/nNq50JJ3HMeR84nx2WXGm6wqtxSWeFbyOddvMRFXfwIa3Roi+Pvxf0s5gZPC9SfBJqGzlKZ7Da1LxlSN0AsE2gaBfX/tiR/HHrFgYS0ucxg79NJOIbgkWODFjfDQE2G9JvAgwmUHRrKsEftvLb7Hew4mtDSR7A5fwQF2nW1tp9Sb1hKw8AXGAoOjkVzeUWVttUXraU/27b/ijROkOh47eBjYEipzwAWG8ovW+3dgcGKlzIAwAbtFRNHgzU6Gp0hyJUN3Tfc9zPiWWqx7UBQL1AyG2NgCEsVv36x5ZkahBZMP913MxIZxBUll8dbVajwuowqvHNk4E+hFS7onWSg3aqXpWP+tggbXFfit0t3qFWVapBJBMs422SQ7G7vSmjkGGSl1iSVOEUUphe/AMv8ctn/pO1zAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNC0wNFQxMDo0MDo0MiswODowMNlOhSIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDQtMDRUMTA6NDA6NDIrMDg6MDCoEz2eAAAAAElFTkSuQmCC",
        },
        {
          label: '个人模式',
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAM3SURBVGje7VlNSBRRHP8/tU1dd7PNwkwiUqFIb5pGlJZEardIsOwi5iU6SF+XDhVBRFFJdKlbH0hdgkBIO3kptSKiEgKJWAikQrKgxLD9dZB982b2zex7b2ZZof2f/sv+vuYx8z5mGBkVYtRGzdRI1RSmWfpAYzRKI2zeTE3POorTcKtZ9KAgk+YRXEP6OoH8zNgfUDBPVnPQ5kUY1LAHgEvIC86+HDMO+UkcQpEt4EG8dWAmEAnGvtIh/Bg1LsgqPLIhZ7DSv32pw357Gvw2GzqOQn/2DKO2ay9R4JRgSODc8xegS5C6CPXYVwXeHnP7kCBzXYtJuM2ZC8bPA1q5yGfdGQ4hzHN2vTvOO1s37/azBb0A7A91WGzTEfjCr8FgckUhZ78ysycu8NuIzzh/2h0V3HRpWLkAuQC5ALkASzkAI0oeNIpUdwIu9ct0BKZ4Z3LcCPEubhrAWsVWGAQo5d070wDPebfJIIC1d35tGuAl7zpIv1p598aATUSEMF/R/+rfhvjG2Qp7aTeR91xkgyZzjXU28MKlmwesvfBhzeztvBswvn4irBU25iENHsN3ztvoIwARJrlQtwaribPmfE5iaBfGIKrIyUOcc3r8+RMKhAB3FDl9AifsMwAROgS5Ywr4RgF/1Lc9Ech2Qj6VBt0kYOewLIAAtmcaAPo9kLttyNpA7ImIUG8TdlmabKdpoDMweyIi7BCkm1wwmwVMr5qu4o4IMWoRfrpNScuFPiG+xPJ37eW4DHtVuiBXOXD9qjOHu/l63IKzRjzwD1PQZ1Fmal6DB0itYa/FFWE8k3AGUKFrXodhqXmdAncXPkm4dxUXJRAaMCERGES1cnzCVryQaAxhizeRYSemJMSbbredp1otnki0xtEgXR+Rj7aUN8IAcAGr9c25ahXuSzQ/ogXMPmRHIKuTMNmOO0Osww2J9k/sTQIiGJcA+lDs35yHKMN5iUccFYQSfE35o0tn+6UcIorjqRnIMTw/sC9DH1wWQxSj1xnAqjk0226NTIUIoRPTsgD+Py6oh4glTRmSD2WCZXDoUwIwSix2S/kFxX8SwLoHsjYCY9kOcC7LAdhTupJF/zP/AOvS/D0NTmDBAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTA0VDExOjQ3OjQ1KzA4OjAwI6N5UAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0wNFQxMTo0Nzo0NSswODowMFL+wewAAAAASUVORK5CYII=",
        },
      ],
      buttonClicked(index, item) {
        index === 0 && that.team_mode != 'team' && wx.redirectTo({
          url: '/pages/order/general_order_list?user_type=' + that.user_type + "&mode=team",
        });

        index === 1 && that.team_mode != 'personal' && wx.redirectTo({
          url: '/pages/order/general_order_list?user_type=' + that.user_type + "&mode=personal",
        });

        return true
      },
      callback(vm, opened) {
        vm.setData({
          opened,
        })
      },
    })
  },

  un_check_zhifu: function(e) {
    console.log(e)
    var orders_data = this.data.orders_data;
    orders_data[2][e.target.dataset.idx].checked = false;
    var flag = false;
    for (var i in orders_data[2]) {
      if (orders_data[2][i].checked) {
        flag = true;
        break;
      }
    }
    this.setData({
      has_zhifu_checked: flag,
      orders_data: orders_data
    })
    var screen_height;
    wx.getSystemInfo({
      success(res) {
        screen_height = res.screenHeight
      }
    })
    var that = this;
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'linear'
    })
    that.animation = animation
    animation.translateY((-1) * screen_height * 0.55).step()
    that.setData({
      animationData: animation.export()

    })
    console.log(that.data.animationData);
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },

  check_zhifu: function(e) {
    console.log(e);
    var orders_data = this.data.orders_data;
    orders_data[2][e.target.dataset.idx].checked = true;
    this.setData({
      orders_data: orders_data,
      has_zhifu_checked: true,
    })
    var screen_height;
    wx.getSystemInfo({
      success(res) {
        screen_height = res.screenHeight
      }
    })
    // 用that取代this，防止不必要的情况发生
    var that = this;
    // 创建一个动画实例
    var animation = wx.createAnimation({
      // 动画持续时间
      duration: 500,
      // 定义动画效果，当前是匀速
      timingFunction: 'linear'
    })
    // 将该变量赋值给当前动画
    that.animation = animation
    // 先在y轴偏移，然后用step()完成一个动画
    animation.translateY(screen_height * 0.55).step()
    // 用setData改变当前动画
    that.setData({
      // 通过export()方法导出数据
      animationData: animation.export()
    })
    console.log(that.data.animationData);
    // 设置setTimeout来改变y轴偏移量，实现有感觉的滑动
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },

  submit_zhifu: function(e) {

    var order_ids = ''
    var that = this;
    var flag = false;
    var orders_data = that.data.orders_data;
    for (var i in orders_data[2]) {
      if (orders_data[2][i].checked) {
        if (flag) {
          order_ids += ',';
        } else {
          flag = true;
        }
        order_ids += orders_data[2][i].id
      }
    }

    console.log(order_ids)
    wx.request({
      url: 'https://by.edenhe.com/api/pay/create/',
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: wx.getStorageSync('cookie'),
      },
      data: {
        'id': order_ids,
        'type': 'c',
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.data.online_pay) {
          that.preparePay(res.data.data.id);
        } else {
          $wuxToast.show({
            type: 'cancel',
            timer: 1500,
            color: '#fff',
            text: '大货仅支持线下'
          })
        }
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
        wx.navigateTo({
          url: '/pages/order/general_order_list',
        })
      }
    })
  },
})