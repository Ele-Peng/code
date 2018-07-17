import { $wuxPicker } from '../../components/wux'
import { $wuxToast } from '../../components/wux'
import { $wuxLoading } from '../../components/wux'
import { $wuxDialog } from '../../components/wux'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hide_text_area: false,  //  textarea层级最高，对话框盖不住

    unit_type_items: [
      { value: 'm', name: '米', },
      { value: 'y', name: '码', },
      { value: 'k', name: '千克', },
    ],
    matching_type_items: [
      { value: 'a', name: '一般匹配', },
      { value: 'f', name: '较为匹配', },
      { value: 'v', name: '高度匹配', },
    ],
    measure: "",
    measure_vb: "",
    elastic: 0,
    elastic_vb: "",
    duration: "",
    duration_vb: "",
    shop_image: {'path': ''},
    selected_images: [],
    empty_images: [],
    image_block_size: 0,
    selected_color_matching: '',
    selected_color_matching_name: '',
    selected_material_matching: '',
    selected_material_matching_name: '',
    selected_unit: '',
    selected_unit_name: '',
    extra_needs: '',
    needs_id: '',
    threshold: '0',
    width: '',
    price: '',
    kezhong: '',
    kongcha: '',
    zhiguan: '',
    sample_price: '',
    extra_price: '',
    result_id: '',
    show_remark: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var extra = options.extra;
    var extra_price = '';

    if (typeof extra != 'undefined') {
      extra = decodeURI(options.extra);
      extra_price = options.extra_price;
    } else {
      extra = '';
    }

    var result_id = options.result_id;
    if (typeof result_id == 'undefined') {
      result_id = '';
    }

    this.setData({
         needs_id: options.needs_id, 
         extra_needs: extra,
         result_id: result_id,
         extra_price: extra_price,
      }
    )
    this.getSystemInfo();
    if (result_id.length > 0) {
      this.loadResultDetail(result_id);
    } 
  },

  loadResultDetail: function (result_id) {
    this.showLoading();
    var that = this;
    console.log(wx.getStorageSync('cookie'))
    wx.request({
      url: 'https://by.edenhe.com/api/cloth/' + result_id + "/",
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        var empty = []
        for (var i = 0; i < res.data.data.images.length % 4; i++) {
          empty.push(i);
        }

        var selected_unit_name = res.data.data.display_unit;
        var selected_unit = "";
        for (var i = 0; i < that.data.unit_type_items.length; i++) {
          if (that.data.unit_type_items[i].name == selected_unit_name) {
            selected_unit = that.data.unit_type_items[i].value;
            break;
          }
        }

        var measure = res.data.data.measure;
        var measure_vb = '' + measure + '成'
        if (parseInt(measure) == 100) {
          measure_vb = '足秤'
        }

        var uploaded_images = []
        for (var i = 0; i < res.data.data.images.length; i++) {
          uploaded_images.push(
            {
              'remote': res.data.data.images[i].id,
              'index': i,
              'path': res.data.data.images[i].thumb,
              'uploading': false,
              'uploadResult': true,
              'progress': 100,
            }
          );
        }

        var empty_file_paths = [];
        if (uploaded_images.length < 3) { //  用占位符补齐第一行
          for (var i = 3 - uploaded_images.length; i > 0; i--) {
            empty_file_paths.push(i);
          }
        } else if (uploaded_images.length >= 4 && uploaded_images.length < 7) {  //  用占位符补齐第二行
          for (var i = 7 - uploaded_images.length; i > 0; i--) {
            empty_file_paths.push(i);
          }
        }

        console.log(uploaded_images)
        that.setData({
          selected_color_matching: res.data.data.color_matching,
          selected_material_matching: res.data.data.material_matching,
          selected_color_matching_name: res.data.data.display_color_matching,
          selected_material_matching_name: res.data.data.display_material_matching,
          selected_unit: selected_unit,
          selected_unit_name: selected_unit_name,
          price: res.data.data.price,
          sample_price: res.data.data.sample_price,
          width: res.data.data.width,
          kezhong: res.data.data.kezhong,
          kongcha: res.data.data.kongcha,
          zhiguan: res.data.data.zhiguan,
          threshold: res.data.data.threshold,
          elastic: res.data.data.elastic,
          elastic_vb: res.data.data.display_elastic,
          measure: measure,
          measure_vb: measure_vb,
          duration: '' + res.data.data.duration,
          duration_vb: '' + res.data.data.duration + '天',
          selected_images: uploaded_images,
          empty_images: empty_file_paths,
        });
        that.hideLoading();
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    });
  },

  getSystemInfo: function() {
    const that = this
    wx.getSystemInfo({
      success(res) {
        that.setData({
          image_block_size: (res.windowWidth - 75) / 4 + 'px',
        })
        console.log(that.data.image_block_size);
      }
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
   * 点击是否足秤
   */
  onTapMeasure: function () {
    this.setData({
      hide_text_area: true
    })
    $wuxPicker.init('measure', {
      title: "请选择足秤成数",
      cols: [
        {
          textAlign: 'center',
          values: ['100', '99', '98', '97', '96', '95', '94', '93',
            '92', '91', '90', '89', '88', '87', '86', '85', '84',
            '83', '82', '81', '80'],
        }
      ],
      value: [0],
      onHide(p) {
        this.setData({
          hide_text_area: false,
        })
      },
      onChange(p) {
        console.log(p)
        var measure_vb = p.value + '成';
        if (p.value[0] == '100') {
          measure_vb = '足秤';
        }
        this.setData({
          measure: p.value[0],
          measure_vb: measure_vb,
        })
      },
    });
  },

  /**
   * 点击货期
   */
  onTapDuration: function () {
    this.setData({
      hide_text_area: true
    })
    $wuxPicker.init('measure', {
      title: "请选择货期（天）",
      cols: [
        {
          textAlign: 'center',
          values: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        }
      ],
      value: [0],
      onHide(p) {
        this.setData({
          hide_text_area: false,
        })
      },
      onChange(p) {
        console.log(p)
        var duration_vb = p.value + '天';
        if (p.value[0] == '0') {
          duration_vb = '现货';
        }
        this.setData({
          duration: p.value[0],
          duration_vb: duration_vb,
        })
      },
    });
  },

  /**
   * 点击弹力
   */
  onTapElastic: function () {
    this.setData({
      hide_text_area: true
    })
    $wuxPicker.init('elastic', {
      title: "请选择弹力",
      cols: [
        {
          textAlign: 'center',
          values: ['无', '单向', '四面'],
        }
      ],
      value: [0],
      onHide(p) {
        this.setData({
          hide_text_area: false,
        })
      },
      onChange(p) {
        console.log(p);
        var elastic = 0;
        if (p.value[0] == '无') {
          elastic = 1
        } else if (p.value[0] == '单向') {
          elastic = 2
        } else if (p.value[0] == '四面') {
          elastic = 4
        }
        this.setData({
          elastic: elastic,
          elastic_vb: p.value,
        });
        console.log(elastic)
      },
    });
  },

  onTapColorMatching: function (e) {
    var values = [];
    var that = this;
    for (var i = 0; i < this.data.matching_type_items.length; i++) {
      values.push(this.data.matching_type_items[i].name);
    }
    console.log(values);

    this.setData({
      hide_text_area: true
    })
    $wuxPicker.init('color', {
      title: "请选择匹配程度",
      cols: [
        {
          textAlign: 'center',
          values: values,
        }
      ],
      value: [0],
      onHide(p) {
        this.setData({
          hide_text_area: false,
        })
      },
      onChange(p) {
        console.log(p)
        var name = "";
        var value = "";
        for (var i = 0; i < that.data.matching_type_items.length; i++) {
          if (p.value[0] == that.data.matching_type_items[i].name) {
            name = that.data.matching_type_items[i].name;
            value = that.data.matching_type_items[i].value;
          }
        }
        this.setData({
          selected_color_matching: value,
          selected_color_matching_name: name,
        })
      },
    })
  },

  onTapMaterial: function () {
    var values = [];
    var that = this;
    for (var i = 0; i < this.data.matching_type_items.length; i++) {
      values.push(this.data.matching_type_items[i].name);
    }
    console.log(values);
    this.setData({
      hide_text_area: true
    })
    $wuxPicker.init('material', {
      title: "请选择匹配程度",
      cols: [
        {
          textAlign: 'center',
          values: values,
        }
      ],
      value: [0],
      onHide(p) {
        this.setData({
          hide_text_area: false,
        })
      },
      onChange(p) {
        console.log(p)
        var name = "";
        var value = "";
        for (var i = 0; i < that.data.matching_type_items.length; i++) {
          if (p.value[0] == that.data.matching_type_items[i].name) {
            name = that.data.matching_type_items[i].name;
            value = that.data.matching_type_items[i].value;
          }
        }
        console.log(name, value)
        this.setData({
          selected_material_matching: value,
          selected_material_matching_name: name,
        })
      },
    })
  },

  onTapUnit: function () {
    var values = [];
    var that = this;
    for (var i = 0; i < this.data.unit_type_items.length; i++) {
      values.push(this.data.unit_type_items[i].name);
    }
    console.log(values);
    this.setData({
      hide_text_area: true
    })
    $wuxPicker.init('unit', {
      title: "请选择计价单位",
      cols: [
        {
          textAlign: 'center',
          values: values,
        }
      ],
      value: [0],
      onHide(p) {
        this.setData({
          hide_text_area: false,
        })
      },
      onChange(p) {
        var name = "";
        var value = "";
        for (var i = 0; i < that.data.unit_type_items.length; i++) {
          if (p.value[0] == that.data.unit_type_items[i].name) {
            name = that.data.unit_type_items[i].name;
            value = that.data.unit_type_items[i].value;
          }
        }
        console.log(value, name);
        if (value == that.data.selected_unit) {
          return;
        }
        that.setData({
          selected_unit: value,
          selected_unit_name: name,
        });
      },
    })
  },

  selectShopImage: function(e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var shop_image = {
          'remote': '',
          'path': res.tempFilePaths[0],
          'uploading': true,
          'uploadResult': true,
          'progress': 0,
        }
        that.setData({ shop_image: shop_image} );
        that.startShopImageUploading();
      }
    })
  },

  selectImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 8 - that.data.selected_images.length,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var temp_file_paths = []
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          temp_file_paths.push(
            {
              'remote': '',
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
    if (images.length < 3) { //  用占位符补齐第一行
      for (var i = 3 - images.length; i > 0; i--) {
        empty_file_paths.push(i);
      }
    } else if (images.length >= 4 && images.length < 7) {  //  用占位符补齐第二行
      for (var i = 7 - images.length; i > 0; i--) {
        empty_file_paths.push(i);
      }
    }
    console.log(images);
    console.log(empty_file_paths);
    this.setData({
      selected_images: images,
      empty_images: empty_file_paths
    });
  },

  onLongTapImage: function (e) {
    var that = this;
    var index = e.target.dataset.index;
    console.log(index);
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

  startShopImageUploading: function() {
    if (this.data.shop_image.uploading) {
      this.doUploading(this.data.shop_image.path);
    } else {
      console.log("no shop image upload jobs")
    }
  },

  doUploading: function (path) {
    console.log(wx.getStorageSync('cookie'))
    var that = this
    var uploadTask = wx.uploadFile({
      url: 'https://by.edenhe.com/api/upload/image/',
      filePath: path,
      name: 'image',
      header: { Cookie: wx.getStorageSync('cookie') },
      success: function (res) {
        var data = JSON.parse(res.data);
        console.log(data);

        if (path == that.data.shop_image.path) {
          that.setData({
            shop_image: {
              'remote': data.data.file_id,
              'path': that.data.shop_image.path,
              'uploading': false,
              'uploadResult': true,
              'progress': 0,
            }
          });
          console.log("set shop image id", data.data.file_id);
        } else {
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
        }
      },
      fail: function (res) {
        var data = JSON.parse(res.data);
        console.log(data);
        if (path == that.data.shop_image.path) {
          that.setData({
            shop_image: {
              'path': that.data.shop_image.path,
              'uploading': false,
              'uploadResult': false,
              'progress': 0,
            }
          })
        } else {
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
      }
    });
    uploadTask.onProgressUpdate((res) => {
      if (path == that.data.shop_image.path) {
        that.setData({
          shop_image: {
            'path': that.data.shop_image.path,
            'uploading': that.data.shop_image.uploading,
            'uploadResult': that.data.shop_image.uploadResult,
            'progress': res.progress,
          }
        })
      } else {
        var images = that.data.selected_images;
        for (var i = 0; i < images.length; i++) {
          if (images[i].path == path) {
            images[i].progress = res.progress;
          }
        }
        that.setData({
          selected_images: images,
        })
      }
    })
  },

  showLoading: function () {
    $wuxLoading.show({
      text: '正在提交',
    });
  },

  hideLoading: function () {
    $wuxLoading.hide();
  },

  onSubmit: function(e) {
    console.log(e)
    if (this.data.selected_material_matching == '') {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请选择材质匹配程度',
      });
      return;
    }

    if (this.data.selected_color_matching == '') {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请选择颜色匹配程度',
      });
      return;
    }

    if (this.data.selected_unit == '') {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请选择计价单位',
      });
      return;
    }

    var price = e.detail.value.price;
    if (isNaN(price) || (!parseInt(price) > 0)) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请输入正确的大货单价',
      });
      return;
    }

    var sample_price = e.detail.value.sample_price;
    if (isNaN(sample_price) || (!parseInt(sample_price))) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请输入正确的样布单价',
      });
      return;
    }

    if ((this.data.selected_unit == 'm' || this.data.selected_unit == 'y') && this.data.measure == '') {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请选择是否足秤',
      });
      return;
    }

    var kongcha = e.detail.value.kongcha;
    var kezhong = e.detail.value.kezhong;
    var zhiguan = e.detail.value.zhiguan;
    console.log(kongcha, kezhong, zhiguan);
    if (kezhong == '' || kezhong == null) {
      kezhong = 0;
    }
    if (kongcha == '' || kongcha == null) {
      kongcha = 0;
    }
    if (zhiguan == '' || zhiguan == null) {
      zhiguan = 0;
    }
    
    if (this.data.duration == '') {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请选择货期天数',
      });
      return;
    }

    var extra_price = e.detail.value.extra_price;
    console.log(extra_price, isNaN(extra_price));
    if (typeof this.data.extra_needs != 'undefined' && this.data.extra_needs != '' && isNaN(extra_price)) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请输入额外需求价格',
      });
      return;
    }

    if (('uploading' in this.data.shop_image) && this.data.shop_image.uploading) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '图片还未上传完毕，请稍候',
      });
      return;
    }

    var image_ids = "";
    for (var i = 0; i < this.data.selected_images.length; i++) {
      if (this.data.selected_images[i].uploading) {
        $wuxToast.show({
          type: 'forbidden',
          timer: 2000,
          color: '#fff',
          text: '图片还未上传完毕，请稍候',
        });
        return;
      } else {
        if (this.data.selected_images[i].uploadResult) {
          if (image_ids.length > 0) {
            image_ids = image_ids + ","
          }
          image_ids = image_ids + this.data.selected_images[i].remote;
        }
      }
    }
    if (image_ids.length == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 1500,
        color: '#fff',
        text: '请选择上传样品图片',
      });
      return;
    }

    var threshold = 0;
    if (!isNaN(e.detail.value.threshold)) {
      threshold = parseInt(e.detail.value.threshold);
    }

    var shop_image = this.data.shop_image.remote;
    if (shop_image == null) {
      shop_image = '';
    }
    var data = {
      duration: this.data.duration,
      color_matching: this.data.selected_color_matching,
      material_matching: this.data.selected_material_matching,
      unit: this.data.selected_unit,
      price: price,
      sample_price: sample_price,
      width: e.detail.value.width,
      threshold: threshold,
      images: image_ids,
      shop_img: shop_image,
      remark: e.detail.value.remark,
      elastic: this.data.elastic,
    };
    if (extra_price) {
      data['extra_price'] = extra_price;
    }
    if (this.data.selected_unit == 'k') {
      data['kezhong'] = kezhong;
      data['kongcha'] = kongcha;
      data['zhiguan'] = zhiguan;
    } else {
      data['measure'] = this.data.measure;
    }

    console.log(data);

    var url = 'https://by.edenhe.com/api/needs/' + this.data.needs_id + '/results/?form_id=' + e.detail.formId;

    if (this.data.result_id.length > 0) {
      url = 'https://by.edenhe.com/api/cloth/' + this.data.result_id + '/?form_id=' + e.detail.formId;
    }

    var that = this;
    this.showLoading();
    wx.request({
      url: url,
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync('cookie'),
      },
      data: data,
      success: function (res) {
        console.log(res);
        that.hideLoading();
        wx.setStorageSync('needs_result_changed', true)
        wx.navigateBack();
      },
      fail: function (res) {
        console.log(res);
        that.hideLoading();
      },
    });
  }  
})