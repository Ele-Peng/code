// pages/shelf/goods.js
import { $wuxPrompt } from '../../components/wux'
import { $wuxLoading } from '../../components/wux'
import { $wuxToast } from '../../components/wux'
import { $wuxDialog } from '../../components/wux'

Page({
  /**
   * 页面的初始数据
   */
  data: {
    detail: undefined,
    tabs: ['基本信息', '工艺属性'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth: 96,
    windowWidth: 0,
    windowHeight: 0,
    user_type: 'user',
  },

  goods_id: undefined,
  db_id: undefined,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.goods_id = options.goods_id;
    this.db_id = options.db_id;
    this.getSystemInfo();
    var tabWidth = this.data.windowWidth / this.data.tabs.length;
    if (tabWidth < this.data.sliderWidth) {
      this.data.sliderWidth = tabWidth
    } else {
      this.data.sliderLeft = (tabWidth - this.data.sliderWidth) / 2
    }
    console.log(tabWidth, this.data.sliderWidth, this.data.sliderLeft);

    this.setData({
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: this.data.sliderLeft,
      user_type: options.type,
    });

    this.loadGoodsDetail();
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

  getSystemInfo: function() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          windowWidth: res.windowWidth,
          windowHeight: res.windowHeight,
        })
      }
    })
  },

  loadGoodsDetail: function() {
    this.showLoading();
    var that = this;

    var url = 'https://by.edenhe.com/api/record/sample/' + this.goods_id + '/';
    if (typeof(this.db_id) != 'undefined') {
        url = url + this.db_id + '/';
    }
    console.log(url);
    wx.request({
      url: url,
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        that.hideLoading();
        that.onRequestReturned(res.data.data);
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
        that.onRequestFailed();
      }
    });
  },

  onRequestReturned(data) {
    if (!data.online) {
      $wuxDialog.open({
        title: '货品无效',
        content: '该货品尚未设置上架，如有需要请联系工作人员。',
        buttons: [
          {
            text: '确定',
            type: 'weui-dialog__btn_warn',
            onTap(e) {
              wx.navigateBack();
            },
          },
        ],
      });
      return;
    }
    this.setData({
      detail: data,
    });
  },

  onRequestFailed() {
    $wuxToast.show({
      type: 'forbidden',
      timer: 2000,
      color: '#fff',
      text: '加载失败',
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

  tabClick: function (e) {
    console.log(e);
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    })
  },

  onPurchase: function(e) {
    if (this.data.detail.price && this.data.detail.sample_price) {
      wx.navigateTo({
        url: '/pages/result/detail?type=user&from=shelf' + '&goods_id=' +
        this.goods_id,
      });
    } else {
      $wuxDialog.open({
        title: '货品信息不全',
        content: '该货品价格信息不全，请联系工作人员补充信息后采购。',
        buttons: [
          {
            text: '确定',
            type: 'weui-dialog__btn_warn',
          },
        ],
      });
      return;
    }
  },
})