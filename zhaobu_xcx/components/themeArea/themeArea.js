Component({
  options: {
    multipleSlots: true //--> 在组件定义时启用组件支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  propertities: {

  },
  methods: {
    onClickClothPreview: function () {
      wx.navigateTo({
        url: '../../pages/clothPreview/clothPreview',
      })
    },
    onClickKSRG: function () {
      wx.navigateTo({
        url: '../../pages/ksrg/ksrg',
      })
    },
    onClickSJD: function () {
      wx.navigateTo({
        url: '../../pages/sjd/sjd',
      })
    }
  }

})