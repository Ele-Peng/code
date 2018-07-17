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
    empty_images: [], //  上传图片里的占位符，让布局更好看一些
    image_block_size: '0',
    screen_height: 0,
    input_desc: '',
    needs_id: '',
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
    var needs_id = options.needs_id;
    console.log(options)
    this.setData({
      needs_id: needs_id,
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

  onSubmit: function (e) {
    console.log(e);
    if (this.data.selected_images.length == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请上传物流底单照片',
      });
      return;
    }
    if (!("logis_id" in e.detail.value)) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请输入物流单号',
      });
      return;
    }
    var that = this;
    var image_id = null;
    if (that.data.selected_images.length != 0) {
      image_id = that.data.selected_images[0].remote;
    }

    var data = {}
    data['logistics_id'] = e.detail.value.logis_id;
    data['form_id'] = e.detail.formId;
    data['image'] = image_id;
    wx.showModal({
      title: '提示',
      content: '是否确认上传',
      success: function (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '正在提交',
          })
          wx.request({
            url: 'https://by.edenhe.com/api/needs/' + that.data.needs_id + '/logistics/',
            method: 'POST',
            data: data,
            header: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Cookie: wx.getStorageSync('cookie'),
            },
            success: function (res) {
              console.log(res);
              wx.setStorageSync('needs_detail_changed', true)
              wx.hideLoading();
              wx.showToast({
                title: '修改成功',
              });
              wx.navigateBack({
                delta: 1,
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