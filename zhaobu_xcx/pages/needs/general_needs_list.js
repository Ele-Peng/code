import { $wuxPrompt } from '../../components/wux'
import { $wuxLoading } from '../../components/wux'
import { $wuxButton } from '../../components/wux'

Page({
  data: {
    heading: "找布记录",
    tabs: [],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth: 96,
    windowHeight: 0,
    windowWidth: 0,
    needs_loaded: [],
    needs_loading: [],
    needs_data: [[], [], [], []],
    needs_page: [-1, -1, -1, -1],
    needs_page_more: [true, true, true, true],
    show_username: false,
  },

  user_type: 'user',
  show_team: false,
  team_mode: true,

  tab_status: [],

  user_tab_status: [
    '2,3,6,a,c',  //  竞标，中标，有结果，寄样，继续找布
    '5',  //  已完成
    '1',  //  未支付
    '4,8,9'  //  已失效
  ],
  agent_tab_status: [
    '3,6,a,c',  //  中标，有结果，寄样
    '5',  //  已完成
    '4,8,9'  //  已失效
  ],
  tracker_tab_status: [
    '3,6,a,c',  //  中标，有结果，寄样
    '5',  //  已完成
    '4,8,9'  //  已失效
  ],

  user_tabs: ['进行中', '已完成', '待支付', '已失效'],
  agent_tabs: ['进行中', '已完成', '已失效'],
  tracker_tabs: ['进行中', '已完成', '已失效'],

  needs_changed_key: ['', '', '', ''],
  user_needs_changed_key: ['needs_inprogress_changed', '', 'needs_unpaid_changed', ''],

  onLoad: function (options) {

    this.setData({
      heading: "找布记录",
      tabs: [],
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: 0,
      sliderWidth: 96,
      windowHeight: 0,
      windowWidth: 0,
      needs_loaded: [],
      needs_loading: [],
      needs_data: [[], [], [], []],
      needs_page: [-1, -1, -1, -1],
      needs_page_more: [true, true, true, true],
      show_username: false,
    })
    var that = this;
    //获得title 标题栏组件
    this.title = this.selectComponent("#title");
    $wuxPrompt.init('msg_empty', {
      title: '空空如也',
      text: '暂时没有相关数据',
    }).show()

    this.team_mode = (options.mode != 'personal');
    var index = 0;
    if (options.tab) {
      index = parseInt(options.tab);
    }
    if (options.user_type) {
      this.user_type = options.user_type;
    }

    var tabs = [];
    var tab_status = [];
    var show_username = false;
    var show_team = false;
    if (this.user_type == 'user') {
      tabs = this.user_tabs;
      this.tab_status = this.user_tab_status;
      this.needs_changed_key = this.user_needs_changed_key;
      var role = wx.getStorageSync('user_role');
      console.log('role is', role)
      show_team = (role == 'm' || role == 'p');
      console.log('show_team is', show_team)
      show_username = show_team;
    } else if (this.user_type == 'agent') {
      tabs = this.agent_tabs;
      this.tab_status = this.agent_tab_status;
      show_username = true;
    } else {
      tabs = this.tracker_tabs;
      this.tab_status = this.tracker_tab_status;
      show_username = true;
    }
    this.show_team = show_team;

    if (show_team) {
      this.initButton();
    }

    this.getSystemInfo();
    var tabWidth = this.data.windowWidth / this.tab_status.length;
    if (tabWidth < this.data.sliderWidth) {
      this.data.sliderWidth = tabWidth
    } else {
      this.data.sliderLeft = (tabWidth - this.data.sliderWidth) / 2
    }
    console.log(tabWidth, this.data.sliderWidth, this.data.sliderLeft)

    this.setData({
      activeIndex: index,
      sliderOffset: this.data.sliderWidth * index,
      sliderLeft: this.data.sliderLeft,
      tabs: tabs,
      show_username: show_username,
      lastUrl: getApp().globalData.lastUrl,
    })
    getApp().globalData.lastUrl = "../needs/general_needs_list"

    this.loadNeedsList(index);
  },

  onShow: function () {
    var index = this.data.activeIndex;
    if (this.needs_changed_key[index] != '') {
      if (wx.getStorageSync(this.needs_changed_key[index])) {
        this.onLoad({tab: index})
      }
    }
  },

  getSystemInfo() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.data.windowWidth = res.windowWidth;
        that.data.windowHeight = res.windowHeight;
      }
    })
  },

  tabClick: function (e) {
    console.log(e);
    if (!this.data.needs_loaded[e.currentTarget.id] &&
      !this.data.needs_loading[e.currentTarget.id]) {
      this.loadNeedsList(e.currentTarget.id);
    }
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    })
  },

  loadMoreNeeds: function (e) {
    this.loadNeedsList(this.data.activeIndex);
  },

  loadNeedsList: function (index) {
    console.log(this.tab_status[index]);
    if (this.needs_changed_key[index] != '') {
      wx.removeStorageSync(this.needs_changed_key[index]);
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

    var data = {
      page: page,
      status: status,
    };
    var url = 'https://by.edenhe.com/api/needs/';
    if (this.user_type == 'user' && this.show_team && this.team_mode) {
      url = 'https://by.edenhe.com/api/needs/team/';
    } else if (this.user_type == 'agent') {
      url = 'https://by.edenhe.com/api/needs/agent/';
      data['mine'] = 1;
    } else if (this.user_type == 'tracker') {
      url = 'https://by.edenhe.com/api/needs/tracker/';
    }
    console.log(url)
    wx.request({
      url: url,
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      data: data,
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
    var needs_loading = this.data.needs_loading;
    var needs_loaded = this.data.needs_loaded;
    var needs_page = this.data.needs_page;
    var needs_page_more = this.data.needs_page_more;
    needs_loading[index] = true;
    needs_loaded[index] = true;
    needs_page[index] = needs_page[index] + 1;
    needs_page_more[index] = data.length >= 10;

    var needs_data = this.data.needs_data;
    console.log("set to", index);
    needs_data[index].push(...data);
    this.setData({
      needs_loading: needs_loading,
      needs_loaded: needs_loaded,
      needs_page: needs_page,
      needs_page_more: needs_page_more,
      needs_data: needs_data,
    })
    console.log(this.data.needs_data);
  },

  onRequestFailed: function (index) {

  },

  onClickNeeds: function (e) {
    var needs_id = e.currentTarget.dataset.id;
    console.log(e);
    wx.navigateTo({ url: 'detail?type=' + this.user_type + '&id=' + needs_id });
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
          url: '/pages/needs/general_needs_list?user_type=' + that.user_type + "&mode=team",
        });

        index === 1 && that.team_mode != 'personal' && wx.redirectTo({
          url: '/pages/needs/general_needs_list?user_type=' + that.user_type + "&mode=personal",
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

  touch_move: function(e) {
    // do something
  },

  onReachBottom: function() {
    console.log("下拉事件");
    if (this.data.needs_page_more[this.data.activeIndex]) {
      this.loadMoreNeeds();
    }
  },

  
})