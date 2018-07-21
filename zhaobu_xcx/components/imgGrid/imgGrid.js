Component({
  options: {
    multipleSlots: true
  },
  properties: {

  },
  methods: {
    // 四个入口应该进入四个带特征的商品列表页
    // 后期优化应携带特征id
    choseSelected_1() {
      wx.request({
        url: 'https://by.edenhe.com/api/selected/boutique',
        header: {
          Cookie: wx.getStorageSync('cookie'),
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success: function (res) {
          if (res.data.length === null) {
            wx.navigateTo({
              url: '../../pages/byindex/none',
            })
          } else {
            wx.navigateTo({
              url: '../../pages/clothPreview/clothPreview?type=1',
            })
          }
        }
      })
      console.log("ok");
    },

    choseSelected_2() {
      wx.request({
        url: 'https://by.edenhe.com/api/selected/newest',
        header: {
          Cookie: wx.getStorageSync('cookie'),
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success: function (res) {
          if (res.data.length == null) {
            wx.navigateTo({
              url: '../../pages/byindex/none',
            })
          } else {
            wx.navigateTo({
              url: '../../pages/clothPreview/clothPreview?type=2',
            })
          }
        }
      })
      console.log("ok");
    },

    choseSelected_3() {
      wx.navigateTo({
        url: '../../pages/clothPreview/clothPreview?type=3',
      })
      console.log("ok");
    },

    choseSelected_4() {
      wx.request({
        url: 'https://by.edenhe.com/api/selected/popular',
        header: {
          Cookie: wx.getStorageSync('cookie'),
          'content-type': 'application/json' // 默认值
        },
        method: 'GET',
        success: function (res) {
          if (res.data.length == null) {
            wx.navigateTo({
              url: '../../pages/byindex/none',
            })
          } else {
            wx.navigateTo({
              url: '../../pages/clothPreview/clothPreview?type=4',
            })
          }
        } 
      })
      
      console.log("ok");
    },
  }
})