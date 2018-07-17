import { $wuxPrompt } from '../../components/wux'
import { $wuxLoading } from '../../components/wux'

const sliderWidth = 96

Page({
  data: {
    tabs: ['进行中', '已完成', '已失效'],
    activeIndex: '0',
    sliderOffset: 0,
    sliderLeft: 0,
    needs_loaded: [false, false, false],
    needs_loading: [false, false, false],
    open_needs: [
    ],
    closed_needs: [
    ],
    invalid_needs: [
    ],
    needs_page: [-1, -1, -1],
    needs_page_more: [true, true, true],
  },

  tab_status: [
    '3,6,a,c',  //  中标，有结果，寄样
    '5',  //  已完成
    '4,8,9'  //  已失效
  ],

  onLoad() {
    $wuxPrompt.init('msg1', {
      title: '空空如也',
      text: '暂时没有相关数据',
    }).show()

    this.loadNeedsList(0);
    this.getSystemInfo();
  },

  getSystemInfo() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
        })
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

  loadNeedsList: function (index) {
    console.log(this.tab_status[index]);
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
      url: 'https://by.edenhe.com/api/needs/agent/',
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      data: {
        mine: 1,
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

  loadMoreNeeds: function (e) {
    this.loadNeedsList(this.data.activeIndex);
  },

  onRequestReturned: function (index, data) {
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
      invalid_needs: invalid_needs,
    })
  },

  onRequestFailed: function (index) {

  },

  onClickNeeds: function (e) {
    var needs_id = e.currentTarget.dataset.id;
    wx.navigateTo({ url: 'detail?type=agent&id=' + needs_id });
  },
})