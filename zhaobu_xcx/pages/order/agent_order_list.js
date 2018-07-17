import { $wuxPrompt } from '../../components/wux'
import { $wuxLoading } from '../../components/wux'

Page({
  data: {
    tabs: ['待下单', '进行中', '已完成',],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth: 96,
    windowWidth: 0,
    order_loaded: [false, false, false],
    order_loading: [false, false, false],
    open_order: [
    ],
    closed_order: [
    ],
    unpaid_order: [
    ],
    order_page: [-1, -1, -1],
    order_page_more: [true, true, true],
  },

  tab_status: [
    'n',  // 待下单
    'c,s,p',  //  进行中
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
    this.loadOrderList(index);
    this.getSystemInfo();

    var tabWidth = this.data.windowWidth / this.data.tabs.length;
    if (tabWidth < this.data.sliderWidth) {
      this.data.sliderWidth = tabWidth
    } else {
      this.data.sliderLeft = (tabWidth - this.data.sliderWidth) / 2
    }
    console.log(tabWidth, this.data.sliderWidth, this.data.sliderLeft)
    this.setData({
      activeIndex: index,
      sliderOffset: tabWidth * index,
      sliderWidth: this.data.sliderWidth,
      sliderLeft: this.data.sliderLeft,
    })
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
    wx.request({
      url: 'https://by.edenhe.com/api/order/agent/',
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
    var open_order = this.data.open_order;
    var closed_order = this.data.closed_order;
    var unpaid_order = this.data.unpaid_order;
    var invalid_order = this.data.invalid_order;
    if (index == 0) {
      console.log("set to", index);
      open_order.push(...data);
    } else if (index == 1) {
      console.log("set to", index);
      closed_order.push(...data);
    } else if (index == 2) {
      console.log("set to", index);
      unpaid_order.push(...data);
    } else {
      console.log("set to", index);
      invalid_order.push(...data);
    }
    this.setData({
      order_loading: order_loading,
      order_loaded: order_loaded,
      order_page: order_page,
      order_page_more: order_page_more,
      open_order: open_order,
      closed_order: closed_order,
      unpaid_order: unpaid_order,
    })
  },

  onRequestFailed: function (index) {

  },

  onClickOrder: function (e) {
    var order_id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: 'order_detail?type=agent&id=' + order_id });
  },

  loadMoreOrder: function (e) {
    this.loadOrderList(this.data.activeIndex);
  },
})