// publish.js
import {
  $wuxPicker
} from '../../components/wux'
import {
  $wuxToast
} from '../../components/wux'
import {
  $wuxLoading
} from '../../components/wux'
import {
  $wuxDialog
} from '../../components/wux'
import {
  $wuxNotification
} from '../../components/wux'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "发布需求",
    credit: "",
    needs_type_items: [{
        value: 'c',
        name: '样衣',
      },
      {
        value: 'h',
        name: '样布',
      },
      {
        value: 'p',
        name: '图片',
      },
    ],
    screen_height: 0,
    time_type_items: [{
        value: '1',
        name: '1天',
      },
      {
        value: '3',
        name: '3天',
      },
      {
        value: '0',
        name: '不限',
      },
    ],

    market_type_items: [{
        value: 'g',
        name: '广州',
      },
      {
        value: 'k',
        name: '柯桥',
      },
      {
        value: 'q',
        name: '其他',
      },
    ],

    matching_type_items: [{
        value: 'a',
        name: '匹配材质',
      },
      {
        value: 'f',
        name: '较为匹配',
      },
      {
        value: 'v',
        name: '高度匹配',
      },
    ],

    show_optional: false,
    selected_type: '',
    selected_type_name: '',
    selected_time: '',
    selected_time_name: '',
    selected_market: '',
    selected_market_name: '',
    selected_matching: '',
    selected_matching_name: '',
    market_fee: '158',
    input_desc: '',
    input_extra: '',
    input_price: '',
    selected_images: [],
    empty_images: [], //  上传图片里的占位符，让布局更好看一些
    addresses: [],
    selected_address: -1,
    picker_addresses: [],
    receive_addr_id: -1,
    image_block_size: '0',
    screen_height: 0,
    addr_inited: false,
  },

  market_fee_dict: { //  定义不同市场的费用
    'g': 158,
    'k': 98,
    'q': 158,
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
        console.log(that.data.screen_height);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //  加载默认地址
    console.log(wx.getStorageSync('cookie'))
    this.getSystemInfo();

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    if (!this.data.addr_inited || wx.getStorageSync('address_changed')) {
      wx.setStorageSync('address_changed', false);
      this.loadAddresses();
    }
    var that = this
    wx.request({
      url: 'https://by.edenhe.com/api/bind/team_vip',
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function(res) {
        console.log(res.data);
        var vip = res.data.data.vip_lvl;
        var name = '普通会员';
        if (vip == 1) {
          name = '青铜会员';
        } else if (vip == 2) {
          name = '黄金会员';
        } else if (vip == 3) {
          name = '钻石会员';
        }
        that.setData({
          credit: name
        })
        console.log(that.data.credit);
        $wuxNotification.show({
          image: '../../assets/images/icon-logo-in.png',
          title: '布源',
          text: '欢迎您，尊敬的' + that.data.credit,
          data: {
            message: '逗你玩的!!!'
          },
          duration: 300,
          onClick(data) {
            console.log(data)
          },
          onClose(data) {
            console.log(data)
          },
        })
      },
      fail: function(res) {
        console.log(res.data);
      }
    });

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },


  onInput: function(e) {},

  toggleOptional: function(e) {
    this.setData({
      show_optional: !this.data.show_optional
    });
  },

  onLongTapImage: function(e) {
    var that = this;
    var index = e.target.dataset.index;
    $wuxDialog.open({
      title: '确认删除',
      content: '确定要删除这张图片吗？',
      buttons: [{
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

  removeImage: function(idx) {
    var imgs = this.data.selected_images;
    imgs.splice(idx, 1);
    this.onSelectedImagesChanged(imgs);
  },

  selectImage: function(e) {
    var that = this;
    wx.chooseImage({
      count: 8 - that.data.selected_images.length,
      sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function(res) {
        console.log(res)
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var temp_file_paths = []
        for (var i = 0; i < res.tempFilePaths.length; i++) {
          temp_file_paths.push({
            'remote': '',
            'index': temp_file_paths.length,
            'path': res.tempFilePaths[i],
            'uploading': true,
            'uploadResult': true,
            'progress': 0,
          });
        }
        temp_file_paths = that.data.selected_images.concat(temp_file_paths);
        that.onSelectedImagesChanged(temp_file_paths);
        that.startUploading();
      }
    })
  },

  onSelectedImagesChanged: function(images) {
    var empty_file_paths = [];
    if (images.length < 3) { //  用占位符补齐第一行
      for (var i = 3 - images.length; i > 0; i--) {
        empty_file_paths.push(i);
      }
    } else if (images.length >= 4 && images.length < 7) { //  用占位符补齐第二行
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

  startUploading: function() {
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

  doUploading: function(path) {
    console.log("uploading " + path)
    var that = this
    var uploadTask = wx.uploadFile({
      url: 'https://by.edenhe.com/api/upload/image/',
      filePath: path,
      name: 'image',
      header: {
        Cookie: wx.getStorageSync('cookie')
      },
      success: function(res) {
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
      fail: function(res) {
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

  onSubmit: function(e) {
    console.log(e);
    //  提交需求
    if (this.data.selected_type.length == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请选择寄样类型',
      });
      return;
    }

    if (this.data.selected_time.length == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请选择允许时间',
      });
      return;
    }

    if (this.data.selected_market.length == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请选择目标市场',
      });
      return;
    }

    if (this.data.selected_matching.length == 0) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请选择匹配程度',
      });
      return;
    }

    if (this.data.receive_addr_id == -1) {
      $wuxToast.show({
        type: 'forbidden',
        timer: 2000,
        color: '#fff',
        text: '请选择一个收货地址',
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
        timer: 2000,
        color: '#fff',
        text: '请至少上传一张图片',
      });
      return;
    }
    console.log(image_ids);
    this.showLoading()
    var that = this;

    var data = {
      'demo': this.data.selected_type,
      'days': this.data.selected_time,
      'market': this.data.selected_market,
      'reward': this.data.market_fee,
      'desc': e.detail.value.desc,
      'extra': e.detail.value.extra,
      'expect': e.detail.value.price,
      'address': this.data.receive_addr_id,
      'images': image_ids,
      'matching': this.data.selected_matching,
    };
    console.log(data);
    console.log(e);
    wx.request({
      url: 'https://by.edenhe.com/api/needs/?form_id=' + e.detail.formId,
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cookie': wx.getStorageSync('cookie'),
      },
      data: data,
      success: function(res) {
        console.log(res);
        that.hideLoading();
        that.startPayment(res.data.data.id);
      },
      fail: function(res) {
        console.log(res);
        that.hideLoading();
      },
    });
  },

  showLoading: function() {
    $wuxLoading.show({
      text: '正在提交',
    });
  },

  hideLoading: function() {
    $wuxLoading.hide();
  },

  onClickHelpFee: function() {
    console.log("help fee");
  },

  onTapMarket: function() {
    var values = [];
    var that = this;
    for (var i = 0; i < this.data.market_type_items.length; i++) {
      values.push(this.data.market_type_items[i].name);
    }
    console.log(values);
    $wuxPicker.init('market', {
      title: "请选择目标市场",
      cols: [{
        textAlign: 'center',
        values: values,
      }],
      value: [0],
      onChange(p) {
        console.log(p)
        var name = "";
        var value = "";
        for (var i = 0; i < that.data.market_type_items.length; i++) {
          if (p.value[0] == that.data.market_type_items[i].name) {
            name = that.data.market_type_items[i].name;
            value = that.data.market_type_items[i].value;
          }
        }
        this.setData({
          selected_market: value,
          selected_market_name: name,
          market_fee: that.market_fee_dict[value],
        })
      },
    });
  },

  onTapDemo: function() {
    var values = [];
    var that = this;
    for (var i = 0; i < this.data.needs_type_items.length; i++) {
      values.push(this.data.needs_type_items[i].name);
    }
    $wuxPicker.init('demo', {
      title: "请选择寄样类型",
      cols: [{
        textAlign: 'center',
        values: values,
      }],
      value: [0],
      onChange(p) {
        console.log(p)
        var name = "";
        var value = "";
        for (var i = 0; i < that.data.needs_type_items.length; i++) {
          if (p.value[0] == that.data.needs_type_items[i].name) {
            name = that.data.needs_type_items[i].name;
            value = that.data.needs_type_items[i].value;
          }
        }
        this.setData({
          selected_type: value,
          selected_type_name: name
        })
      },
    });
  },

  onTapTime: function() {
    var values = [];
    var that = this;
    for (var i = 0; i < this.data.time_type_items.length; i++) {
      values.push(this.data.time_type_items[i].name);
    }
    console.log(values);
    $wuxPicker.init('time', {
      title: "请选择允许时间",
      cols: [{
        textAlign: 'center',
        values: values,
      }],
      value: [0],
      onChange(p) {
        console.log(p)
        var name = "";
        var value = "";
        for (var i = 0; i < that.data.time_type_items.length; i++) {
          if (p.value[0] == that.data.time_type_items[i].name) {
            name = that.data.time_type_items[i].name;
            value = that.data.time_type_items[i].value;
          }
        }
        this.setData({
          selected_time: value,
          selected_time_name: name
        })
      },
    });
  },

  onTapMatching: function() {
    var values = [];
    var that = this;
    for (var i = 0; i < this.data.matching_type_items.length; i++) {
      values.push(this.data.matching_type_items[i].name);
    }
    console.log(values);
    $wuxPicker.init('matching', {
      title: "请选择匹配程度",
      cols: [{
        textAlign: 'center',
        values: values,
      }],
      value: [0],
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
          selected_matching: value,
          selected_matching_name: name
        })
      },
    });
  },

  loadAddresses: function() {
    var that = this;
    wx.request({
      url: 'https://by.edenhe.com/api/address/',
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function(res) {
        console.log(res.data);
        var addresses = res.data.data;
        var address_diaplay_list = [];
        var selected_address = -1;
        var receive_addr_id = -1;
        for (var i = 0; i < addresses.length; i++) {
          address_diaplay_list.push(addresses[i].name + " " + addresses[i].phone + " " +
            addresses[i].prov_vb + addresses[i].city_vb + addresses[i].county_vb + addresses[i].detail);
          if (addresses[i].is_default) {
            selected_address = i;
            receive_addr_id = addresses[i].id;
          }
        }
        that.setData({
          addresses: addresses,
          picker_addresses: address_diaplay_list,
          selected_address: selected_address,
          receive_addr_id: receive_addr_id,
        });
      },
      fail: function(res) {
        console.log(res.data);
      }
    });
  },

  onTapAddress: function() {
    if (this.data.addresses.length > 0) {
      var values = this.data.picker_addresses;
      var that = this;
      var selected_index = this.data.selected_address;
      if (selected_index == -1) {
        selected_index = 0;
      }
      console.log(values);
      $wuxPicker.init('addresses', {
        title: "请选择收货地址",
        cols: [{
          textAlign: 'center',
          values: values,
        }],
        value: [selected_index],
        onChange(p) {
          console.log(p)
          this.setData({
            selected_address: p.valueIndex[0],
            receive_addr_id: that.data.addresses[p.valueIndex[0]].id,
          });
        },
      });
    } else {
      wx.navigateTo({
        url: '../address/create',
      })
    }
  },

  startPayment: function(needs_id) {
    this.showLoading('正在加载');
    var that = this;
    wx.request({
      url: 'https://by.edenhe.com/api/pay/create/',
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: wx.getStorageSync('cookie'),
      },
      data: {
        'id': needs_id,
        'type': 'n',
      },
      success: function (res) {
        console.log(res.data);
        that.hideLoading();
        wx.navigateTo({
          url: '../../pages/pay/needs?amount=' + res.data.data.amount + '&needs_id=' + res.data.data.id,
        })
        // that.preparePay(res.data.data.id);
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    });
  },
})