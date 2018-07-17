// create.js

import { $wuxToast } from '../../components/wux'
import { $wuxLoading } from '../../components/wux' 
import { $wuxDialog } from '../../components/wux'
import { $wuxPickerCity } from '../../components/wux'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading:"新建收货地址",
    mode: "edit",
    selected_code: 0,
    selected_prov_id: "",
    selected_city_id: "",
    selected_prov: "",
    selected_city: "",
    selected_county: "",
    name: "",
    phone: "",
    detail: "",
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.title = this.selectComponent("#title");
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
  
  onClickCity: function(e) {
    $wuxPickerCity.init('city', {
      title: '请选择您所在的地区',
      value: [0, 0, 0],
      onChange(p) {
        console.log(p)
        var selected_prov = p.displayValues[0]
        var selected_city = p.displayValues[1]
        var selected_county = p.displayValues[2]
        if (selected_county == "") {
          selected_county = " "
        }
        var selected_code = p.value[2]
        if (selected_code == "") {
          selected_code = p.value[1]
        }
        this.setData({
          selected_county: selected_county,
          selected_prov: selected_prov,
          selected_city: selected_city,
          selected_code: selected_code,
        })
      },
    })
  },

  onSave: function (e) {
    if (this.data.name == "") {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请输入收件人姓名',
      });
    } else {
      var reg = /^1[0-9]{10}$/;
      var flag = reg.test(this.data.phone)
      if (!flag) {
        $wuxToast.show({
          type: 'forbidden',
          timer: 2000,
          color: '#fff',
          text: '请输入正确的手机号码',
        });
      }	else if (this.data.selected_county == "") {
      	$wuxToast.show({
          type: 'forbidden',
          timer: 2000,
          color: '#fff',
          text: '请选择所在的省市区县',
        });
      } else if (this.data.detail == "") {
      	$wuxToast.show({
          type: 'forbidden',
          timer: 2000,
          color: '#fff',
          text: '请输入详细的街道、小区地址',
        });
      } else {
      	console.log("ok");
      	this.createAddress();
      }
    } 
  },

  createAddress: function() {
  	this.showLoading()
  	var that = this;
  	console.log({'county': this.data.selected_code, 'detail': this.data.detail, 'name': this.data.name, 'phone': this.data.phone})
  	wx.request({
      url: 'https://by.edenhe.com/api/address/',
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync('cookie'),
      },
      data: {'county': this.data.selected_code, 'detail': this.data.detail, 'name': this.data.name, 'phone': this.data.phone},
      success: function (res) {
        console.log(res);
        that.hideLoading();
        wx.setStorageSync('address_changed', true);
        wx.navigateBack();
      },
      fail: function (res) {
      	console.log(res);
      	that.hideLoading();
      },
    });
  },

  showLoading: function() {
    $wuxLoading.show({
      text: '正在提交',
    });
  },

  hideLoading: function() {
    $wuxLoading.hide();
  },

  onInput: function (e) {
    if (e.target.id == "input-name") {
      this.setData({ name: e.detail.value });
    } else if (e.target.id == "input-phone") {
      this.setData({ phone: e.detail.value });
    } else if (e.target.id == "input-detail") {
      this.setData({ detail: e.detail.value });
    }
  },
})