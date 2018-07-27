// pages/byindex/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "后台管理系统",
    type: `grid`, 
    components: [
      {
        title: 'info',
        remark: '完善信息',
        url: '',
        icon: '../../assets/images/icon-info.png',
      },
      {
        title: 'provider',
        remark: '供应商设置',
        url: '',
        icon: '../../assets/images/icon-provider.png',
      },
      {
        title: 'price',
        remark: '价格设置',
        url: '',
        icon: '../../assets/images/icon-price.png',
      },
      {
        title: 'putPos',
        remark: '货位设置',
        url: '',
        icon: '../../assets/images/icon-putPos.png',
      },
      {
        title: 'duration',
        remark: '货期设置',
        url: '',
        icon: '../../assets/images/icon-duration.png',
      },
      {
        title: 'colorCount',
        remark: '色卡库存设置',
        url: '',
        icon: '../../assets/images/icon-colorCount.png',
      },
      {
        title: 'addGoods',
        remark: '添加近似商品',
        url: '',
        icon: '../../assets/images/icon-addGoods.png',
      },
      {
        title: 'download',
        remark: '下架',
        url: '',
        icon: '../../assets/images/icon-download.png',
      }
    ],
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  modSwitch(e) {
    this.setData({
      type: e.currentTarget.dataset.type,
    })
  },
})