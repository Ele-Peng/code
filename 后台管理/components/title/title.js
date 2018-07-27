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
      if (url != -1) {
        getApp().globalData.lastUrl = ""
        wx.navigateBack({
          delta: 1
        })
      } else {
        wx.switchTab({
          url: '../../pages/byindex/home_page',
        })
      }
    }
  }
})