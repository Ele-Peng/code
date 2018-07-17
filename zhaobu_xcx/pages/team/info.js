import { $wuxLoading } from '../../components/wux'
import { $wuxToast } from '../../components/wux'
import { $wuxDialog } from '../../components/wux'

// pages/team/info.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    team_info: undefined,
  },

  team_code: undefined,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var team_code = options.code;
    this.team_code = team_code;
    this.loadTeamInfo(team_code);
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

  /**
   * 用户点击右上角分享
   */
  loadTeamInfo: function (team_code) {
    this.showLoading();
    var url = 'https://by.edenhe.com/api/team/' + team_code + '/info/';
    var that = this;
    wx.request({
      url: url,
      method: 'get',
      header: {
        'Cookie': wx.getStorageSync('cookie'),
      },
      success: function(res) {
        console.log(res.data);
        that.setData({
          team_info: res.data.data,
        });
        that.hideLoading();
      },
      fail: function(res) {
        that.hideLoading();
      }
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

  joinTeam: function() {
    this.showLoading();
    var url = 'https://by.edenhe.com/api/team/' + this.team_code + '/apply/';
    var that = this;
    wx.request({
      url: url,
      method: 'post',
      header: {
        'Cookie': wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        that.hideLoading();
        if (res.data.error == 0) {
          $wuxDialog.open({
            title: '申请成功',
            content: '已经成功发出您的申请，请等待团队管理员批准。',
            buttons: [
              {
                text: '确定',
              },
            ],
          });
        } else {
          $wuxDialog.open({
            title: '申请失败',
            content: res.data.msg,
            buttons: [
              {
                text: '确定',
              },
            ],
          });
        }
      },
      fail: function (res) {
        that.hideLoading();
        $wuxToast.show({
          type: 'forbidden',
          timer: 2000,
          color: '#fff',
          text: '申请失败',
        });
      }
    })
  }
})