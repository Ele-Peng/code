// pages/gwc_2/gwc_2.js
import { $wuxToast } from '../../components/wux'
import { $wuxLoading } from '../../components/wux'


Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "购物车",
    gwc: {},
    isShow: false,
    init_gwc: {},
    last_sum: 0.00,
    checked: true,
    now_index: -1,
    now_index2: -1,
    start_pos_x: -1,
    last_pos_x: -1,
    amount: -1,
    edit_idx: -1,
    t_amount: '',
    screen_height: 0
  },

  showLoading: function () {
    $wuxLoading.show({
      text: '数据加载中',
    });
  },

  hideLoading: function () {
    $wuxLoading.hide();
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

  
  onLoad: function (options) {
    this.getSystemInfo();
  },


  get_card: function() {
    this.showLoading();
    var that = this;
    wx.request({
      url: 'https://by.edenhe.com/api/cart/',
      header: {
        'Content-Type': 'application/json',
        'Cookie': wx.getStorageSync('cookie')
      },
      success: function (res) {
        that.hideLoading();
        console.log(res)
        var sum = 0;
        var num = 0;
        for (var i in res.data.data) {
          res.data.data[i].checked = true;

          sum = sum + parseFloat(res.data.data[i].price);
          num += res.data.data[i].amount;
        }
        wx.setNavigationBarTitle({
          title: '购物车(' + num + ')'
        })
        sum = sum.toFixed(2);
        //将获取到的json数据，存在名字叫detail的这个数组中
        that.setData({
          gwc: res.data.data,
          init_gwc: res.data.data,
          last_sum: sum,
          now_index: -1,
          now_index2: -1,
          start_pos_x: -1,
          last_pos_x: -1,
          checked: true
          //res代表success函数的事件对，data是固定的
        });
      },
      fail: function (res) {
        that.hideLoading();
      }
    });
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
    this.get_card();
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

  checkAll: function () {
    var that = this;
    var checked = !that.data.checked;
    var sum = 0;
    var num = 0;
    for (var i in that.data.gwc) {
      that.data.gwc[i].checked = checked;
      if (checked) {
        sum = sum + parseFloat(that.data.gwc[i].price);
        num += that.data.gwc[i].amount;
      }
    }
    wx.setNavigationBarTitle({
      title: '购物车(' + num + ')'
    })

    that.setData({
      gwc: that.data.gwc,
      last_sum: sum,
      checked: checked
    });
  },

  onCheckIndex: function (e) {
    var that = this;
    var index = e.target.dataset.check_index;
    that.data.gwc[index].checked = !that.data.gwc[index].checked;

    var sum = 0;
    var num = 0;

    for (var i in that.data.gwc) {
      if (that.data.gwc[i].checked) {
        sum = sum + parseFloat(that.data.gwc[i].price);
        num += that.data.gwc[i].amount;
      }
    }

    wx.setNavigationBarTitle({
      title: '购物车(' + num + ')'
    })

    that.setData({
      gwc: that.data.gwc,
      last_sum: sum
    });
  },

  check_status: function () {
    var that = this;
    var sum = 0;
    var num = 0;

    for (var i in that.data.gwc) {
      if (that.data.gwc[i].checked) {
        sum = sum + parseFloat(that.data.gwc[i].price);
        num += that.data.gwc[i].amount;
      }
    }

    wx.setNavigationBarTitle({
      title: '购物车(' + num + ')'
    })

    sum = sum.toFixed(2);
    that.setData({
      gwc: that.data.gwc,
      last_sum: sum
    });
  },

  submit: function (e) {
    var temp_gwc = {};
    temp_gwc = [];
    var n = 0;
    // 遍历所有商品，并加入到订单中
    for (var i in this.data.gwc) {
      var flag = false;
      for (var j in this.data.gwc[i].items) {
        if (this.data.gwc[i].items[j].checked) {
          if (!flag) {
            temp_gwc.push({});
            temp_gwc[n].shop_name = this.data.gwc[i].shop_name;
            temp_gwc[n].shop_name = this.data.gwc[i].shop_id;
            temp_gwc[n].items = [];
            flag = true;
          }
          temp_gwc[n].items.push(this.data.gwc[i].items[j])
        }
      }
      if (flag) {
        n += 1;
      }
    }
    getApp().globalData.gwc = temp_gwc;
    wx.navigateTo({
      url: '../dfkdd/dfkdd',
    })
  },

  touch_start: function (e) {
    if (this.data.now_index != -1 && (e.currentTarget.dataset.idx != this.data.now_index)) {
      this.data.gwc[this.data.now_index].now_pos_x = 0;
      this.data.gwc[this.data.now_index].txt_style = "";
    }
    this.data.now_index = e.currentTarget.dataset.idx;
    this.data.start_pos_x = e.touches[0].pageX;
    this.data.last_pos_x = e.touches[0].pageX;
    if (this.data.now_index != -1 && this.data.gwc[this.data.now_index].now_pos_x) {

    } else {
      this.data.gwc[this.data.now_index].now_pos_x = 0;
    }
    this.setData({
      gwc: this.data.gwc,
      now_index: this.data.now_index,
    })
  },

  touch_move: function (e) {
    var n_index = e.currentTarget.dataset.idx;
    var now_pos_x = e.touches[0].pageX;
    this.data.last_pos_x = now_pos_x;
    if (n_index != this.data.now_index) {
      this.data.gwc[this.data.now_index].now_pos_x = 0;
      this.data.gwc[this.data.now_index].txt_style = "";
      this.data.now_index = n_index;
      this.data.now_index2 = this.data.now_index2;
    } else {
      var temp = now_pos_x - this.data.start_pos_x;
      temp = - temp / 4;
      if (temp < 0) {
        temp = 0;
      } else if (temp >= 40) {
        temp = 40;
      }
      this.data.gwc[this.data.now_index].now_pos_x = temp;
      this.data.gwc[this.data.now_index].txt_style = "margin-left: -" + temp + "px;";
    }
    this.setData({
      gwc: this.data.gwc,
      now_index: this.data.now_index,
    })
  },

  touch_cancel: function (e) {
    if (this.data.now_index != -1 && this.data.gwc[this.data.now_index].now_pos_x <= 24) {
      this.data.gwc[this.data.now_index].now_pos_x = 0;
      this.data.gwc[this.data.now_index].txt_style = "";
    } else {
      this.data.gwc[this.data.now_index].now_pos_x = 40;
      this.data.gwc[this.data.now_index].txt_style = "margin-left: -" + 40 + "px;";
    }
    this.setData({
      gwc: this.data.gwc,
      now_index: this.data.now_index,
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
  },

  delete_item: function(e) {
    console.log(e);
    var idx = e.currentTarget.dataset.idx;
    var that = this;

    wx.request({
      url: 'https://by.edenhe.com/api/cart/' + that.data.gwc[idx].id + '/remove/',
      method: 'POST',
      header: {
        Cookie: wx.getStorageSync('cookie'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        that.get_card();
        console.log(res.data);
        that.showPaymentOK();
      },
      fail: function (res) {
        console.log(res.data);
        that.showPaymentFailed();
      }
    });

  },

  onShowModal: function(e) {
    var that = this;
    console.log(e);
    that.setData({
      isShow: !that.data.isShow,
      amount: e.target.dataset.amount,
      edit_idx: e.target.dataset.idx,
      t_amount: ''
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

  _cancelModal: function(e) {
    this.setData({
      isShow: !this.data.isShow
    });
  },

  bindKeyInput: function(e) {
    console.log(e);
    this.setData({
      amount: parseInt(e.detail.value)
    })
  },

  _confirmModal: function(e) {
    var idx = this.data.edit_idx;
    var amount = this.data.amount;
    var that = this;

    var data = {
      'amount': amount
    };

    console.log(data)
    console.log(that.data.gwc[idx].id)
    wx.request({
      url: 'https://by.edenhe.com/api/cart/' + that.data.gwc[idx].id + '/change/',
      method: 'POST',
      header: {
        Cookie: wx.getStorageSync('cookie'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
      success: function (res) {
        that.get_card();
        console.log(res.data);
        that.setData({
          isShow: !that.data.isShow
        });
        that.showPaymentOK();
      },
      fail: function (res) {
        console.log(res.data);
        that.showPaymentFailed();
      }
    });
  }
})