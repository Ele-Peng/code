import { $wuxLoading } from '../../components/wux' 
import { $wuxToast } from '../../components/wux'
import { $wuxDialog } from '../../components/wux'

// pages/team/my_team.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    team_info: undefined,
    heading: '我的团队',
    lastUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTeamInfo();
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
    if (wx.getStorageSync("team_changed")) {
      wx.removeStorageSync("team_changed");
      this.getTeamInfo();
    }
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

  getTeamInfo: function() {
    var that = this;
    this.showLoading();
    this.setData({
      loading: true,
    })
    wx.request({
      url: 'https://by.edenhe.com/api/team/',
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        that.hideLoading();
        var team_info = {}
        if ('data' in res.data) {
          team_info = res.data.data;
        }
        that.setData({
          loading: false,
          team_info: team_info,
        })
      },
    });
  },

  onClickInvites: function() {
    wx.navigateTo({
      url: './qrcode?code=' + this.data.team_info.code,
    })
  },

  onClickMembers: function() {
    wx.navigateTo({
      url: './team_members?role=' + this.data.team_info.role +
       '&code=' + this.data.team_info.code,
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

  createTeam: function() {
    wx.navigateTo({
      url: './create',
    })
  },

  quitTeam: function() {
    var that  = this;
    $wuxDialog.open({
      title: '确认退出',
      content: '确定要退出当前团队吗？',
      buttons: [
        {
          text: '我要退出',
          type: 'weui-dialog__btn_warn',
          onTap(e) {
            that.doQuitTeam();
          },
        },
        {
          text: '我按错了',
        },
      ],
    });
  },

  doQuitTeam: function() {
    var url = 'https://by.edenhe.com/api/team/quit/';
    var that = this;
    wx.request({
      url: url,
      method: 'post',
      header: {
        'Cookie': wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res);
        that.hideLoading();
          $wuxToast.show({
            type: 'success',
            timer: 2000,
            color: '#fff',
            text: '退出成功',
            success: () => that.getTeamInfo()
          });
        }
      });
  },
})