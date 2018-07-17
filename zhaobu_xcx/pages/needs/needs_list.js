import { $wuxPrompt } from '../../components/wux'
import { $wuxLoading } from '../../components/wux' 

var sliderWidth = 0;
var windowWidth = 0;

Page({
  data: {
    tabs: ['进行中', '已完成', '待支付', '已失效'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    needs_loaded: [false, false, false, false],
    needs_loading: [false, false, false, false],
    open_needs: [
    ], 
    closed_needs: [
    ],
    unpaid_needs: [
    ],
    invalid_needs: [
    ], 
    needs_page: [-1, -1, -1, -1],
    needs_page_more: [true, true, true, true],
  },

  tab_status: [
    '2,3,6,a,c',  //  竞标，中标，有结果，寄样，继续找布
    '5',  //  已完成
    '1',  //  未支付
    '4,8,9'  //  已失效
  ],

  onLoad: function(options) {
    $wuxPrompt.init('msg_empty', {
      title: '空空如也',
      text: '暂时没有相关数据',
    }).show()

    var index = 0;
    if (options.tab) {
      index = parseInt(options.tab);
    }
    this.loadNeedsList(index);
    this.getSystemInfo();
    this.setData({
      activeIndex: index,
      sliderOffset: sliderWidth * index,
    })
  },

  onShow: function() {
    if (this.data.activeIndex == 0) {
      if (wx.getStorageSync('needs_inprogress_changed')) {
        this.loadNeedsList(0)
      }
    } else if (this.data.activeIndex == 2) {
      if (wx.getStorageSync('needs_unpaid_changed')) {
        this.loadNeedsList(2)
      }
    }
  },

  getSystemInfo() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        sliderWidth = res.windowWidth / that.data.tabs.length
        windowWidth = res.windowWidth;
        console.log(windowWidth, sliderWidth)
      }
    })
  },

  tabClick: function (e) {
    if (!this.data.needs_loaded[e.currentTarget.id] && 
        !this.data.needs_loading[e.currentTarget.id]) {
      this.loadNeedsList(e.currentTarget.id);
    }
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    })
  },

  loadMoreNeeds: function(e) {
    this.loadNeedsList(this.data.activeIndex);
  },

  loadNeedsList: function (index) {
    console.log(this.tab_status[index]);
    if (index == 0) {
      wx.removeStorageSync('needs_inprogress_changed');
    } else if (index == 2) {
      wx.removeStorageSync('needs_unpaid_changed');
    }
    var status = this.tab_status[index];
    var needs_loading = this.data.needs_loading;
    needs_loading[index] = true;
    this.setData({
      needs_loading: needs_loading,
    });
    var page = this.data.needs_page[index] + 1;
    this.showLoading();
    var that = this;
    console.log(wx.getStorageSync('cookie'))
    wx.request({
      url: 'https://by.edenhe.com/api/needs/',
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

  onRequestReturned: function(index, data) {
    var needs_loading = this.data.needs_loading;
    var needs_loaded = this.data.needs_loaded;
    var needs_page = this.data.needs_page;
    var needs_page_more = this.data.needs_page_more;
    needs_loading[index] = true;
    needs_loaded[index] = true;
    needs_page[index] = needs_page[index] + 1;
    needs_page_more[index] = data.length >= 10;
    var open_needs = this.data.open_needs;
    var closed_needs = this.data.closed_needs;
    var unpaid_needs = this.data.unpaid_needs;
    var invalid_needs = this.data.invalid_needs;
    if (index == 0) {
      console.log("set to", index);
      open_needs.push(...data);
    } else if (index == 1) {
      console.log("set to", index);
      closed_needs.push(...data);
    } else if (index == 2) {
      console.log("set to", index);
      unpaid_needs.push(...data);
    } else {
      console.log("set to", index);
      invalid_needs.push(...data);
    }
    this.setData({
      needs_loading: needs_loading,
      needs_loaded: needs_loaded,
      needs_page: needs_page,
      needs_page_more: needs_page_more,
      open_needs: open_needs,
      closed_needs: closed_needs,
      unpaid_needs: unpaid_needs,
      invalid_needs: invalid_needs,
    })
  },

  onRequestFailed: function (index) {

  },

  onClickNeeds: function (e) {
    var needs_id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: 'detail?type=user&id=' + needs_id });
  },
})