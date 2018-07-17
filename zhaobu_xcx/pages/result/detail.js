// detail.js
import { $wuxToast } from '../../components/wux'
import { $wuxLoading } from '../../components/wux'
import { $wuxDialog } from '../../components/wux'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading:"布料详情",
    lastUrl:"",
    detail: {},
    extras: {},
    needs_id: '',
    goods_id: '',
    order_id: '',
    result_id: '',
    user_type: '',
    from_src: '',
    empty_images: [],
    image_block_size: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var needs_id = options.needs_id;
    var order_id = options.order_id;
    var result_id = options.id;
    var goods_id = options.goods_id;

    console.log(result_id);
    this.setData({
      needs_id: needs_id,
      order_id: order_id,
      result_id: result_id,
      user_type: options.type,
      from_src: options.from,
      goods_id: goods_id,
      lastUrl: getApp().globalData.lastUrl,
    });
    this.getSystemInfo();
    this.loadResultDetail();

    if (typeof(result_id) != 'undefined') {
      this.loadResultExtras();
    }
  },

  getSystemInfo() {
    const that = this;
    wx.getSystemInfo({
      success(res) {
        that.setData({
          image_block_size: (res.windowWidth - 75) / 4 + 'px',
          button_top: res.windowHeight - 45,
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
    if (wx.getStorageSync('result_detail_changed')) {
      wx.removeStorageSync('result_detail_changed');

      this.loadResultDetail();
      this.loadResultExtras();
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

  loadResultDetail: function() {
    this.showLoading();
    var that = this;
    var url = '';
    var result_id = this.data.result_id;
    if (this.data.from_src == 'shelf') {
      url = 'https://by.edenhe.com/api/cloth/from_goods/' + this.data.goods_id + "/";
    } else {
      url = 'https://by.edenhe.com/api/cloth/' + result_id + "/";
    }
    console.log(wx.getStorageSync('cookie'))
    wx.request({
      url: url,
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        var empty = [];
        if (res.data.data.images.length <= 3) { //  用占位符补齐第一行
          for (var i = 4 - res.data.data.images.length; i > 0; i--) {
            empty.push(i);
          }
        } else if (res.data.data.images.length > 4 && res.data.data.images.length <= 7) {  //  用占位符补齐第二行
          for (var i = 8 - res.data.data.images.length; i > 0; i--) {
            empty.push(i);
          }
        }

        that.setData({ 
          result_id: res.data.data.id,
          detail: res.data.data,
          empty_images: empty,
        });
        that.hideLoading();
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    });
  },

  loadResultExtras: function () {
    var that = this;
    var result_id = this.data.result_id;
    console.log(wx.getStorageSync('cookie'))
    wx.request({
      url: 'https://by.edenhe.com/api/cloth/' + result_id + "/extras/",
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.data.length > 0) {
          that.setData({ extras: res.data.data[0] });
        }
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

  onPurchase: function (e) {
    console.log(e.currentTarget);
    var extra_str = JSON.stringify(this.data.extras);
    var url = '../subscribe/subscribe?cloth_id=' + this.data.result_id + '&price=' + this.data.detail.price + '&unit=' + this.data.detail.display_unit + '&extras=' + extra_str +
      '&sample_price=' + this.data.detail.sample_price + '&threshold=' +
      this.data.detail.threshold;
    if (this.data.needs_id && typeof (this.data.needs_id) != 'undefined') {
      url += ('&needs_id=' + this.data.needs_id)
    }
    if (this.data.order_id && typeof (this.data.order_id) != 'undefined') {
      url += ('&order_id=' + this.data.order_id)
    }
    wx.navigateTo({
      url: url,
    });
  },

  onModify: function (e) {
    var url = '../result/submit?needs_id=' + this.data.needs_id + '&result_id=' 
        + this.data.result_id;
    if ('extra' in this.data.extras) {
      url = url + '&extra=' + encodeURI(this.data.extras.extra) 
          + '&extra_price=' + this.data.extras.price
    }
    console.log(url)
    wx.redirectTo({
      url: url
    });
  },

  onPreviewShopImage: function(e) {
    var urls = [];
    urls.push(this.data.detail.shop_img.url);
    wx.previewImage({
      current: this.data.detail.shop_img.url,
      urls: urls,
    });
  },

  onPreviewImage: function (e) {
    var index = e.currentTarget.dataset.index;
    var urls = [];
    for (var i = 0; i < this.data.detail.images.length; i++) {
      urls.push(this.data.detail.images[i].url);
    }

    wx.previewImage({
      current: urls[parseInt(index)],
      urls: urls,
    });
  },
})