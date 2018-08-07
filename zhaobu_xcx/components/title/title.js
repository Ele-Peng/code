Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    heading: {            // 属性名
      type: String,     // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '布源'     // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    lastUrl: {
      type: String,
      value: ""
    }
  },
  methods: {
    redToLast: function () {
      var url = getApp().globalData.lastUrl
      console.log(url);
      if (url == -2) {
        wx.showModal({
          title: '提示',
          content: '返回后再进入将扣除2积分，并且图片列表会刷新(积分为0, 5, 10时除外)',
          success: function (res) {
            if (res.confirm) {
              wx.switchTab({
                url: '../../pages/byindex/home_page',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else if (url == -1) {
        wx.switchTab({
          url: '../../pages/byindex/home_page',
        })
      } else {
        getApp().globalData.lastUrl = ""
        wx.navigateBack({
          delta: 1
        })
      }
    }
  }
})