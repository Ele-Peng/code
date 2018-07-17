import { $wuxToast } from '../../components/wux'
import { $wuxLoading } from '../../components/wux' 

// pages/team/create.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
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

  onSubmit: function(e) {
    console.log(e);
    var name = e.detail.value.name;
    if (name.length == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请填写团队名称',
      });
      return;
    }
    var that = this;
    that.showLoading();
    var url = 'https://by.edenhe.com/api/team/create/';
    wx.request({
      url: url,
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync('cookie'),
      },
      data: {
        'name': name,
      },
      success: function(res) {
        console.log(res);
        that.hideLoading();
        if (res.data.error == 0) {
          $wuxToast.show({
            type: 'success',
            timer: 2000,
            color: '#fff',
            text: '创建成功',
            success: function () {
              wx.setStorageSync('team_changed', '1');
              wx.navigateBack();
            }
          });
        } else {
          $wuxToast.show({
            type: 'success',
            timer: 2000,
            color: '#fff',
            text: res.data.msg,
          });
        }
      },
      fail: function(res) {
        that.hideLoading();
        $wuxToast.show({
          type: 'forbidden',
          timer: 2000,
          color: '#fff',
          text: '创建失败',
        });
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
})