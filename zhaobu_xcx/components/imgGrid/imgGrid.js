Component({
  options: {
    multipleSlots: true
  },
  properties: {

  },
  methods: {
    // 四个入口应该进入四个带特征的商品列表页
    choseSelected_1() {
      wx.navigateTo({
        url: '../../pages/homePage/homePage',
      });
      console.log("ok");
    },

    choseSelected_2() {
      wx.navigateTo({
        url: '../../pages/homePage/homePage',
      });
      console.log("ok");
    },

    choseSelected_3() {
      wx.navigateTo({
        url: '../../pages/homePage/homePage',
      });
      console.log("ok");
    },

    choseSelected_4() {
      wx.navigateTo({
        url: '../../pages/homePage/homePage',
      });
      console.log("ok");
    },
  }
})