import { $wuxLoading } from '../../components/wux'
import { $wuxDialog } from '../../components/wux'

// pages/team/team_members.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    role: '',
    managers: [],
    designers: [],
    purchasers: [],
    pendings: [],

    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    sliderWidth: 96,
    windowWidth: 0,
    tabs: ['团队成员', '待批准'],
    my_user_id: 0,
    heading: '团队成员',
    lastUrl: ''
  },

  team_code: undefined,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSystemInfo();
    var tabWidth = this.data.windowWidth / 2;
    if (tabWidth < this.data.sliderWidth) {
      this.data.sliderWidth = tabWidth
    } else {
      this.data.sliderLeft = (tabWidth - this.data.sliderWidth) / 2
    }
    console.log(tabWidth, this.data.sliderWidth, this.data.sliderLeft)
    this.team_code = options.code;
    this.setData({
      role: options.role,
      activeIndex: 0,
      sliderOffset: 0,
      sliderLeft: this.data.sliderLeft,
      my_user_id: wx.getStorageSync('user_id'),
    });

    console.log('my_user_id', wx.getStorageSync('user_id'));

    this.loadMembers();
  },

  getSystemInfo() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.data.windowWidth = res.windowWidth;
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

  removeUser: function(e) {
    console.log(e);
    var name = e.target.dataset.name;
    var user_id = e.target.dataset.user_id;
    var that = this;
    $wuxDialog.open({
      title: '移除成员',
      content: '确定要将' + name + '移除团队吗？',
      buttons: [
        {
          text: '我要移除',
          type: 'weui-dialog__btn_warn',
          onTap(e) {
            that.doRemoveUser(user_id);
          },
        },
        {
          text: '我按错了',
        },
      ],
    });
  },

  approveUser: function(e) {
    var name = e.target.dataset.name;
    var user_id = e.target.dataset.user_id;
    var that = this;

    $wuxDialog.open({
      title: '设置成员角色',
      content: '请设置' + name + '加入团队后的角色！',
      verticalButtons: !0,
      buttons: [
        {
          text: '管理员',
          onTap(e) {
            that.doChangeUser(user_id, 'm');
          },
        },
        {
          text: '设计师',
          onTap(e) {
            that.doChangeUser(user_id, 'd');
          },
        },
        {
          text: '采购员',
          onTap(e) {
            that.doChangeUser(user_id, 'p');
          },
        },
        {
          text: '稍后决定',
        },
      ],
    })
  },

  doApproveUser: function(user_id) {
    this.showLoading();
    var url = 'https://by.edenhe.com/api/team/' + this.team_code + '/approve/';
    var that = this;
    wx.request({
      url: url,
      method: 'post',
      data: {
        'user_id': user_id,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res);
        that.hideLoading();
        that.loadMembers();
      },
      fail: function (res) {
        that.hideLoading();
      }
    });
  },

  rejectUser: function(e) {
    var name = e.target.dataset.name;
    var user_id = e.target.dataset.user_id;
    var that = this;
    $wuxDialog.open({
      title: '拒绝加入',
      content: '确定要拒绝' + name + '的加入请求吗？',
      buttons: [
        {
          text: '残忍拒绝',
          type: 'weui-dialog__btn_warn',
          onTap(e) {
            that.doRemoveUser(user_id);
          },
        },
        {
          text: '稍后决定',
        },
      ],
    });
  },

  doRemoveUser: function(user_id) {
    this.showLoading();
    var url = 'https://by.edenhe.com/api/team/' + this.team_code + '/remove/';
    var that = this;
    wx.request({
      url: url,
      method: 'post',
      data: {
        'user_id': user_id,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res);
        that.hideLoading();
        that.loadMembers();
      },
      fail: function (res) {
        that.hideLoading();
      }
    });
  },

  changeUser: function (e) {
    console.log(e);
    var name = e.target.dataset.name;
    var user_id = e.target.dataset.user_id;

    var role = '';
    for (var i = 0; i < this.data.managers.length; i++) {
      if (this.data.managers[i].user_id == user_id) {
        role = 'm';
      }
    }
    if (role == '') {
      for (var i = 0; i < this.data.designers.length; i++) {
        if (this.data.designers[i].user_id == user_id) {
          role = 'd';
        }
      }
    }
    if (role == '') {
      for (var i = 0; i < this.data.purchasers.length; i++) {
        if (this.data.purchasers[i].user_id == user_id) {
          role = 'p';
        }
      }
    }

    var texts = [];
    var new_roles = [];
    if (role == '') {
      return;
    } else if (role == 'm') {
      texts = ['设计师', '采购员'];
      new_roles = ['d', 'p'];
    } else if (role == 'd') {
      texts = ['管理员', '采购员'];
      new_roles = ['m', 'p'];
    } else if (role == 'p') {
      texts = ['管理员', '设计师'];
      new_roles = ['m', 'd'];
    }

    var that = this;
    $wuxDialog.open({
      title: '修改成员角色',
      content: '请选择团队成员' + name + '的新角色！',
      verticalButtons: !0,
      buttons: [
        {
          text: texts[0],
          onTap(e) {
            that.doChangeUser(user_id, new_roles[0]);
          },
        },
        {
          text: texts[1],
          onTap(e) {
            that.doChangeUser(user_id, new_roles[1]);
          },
        },
        {
          text: '点错了',
        },
      ],
    });
  },

  doChangeUser: function(user_id, role) {
    this.showLoading();
    var url = 'https://by.edenhe.com/api/team/' + this.team_code + '/change/';
    var that = this;
    wx.request({
      url: url,
      method: 'post',
      data: {
        'user_id': user_id,
        'role': role,
      },
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res);
        that.hideLoading();
        that.loadMembers();
      },
      fail: function (res) {
        that.hideLoading();
      }
    })
  },

  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
    })
  },

  loadMembers: function() {
    var that = this;
    var url = 'https://by.edenhe.com/api/team/members/';
    wx.request({
      url: url,
      method: 'get',
      header: {
        'Cookie': wx.getStorageSync('cookie'),
      },
      success: function(res) {
        console.log(res);
        var mgs = [], dgs = [], prs = [], pds = [];
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].role == 'm') {
            mgs.push(res.data.data[i]);
          } else if (res.data.data[i].role == 'p') {
            prs.push(res.data.data[i]);
          } else if (res.data.data[i].role == 'd') {
            dgs.push(res.data.data[i]);
          } else if (res.data.data[i].pending) {
            pds.push(res.data.data[i]);
          }
        }
        that.setData({
          managers: mgs,
          designers: dgs,
          purchasers: prs,
          pendings: pds,
        });
      },
    })
  },

  showLoading: function () {
    $wuxLoading.show({
      text: '正在加载',
    });
  },

  hideLoading: function () {
    $wuxLoading.hide();
  },
})