// neworder.js
import { $wuxToast } from '../../components/wux'
import { $wuxLoading } from '../../components/wux'
import { $wuxPicker } from '../../components/wux'
import { $wuxColorselector } from '../../components/wux'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide_text_area: false,  //  textarea层级最高，对话框盖不住
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
    addresses: [],
    selected_address: -1,
    picker_addresses: [],
    receive_addr_id: -1,
    addr_inited: false,
    threshold: 0,
    colors_choices: false,
  },

  hidecolors: null,

  image_colors: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var threshold = 0;
    if (!isNaN(options.threshold)) {
      threshold = parseInt(options.threshold);
    }
    this.setData({
      from_needs_id: options.needs_id,
      from_order_id: options.order_id,
      cloth_id: options.cloth_id,
      price: options.price,
      sample_price: options.sample_price,
      unit: options.unit,
      extras: JSON.parse(options.extras),
      threshold: threshold,
    });
    this.loadClothColors(options.cloth_id);
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
    if (!this.data.addr_inited || wx.getStorageSync('address_changed')) {
      wx.setStorageSync('address_changed', false);
      this.loadAddresses();
    }
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

  showLoading: function () {
    $wuxLoading.show({
      text: '数据加载中',
    });
  },

  hideLoading: function () {
    $wuxLoading.hide();
  },

  typeChanged: function (p) {
    var t = parseInt(p);
    console.log(t);

    if (t == this.data.selected_type_index) {
      return;
    }

    for (var j = 0; j < this.image_colors.length; j++) {
      this.image_colors[j].count = 0;
    }

    this.setData({
      total_price: 0,
      amount: 0,
      selected_type_index: t,
      colors_choices: '',
    });
  },

  extraNeededChange: function (e) {
    this.setData({
      extra_needed: e.detail.value,
    })
    this.resetAmount(this.data.amount);
  },

  onTapSelectColors: function(e) {
    console.log('image_colors', this.image_colors);
    var unit = this.data.unit;
    if (this.data.selected_type_index == 1) { //  样布
      unit = '米';
    }
    var that = this;
    this.hidecolors = $wuxColorselector.open({
      buttons: [
        {
          text: '确定',
          type: 'weui-dialog__btn_primary',
          onTap(e) {
          },
        },
        {
          text: '取消',
        },
      ],
      colors: this.image_colors,
      unit: unit,
    })

    that.setData({
      hide_text_area: true,
    })
  },

  bindCancelColors: function(e) {
    this.setData({
      hide_text_area: false,
    });
    this.hidecolors();
  },

  bindSubmitColors: function (e) {
    console.log(e);
    var total = 0;
    var desc = "";
    var that = this;

    var unit = this.data.unit;
    if (this.data.selected_type_index == 1) { //  样布
      unit = '米';
    }

    Object.keys(e.detail.value).forEach(function (key) {
      console.log(key, e.detail.value[key]);
      var c = parseFloat(e.detail.value[key]);
      if (c > 0) {
        var name = key;
        for (var j = 0; j < that.image_colors.length; j++) {
          if (that.image_colors[j].id == key) {
            that.image_colors[j].count = c;
            name = that.image_colors[j].code;
          }
        }

        if (desc.length > 0) {
          desc += ', '
        }
        desc += name;
        desc += ' - ';
        desc += c;
        desc += unit;
      }
      total += c;
    });
    if (total > 0) {
      var prefix = "共计";
      prefix += total;
      prefix += unit;
      desc = prefix + ", 其中: " + desc + "。";
      console.log(desc);
      that.setData({
        colors_choices: desc,
        hide_text_area: false,
      })
    } else {
      that.setData({
        colors_choices: false,
        hide_text_area: false,
      })
    }
    that.resetAmount(total);
    this.hidecolors();
  },

  resetAmount: function(amount) {
    var total_price = 0;
    if (this.data.selected_type_index == 0) {
      total_price = amount * this.data.price;
      if (this.data.extra_needed && ("extra" in this.data.extras) && this.data.extras.extra.length > 0) {
        total_price = total_price + this.data.extras.price * amount
      }
    } else {
      total_price = amount * this.data.sample_price;
    }
    this.setData({
      total_price: total_price.toFixed(2),
      amount: amount,
    });
  },

  onSubmit: function(e) {
    var remark = e.detail.value.remark;
    if (this.data.receive_addr_id <= 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请选择收货地址',
      });
      return;
    }
    if (this.data.amount == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请输入采购数量',
      });
      return;
    }
    if (this.data.amount < this.data.threshold) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '采购数量不能少于' + this.data.threshold,
      });
      return;
    }
    this.showLoading();
    var that = this;
    var from_needs_id = this.data.from_needs_id;
    if (!from_needs_id || typeof(from_needs_id) == "undefined") {
      from_needs_id = 0;
    }
    var from_order_id = this.data.from_order_id;
    if (!from_order_id || typeof (from_order_id) == "undefined") {
      from_order_id = 0;
    }

    console.log('from_needs_id', from_needs_id);
    console.log('from_order_id', from_order_id);
    var data = {
      'needs': from_needs_id,
      'order': from_order_id,
      'amount': this.data.amount,
      'cloth': this.data.cloth_id,
      'address': this.data.receive_addr_id,
      'is_sample': this.data.selected_type_index,
      'remark': remark,
    };
    if (this.data.extra) {
      data['extra'] = this.data.extra.id;
    }
    for (var j = 0; j < this.image_colors.length; j++) {
      if (this.image_colors[j].count > 0) {
        data[this.image_colors[j].id] = this.image_colors[j].count;
      }
    }
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
        that.hideLoading();
        that.showPaymentOK();
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
        that.showPaymentFailed();
      }
    });
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
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },

  onSelectAddress: function () {
    var values = this.data.picker_addresses;
    var that = this;
    var selected_index = this.data.selected_address;
    if (selected_index == -1) {
      selected_index = 0;
    }
    console.log(values);
    $wuxPicker.init('addresses', {
      title: "请选择收货地址",
      cols: [
        {
          textAlign: 'center',
          values: values,
        }
      ],
      value: [selected_index],
      onChange(p) {
        console.log(p)
        this.setData({
          selected_address: p.valueIndex[0],
          receive_addr_id: that.data.addresses[p.valueIndex[0]].id,
        });
      },
    });
  },

  onSelectOrderType: function () {
    var values = this.data.type_range;
    var that = this;
    console.log(values);
    $wuxPicker.init('ordertype', {
      title: "请选择采购类型",
      cols: [
        {
          textAlign: 'center',
          values: values,
        }
      ],
      value: [0],
      onChange(p) {
        console.log(p);
        that.typeChanged(p.valueIndex[0]);
      },
    });
  },

  showSubmitFailed: function () {
    $wuxToast.show({
      type: 'cancel',
      timer: 1500,
      color: '#fff',
      text: '提交失败',
    })
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

  loadClothColors: function(cloth_id) {
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
          that.image_colors = colors;
        } else {
          that.image_colors = [{
            id: "color_id_default",
            image: {},
            code: "默认色卡",
            count: 0,
          }];
        }
      },
      fail: function (res) {
        console.log(res.data);
      }
    });
  },
})