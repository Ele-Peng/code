Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   * 用于组件自定义设置
   */
  properties: {
    searchRec: { // 属性名
      type: String, // 类型（必填），目前接受的类型包括：String, Number, Boolean, Object, Array, null（表示任意类型）
      value: '布源最新最热搜索' // 属性初始值（可选），如果未指定则会根据类型选择一个
    },
    backgroundCol: {
      type: String,
      value: 'white'
    },
    borderCol: {
      type: String,
      value: '#A5A29F'
    },
    is_redirect: {
      type: Number,
      value: 0
    },
    array: {
      type: Array,
      value: ['拍摄', '从手机相册选择']
    },
    index: {
      type: Number,
      value: 0
    },
    tempFilePaths: {
      type: Array,
      value: ''
    },
    cloth_id: {
      type: Number,
      value: -1
    },
    isShow: {
      type: Boolean,
      value: false
    },
    screen_height: {
      type: Number,
      value: 0
    }
  },
  methods: {
    takePhoto() {
      var that = this;
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {

          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths;
          that.setData({
            tempFilePaths: tempFilePaths,
            isShow: true
          })
        }
      });
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            screen_height: res.screenHeight
          })
          
        },
      })
    },

    search_index() {
      wx.navigateTo({
        url: '../../pages/search/search',
      })
    },
    onClickScan: function () {
      var that = this;
      var show;
      wx.scanCode({
        success: (res) => {
          var strs = res.result.split(':')

          strs = strs[2];

          var cloth_id = strs.split('-')[0];
          var db_id = strs.split('-')[1];

          wx.navigateTo({
            url: '../twxx/twxx?db_id=' + db_id + '&cloth_id=' + cloth_id
          })

          wx.showToast({
            title: '成功',
            icon: 'warn',
            duration: 2000
          })
        },
        fail: (res) => {
          $wuxToast.show({
            type: 'forbidden',
            timer: 2000,
            color: '#fff',
            text: '暂不支持该二维码的内容',
          });
        },
        complete: (res) => { }
      });
    },
    // bindPickerChange: function (e) {
    //   console.log('picker发送选择改变，携带值为', e.detail.value)
    //   this.setData({
    //     index: e.detail.value
    //   })
    //   if (index == 0) {

    //   }
    // },

    bindKeyInput: function (e) {
      console.log(e);
      this.setData({
        cloth_id: parseInt(e.detail.value)
      })
    },

    _cancelModal: function (e) {
      this.setData({
        isShow: !this.data.isShow
      });
    },
    _confirmModal: function () {
      var that = this
      upload(that, that.data.tempFilePaths);
      that.setData({
        isShow: false
      })
      function upload(page, path) {
        var data = {};
        if (that.data.cloth_id > 0) {
          data['sk_id'] = that.data.cloth_id
        }
        wx.showModal({
          title: '提示',
          content: '是否使用加强版',
          success: function (res) {
            if (res.confirm) {
              wx.showToast({
                icon: "loading",
                title: "正在上传"
              });
              data['is_softmax'] = true;
              console.log(data)
              wx.uploadFile({
                url: 'http://web.ngrok.52xygame.cn/check_image',
                filePath: path[0],
                name: 'img',
                data: data,
                header: {
                  "Content-Type": "multipart/form-data"
                },
                formData: data,
                success: function (res) {
                  var isFind = false
                  console.log(res.data);
                  if (res.statusCode != 200) {
                    wx.showModal({
                      title: '提示',
                      content: '上传失败',
                      showCancel: false
                    })
                  } else {
                    if (res.data.info) {
                      isFind = true
                    }
                  }
                  var app = getApp();
                  app.globalData.check_cloth_list = JSON.parse(res.data).data;
                  wx.redirectTo({
                    url: '../../pages/clothPreview_test/clothPreview?isFind=' + isFind,
                    success: function (res) {
                      app.globalData.lastUrl = -1;
                    }
                  })
                },
                fail: function (e) {
                  console.log(e);
                  wx.showModal({
                    title: '提示',
                    content: '上传失败',
                    showCancel: false
                  })
                },
                complete: function () {
                  wx.hideToast();  //隐藏Toast
                }
              })
            } else {
              wx.showLoading({
                icon: "loading",
                title: "正在上传"
              });
              console.log(data)
              wx.uploadFile({
                url: 'http://web.ngrok.52xygame.cn/check_image',
                filePath: path[0],
                name: 'img',
                header: {
                  "Content-Type": "multipart/form-data"
                },
                formData: data,
                success: function (res) {
                  var isFind = false
                  console.log(res.data);
                  if (res.statusCode != 200) {
                    wx.showModal({
                      title: '提示',
                      content: '上传失败',
                      showCancel: false
                    })
                    return;
                  } else {
                    if (res.data.info) {
                      isFind = true
                    }
                    var app = getApp();
                    app.globalData.check_cloth_list = JSON.parse(res.data).data;
                    wx.navigateTo({
                      url: '../../pages/clothPreview_test/clothPreview?isFind=' + isFind,
                    })
                  }
                  wx.hideLoading();
                },
                fail: function (e) {
                  console.log(e);
                  wx.showModal({
                    title: '提示',
                    content: '上传失败',
                    showCancel: false
                  })
                },
                complete: function () {
                  wx.hideLoading();  //隐藏Toast
                }
              })
            }
          }
        })
      }
    }
  },
})