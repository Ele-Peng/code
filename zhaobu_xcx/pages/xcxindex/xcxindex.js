// pages/xcxindex/xcxindex.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    // 页面初始化 options为页面跳转所带来的参数
    app.editTabBar3();//添加tabBar数据
    var that = this;
    wx.request({
      url: 'http://39.104.71.13:8001/index/',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.data)
        that.setData({
          detail: res.data.data,
          //res代表success函数的事件对，data是固定的
        });
      }
    })
  },

  clickMLYL: function(){
    wx.navigateTo({
      url: '../../pages/detail/detail',
    })
  },

  clickKSRG: function(){
    wx.navigateTo({
      url: '../../pages/ksrg/ksrg',
    })
  },

  clicksjd: function () {
    wx.navigateTo({
      url: '../../pages/wdsjd/wdsjd',
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
  onShareAppMessage: function () {

  },

  show_item: function (e) {
    wx.navigateTo({
      //url: '../twxx/twxx?cloth_id=' + e.target.dataset.cloth_id
      url: '../detail/detail'
    })
  },


  chose_image: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        wx.uploadFile({
          url: 'https://by.edenhe.com/api/shibie', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var data = res.data
            //do something
            console.log(res.data);
            var n = 0;
            for (var i in res.data.data) {
              that.data.cloth_list.push(res.data.data[i]);
              if (n % 2 == 0) {
                that.data.cloth_list_left.push(res.data.data[i]);
              } else {
                that.data.cloth_list_right.push(res.data.data[i]);
              }
              n += 1;
            }
            that.setData({
              cloth_list: that.data.cloth_list,
              cloth_list_left: that.data.cloth_list_left,
              cloth_list_right: that.data.cloth_list_right
            })

          }
        })
      }
    })
  },


})