import { $wuxToast } from '../../components/wux'
import { $wuxLoading } from '../../components/wux'
import { $wuxDialog } from '../../components/wux'

// pages/order/agent.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selected_images: [
    ],
    heading: "上传信息",
    empty_images: [], //  上传图片里的占位符，让布局更好看一些
    image_block_size: '0',
    screen_height: 0,
    input_desc: '',
    order_id: -1,
    order_status: 'n',
    user_type: '',
    status: {
      'n': '接单',
      'c': '开始发货',
      'p': '结束发货',
    },
    upload_title_dict: {
      'n': '上传码单',
      's': '上传快递单',
      'p': '上传快递单',
      'c': '上传图片(可选)',
    },
    status_next: {
      'n': 'm',
      'm': 'u',
      'u': 'c',
      'c': 'p',
      'p': 's',
      's': 'f',
      'f': 'i',
      'i': 'i'
    }
  },

  getSystemInfo() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          image_block_size: (res.windowWidth - 75) / 4 + 'px',
          screen_height: res.windowHeight,
        })
        console.log(that.data.image_block_size);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var order_id = options.id;
    var order_status = options.status;
    var user_type = options.type;
    console.log(options)
    this.setData({
      order_id: order_id,
      order_status: order_status,
      user_type: user_type
    });
    this.getSystemInfo();
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
    getApp().globalData.lastUrl = '../order/order_list'
    this.setData({
      lastUrl: getApp().globalData.lastUrl,
    });
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

  onInput: function (e) {
    this.setData({ input_desc: e.detail.value })
  },

  onLongTapImage: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    $wuxDialog.open({
      title: '确认删除',
      content: '确定要删除这张图片吗？',
      buttons: [
        {
          text: '我要删除',
          type: 'weui-dialog__btn_warn',
          onTap(e) {
            that.removeImage(index);
          },
        },
        {
          text: '我按错了',
        },
      ],
    })
  },

  removeImage: function (idx) {
    var imgs = this.data.selected_images;
    imgs.splice(idx, 1);
    this.onSelectedImagesChanged(imgs);
  },

  selectImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1 - that.data.selected_images.length,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var temp_file_paths = []
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          temp_file_paths.push(
            {
              'remote': '',
              'index': temp_file_paths.length,
              'path': res.tempFilePaths[i],
              'uploading': true,
              'uploadResult': true,
              'progress': 0,
            }
          );
        }
        temp_file_paths = that.data.selected_images.concat(temp_file_paths);
        that.onSelectedImagesChanged(temp_file_paths);
        that.startUploading();
      }
    })
  },

  onSelectedImagesChanged: function (images) {
    var empty_file_paths = [];
    if (images.length < 1) { //  用占位符补齐第一行
      for (var i = 1 - images.length; i > 0; i--) {
        empty_file_paths.push(i);
      }
    }
    this.setData({
      selected_images: images,
      empty_images: empty_file_paths
    });
  },

  startUploading: function () {
    var have_upload_jobs = false;
    for (var i = 0; i < this.data.selected_images.length; i++) {
      if (this.data.selected_images[i].uploading) {
        have_upload_jobs = true;
        console.log(this.data.selected_images[i]);
        this.doUploading(this.data.selected_images[i].path)
      }
    }
    if (!have_upload_jobs) {
      console.log("no upload jobs left")
    }
  },

  doUploading: function (path) {
    console.log("uploading " + path)
    var that = this
    var uploadTask = wx.uploadFile({
      url: 'https://by.edenhe.com/api/upload/image/',
      filePath: path,
      name: 'image',
      header: { Cookie: wx.getStorageSync('cookie') },
      success: function (res) {
        console.log(res);
        var data = JSON.parse(res.data);
        console.log(data);
        var images = that.data.selected_images;
        console.log(images)
        for (var i = 0; i < images.length; i++) {
          if (images[i].path == path) {
            console.log("found");
            images[i].remote = data.data.file_id;
            images[i].uploading = false;
            images[i].uploadResult = true;
            console.log(images[i]);
            break;
          }
        }
        that.setData({
          selected_images: images,
        })
      },
      fail: function (res) {
        var data = JSON.parse(res.data);
        console.log(data);
        var images = that.data.selected_images;
        for (var i = 0; i < images.length; i++) {
          if (images[i].path == path) {
            images[i].uploading = false;
            images[i].uploadResult = false;
          }
        }
        that.setData({
          selected_images: images,
        })
      }
    });
    uploadTask.onProgressUpdate((res) => {
      var images = that.data.selected_images;
      for (var i = 0; i < images.length; i++) {
        if (images[i].path == path) {
          images[i].progress = res.progress;
        }
      }
      that.setData({
        selected_images: images,
      })
    })
  },

  submit_event: function() {
    console.log(this.data.input_desc);
    var that = this;
    var content = this.data.status[this.data.order_status];
    var image_id = null;
    if (that.data.selected_images.length != 0) {
      image_id = that.data.selected_images[0].remote
    }
    console.log(image_id)
    wx.showModal({
      title: '提示',
      content: '是否确认' + content,
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在' + content,
          })
          wx.request({
            url: 'https://by.edenhe.com/api/order/' + that.data.order_id + '/status/',
            method: 'POST',
            data: {
              'status': that.data.status_next[that.data.order_status],
              'remark': that.data.input_desc,
              'image': image_id,
            },
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Cookie: wx.getStorageSync('cookie'),
            },
            success: function (res) {
              console.log(res);
              wx.setStorageSync('order_detail_update', true);
              wx.setStorageSync('order_unpaid_changed', true);
              wx.hideLoading();
              wx.showToast({
                title: content + '成功',
              });
              wx.navigateBack({
                delta: 1
              });
            },
            fail: function (res) {
              console.log(res.data);
            }
          })
        } else if (res.cancel) {

        }
      }
    })
  },
})