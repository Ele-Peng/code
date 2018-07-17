// detail.js
import { $wuxToast } from '../../components/wux'
import { $wuxLoading } from '../../components/wux'
import { $wuxDialog } from '../../components/wux'
import { $wuxPrompt } from '../../components/wux'

const sliderWidth = 96

Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading:"找布记录",
    lastUrl: '',
    tabs: ['需求详情', '候选布料', '找布对话'],
    new_alerts: [false, false, false],
    activeIndex: '0',
    sliderOffset: 0,
    sliderLeft: 0,
    detail: {},
    empty_images: [],
    result_list: [],
    results_loaded: false,
    conversations: [],
    justnow: [],
    conversation_loaded: false,
    user_type: '',
    needs_id: '',
    image_block_size: '',
    button_top: 0,
    show_send_button: false,
    input_message: '',
    voice_mode: false,
    show_username: false,
  },

  timer: null,

  getSystemInfo() {
    const that = this;
    console.log(this.data.button_top);
    wx.getSystemInfo({
      success(res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          image_block_size: (res.windowWidth - 75) / 4 + 'px',
          button_top: res.windowHeight - 47
        })
        console.log(that.data.button_top);
        console.log(res.windowHeight + 14);
      }
    })
  },

  tabClick: function (e) {
    console.log(e.currentTarget);
    if (e.currentTarget.id == "1" && !this.data.results_loaded) {
      this.loadNeedsResult(this.data.needs_id);
    } else if (e.currentTarget.id == "2" && !this.data.conversation_loaded) {
      this.loadNeedsConversations(this.data.needs_id);
    }

    var alerts = this.data.new_alerts
    if (e.currentTarget.id == "1") {
      alerts[1] = false
    } else if (e.currentTarget.id == "2") {
      alerts[2] = false
    }
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id,
      new_alerts: alerts,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var needs_id = options.id;
    var user_type = options.type;
    var role = wx.getStorageSync('user_role');
    var show_username = true;
    if (user_type == 'user' && (role != 'm' && role != 'd')) {
      show_username = false;
    }
    this.setData({
      needs_id: needs_id,
      user_type: user_type,
      show_username: show_username
    });
    $wuxPrompt.init('msg_empty', {
      title: '空空如也',
      text: '暂时没有相关数据',
    }).show()

    this.getSystemInfo();
    this.loadNeedsDetail();
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
    if (wx.getStorageSync('needs_result_changed')) {
      this.loadNeedsResult(this.data.needs_id);
    }
    if (wx.getStorageSync('needs_detail_changed')) {
      this.loadNeedsDetail();
    }
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

  loadNeedsDetail: function() {
    this.showLoading('正在加载');
    var that = this;
    wx.removeStorageSync('needs_detail_changed');
    wx.request({
      url: 'https://by.edenhe.com/api/needs/' + that.data.needs_id + "/",
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        if (res.data.error == -1) {
          that.hideLoading();
          return
        }
        var empty = [];
        if (res.data.data.images.length <= 3) { //  用占位符补齐第一行
          for (var i = 4 - res.data.data.images.length; i > 0; i--) {
            empty.push(i);
          }
        } else if (res.data.data.images.length > 4 && res.data.data.images.length <= 7) {  //  用占位符补齐第二行
          for (var i = 8 - res.data.data.images.length; i > 0; i--) {
            empty.push(i);
          }
        }

        var has_result_alert = false
        var has_conv_alert = false
        for (var i = 0; i < res.data.data.alerts.length; i++) {
          if (res.data.data.alerts[i] == "result") {
            has_result_alert = true
          } else if (res.data.data.alerts[i] == "conv") {
            has_conv_alert = true
          }
        }
        that.setData(
          {
            detail: res.data.data,
            empty_images: empty,
            new_alerts: [false, has_result_alert, has_conv_alert],
          });
        that.hideLoading();
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    });
  },

  loadNeedsResult: function (needs_id) {
    this.showLoading('正在加载');
    var that = this;
    wx.removeStorageSync('needs_result_changed');
    wx.request({
      url: 'https://by.edenhe.com/api/needs/' + needs_id + "/results/",
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        that.setData({ 
          result_list: res.data.data,
          results_loaded: true,
        });
        that.hideLoading();
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    });
  },

  loadNeedsConversations: function (needs_id) {
    this.showLoading('正在加载');
    var that = this;

    wx.request({
      url: 'https://by.edenhe.com/api/needs/' + needs_id + "/conversation/",
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log('https://by.edenhe.com/api/needs/' + needs_id + "/conversation/");
        console.log(res.data);
        if (res.data.error == -1) {
          that.hideLoading();
          return;
        }
        var conv = res.data.data;
        for (var i = 0; i < conv.length; i++) {
          for (var j = 0; j < conv[i].contents.length; j++) {
            if (conv[i].contents[j].type == 'a') {
              conv[i].contents[j]['length'] = 15 + parseInt(conv[i].contents[j].title) * 40 / 60;
            } 
          }
        }
        console.log(conv)
        that.setData({
          conversations: conv,
          conversation_loaded: true,
        });
        that.hideLoading();
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    });
  },

  showLoading: function (hint) {
    $wuxLoading.show({
      text: hint,
    });
  },

  hideLoading: function () {
    $wuxLoading.hide();
  },

  onPreviewImage: function (e) {
    var index = e.currentTarget.dataset.index;
    var urls = [];
    for (var i = 0; i < this.data.detail.images.length; i++) {
      urls.push(this.data.detail.images[i].url);
    }
  
    wx.previewImage({
      current: urls[parseInt(index)],
      urls: urls,
    });
  },

  onAddResult: function (e) {
    var url = '../result/submit?needs_id=' + this.data.needs_id;
    if (this.data.detail.extra) {
      url = url + '&extra=' + encodeURI(this.data.detail.extra)
    }
    console.log(url, this.data.detail.extra)
    wx.navigateTo({
      url: url
    });
  },

  onClickResult: function (e) {
    console.log(e.currentTarget);
    wx.navigateTo({ url: '../result/detail?from=needs&id=' + e.currentTarget.dataset.id + 
      '&needs_id=' + this.data.needs_id + '&type=' + this.data.user_type});
  },

  onPayOrder: function (e) {
    this.showLoading('正在加载');
    var that = this;
    console.log(wx.getStorageSync('cookie'))
    wx.request({
      url: 'https://by.edenhe.com/api/pay/create/',
      method: 'post',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Cookie: wx.getStorageSync('cookie'),
      },
      data: {
        'id': this.data.needs_id,
        'type': 'n',
      },
      success: function (res) {
        console.log(res.data);
        that.preparePay(res.data.data.id);
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    });
  },

  preparePay: function(order_id) {
    var that = this;
    console.log(wx.getStorageSync('cookie'));
    wx.request({
      url: 'https://by.edenhe.com/api/pay/' + order_id + '/prepare/?platform=xc',
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        that.hideLoading();
        that.startWXPay(res.data.data);
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    });
  },

  startWXPay(data, amount) {
    // appid:"wxd931d7672c96f87d"
    // noncestr:"4dd937e9a341463bb718b6c5462a03ac"
    // package:"prepay_id=wx20170821231109664c2a5a390676680221"
    // sign:"55B40BFEE1BF8AA2B1CD4539183AA755"
    // signtype:"MD5"
    // timestamp:1503328269
    var that = this;
    wx.requestPayment({
      'appId': 'wx06045dee4d51db5a',
      'timeStamp': '' + data.timestamp,
      'nonceStr': data.noncestr,
      'package': data.package,
      'signType': data.signtype,
      'paySign': data.sign,
      'success': function (res) {
        console.log(res);
        that.showPaymentOK();
      },
      'fail': function (res) {
        console.log(res);
        that.showPaymentFailed();
      }
    })
  },

  showPaymentFailed: function () {
    $wuxToast.show({
      type: 'cancel',
      timer: 1500,
      color: '#fff',
      text: '支付失败',
      success: function () {
        wx.navigateBack();
      }
    })
  },

  showPaymentOK: function () {
    wx.setStorageSync('needs_inprogress_changed', true)
    wx.setStorageSync('needs_unpaid_changed', true)
    $wuxToast.show({
      type: 'success',
      timer: 1500,
      color: '#fff',
      text: '支付成功',
      success: function () {
        wx.navigateBack();
      }
    })
  },

  onFinishOrder: function (e) {
    console.log(e)
    var that = this;
    
    $wuxDialog.open({
      title: '确认结束找布',
      content: '结束找布后，代理将不再继续为您本次需求提供找布服务，请确定您已经得到满意的结果。',
      buttons: [
        {
          text: '我要结束',
          type: 'weui-dialog__btn_warn',
          onTap(e) {
            that.doFinishOrder(e.detail.formId);
          },
        },
        {
          text: '我按错了',

        },
      ],
    })
  },

  onContinueOrder: function (e) {
    console.log(e)
    var that = this;
    var form_id = e.detail.formId;
    console.log(wx.getStorageSync('cookie'));
    this.showLoading();
    wx.request({
      url: 'https://by.edenhe.com/api/needs/' + that.data.needs_id + "/continue/?form_id=" + form_id,
      method: 'post',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        that.hideLoading();
        that.loadNeedsDetail();
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    });
  },

  doFinishOrder: function (form_id) {
    var that = this;
    console.log(wx.getStorageSync('cookie'));
    this.showLoading();
    wx.request({
      url: 'https://by.edenhe.com/api/needs/' + that.data.needs_id + "/finish/?form_id=" + form_id,
      method: 'post',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        that.hideLoading();
        that.loadNeedsDetail();
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    });
  },

  doContinueOrder: function (form_id) {
    var that = this;
    console.log(wx.getStorageSync('cookie'));
    this.showLoading();
    wx.request({
      url: 'https://by.edenhe.com/api/needs/' + that.data.needs_id + "/continue/?form_id=" + form_id,
      method: 'post',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        that.hideLoading();
        that.loadNeedsDetail();
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    });
  },

  onInputMessage: function(e) {
    var text = e.detail.value;
    if (text.length > 0 && (!this.data.show_send_button)) {
      console.log("show send button")
      this.setData({
        show_send_button: true
      })
    } else if (this.data.show_send_button) {
      if (text.length == 0) {
        console.log("hide send button")
        this.setData({
          show_send_button: false
        })
      }
    }
  },

  onSendMessage: function (e) {
    console.log(e.detail);
    var data = e.detail.value;
    var that = this;
    var url = 'https://by.edenhe.com/api/needs/' + this.data.needs_id + '/conversation/';
    console.log(url, data);
    this.setData({
      input_message: '',
    })
    if ("content" in data && data.content.length > 0) {
      data["type"] = "t"
      wx.request({
        url: url,
        method: 'post',
        header: {
          Cookie: wx.getStorageSync('cookie'),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: data,
        success: function (res) {
          console.log(res.data);
          that.hideLoading();
          var justnow = that.data.justnow;
          justnow.push({'content': data.content, 'type': 't'});
          that.setData({
            justnow: justnow
          })
        },
        fail: function (res) {
          console.log(res.data);
          that.hideLoading();
        }
      });
    }
  },

  onChooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      success: function(res) {
        console.log(res);
        if (res.tempFilePaths.length > 0) {
          that.sendImage(res.tempFilePaths[0])
        };
      },
      count: 1,
      sizeType: 'compressed',
    })
  },

  sendImage: function(path) {
    var that = this;
    this.showLoading('正在处理')
    var uploadTask = wx.uploadFile({
      url: 'https://by.edenhe.com/api/upload/image/',
      filePath: path,
      name: 'image',
      header: { Cookie: wx.getStorageSync('cookie') },
      success: function (res) {
        console.log(res);
        that.hideLoading();
        var data = JSON.parse(res.data);
        var file_id = data.data.file_id;
        that.sendMediaMessage(path, file_id, 'image', 0);
      },
      fail: function (res) {
        that.hideLoading();
      }
    });
  },

  onVoiceStart: function(e) {
    var that = this;
    console.log('voice start')
    var start = Date.parse(new Date());
    wx.startRecord({
      success: function (res) {
        var tempFilePath = res.tempFilePath;
        console.log(tempFilePath);
        var end = Date.parse(new Date());
        that.sendAudio(tempFilePath, end - start);
      },
      fail: function (res) {
        //录音失败
        console.log(failed);
      }
    })
    this.timer = setTimeout(function () {
      //结束录音  
      wx.stopRecord();
    }, 60000)
  },

  onVoiceEnd: function (e) {
    console.log('voice end');
    if (this.timer != null) {
      clearTimeout(this.timer);
      this.timer = null;
    }
    wx.stopRecord();
  },

  onSetVoiceMode: function() {
    this.setData({ voice_mode: true})
  },

  onSetTextMode: function () {
    this.setData({ voice_mode: false })
  },

  sendAudio: function(path, length_ms) {
    console.log(length_ms);
    if (length_ms <= 2000) {
      $wuxToast.show({
        type: 'cancel',
        timer: 1500,
        color: '#fff',
        text: '录音时间太短',
        success: function () {
        }
      });
      return;
    }
    var that = this;
    this.showLoading('正在处理')
    var uploadTask = wx.uploadFile({
      url: 'https://by.edenhe.com/api/upload/audio/',
      filePath: path,
      name: 'audio',
      formData: {
        format: 'silk',
        length: length_ms / 1000,
      },
      header: { Cookie: wx.getStorageSync('cookie') },
      success: function (res) {
        console.log(res);
        that.hideLoading();
        var data = JSON.parse(res.data);
        var file_id = data.data.file_id;
        that.sendMediaMessage(path, file_id, 'audio', length_ms / 1000);
      },
      fail: function (res) {
        that.hideLoading();
      }
    });
  },

  onClickAudio: function (e) {
    var src = e.currentTarget.dataset.src;
    console.log(src)
    if (src.startsWith('http://')) {
      wx.downloadFile({
        url: src,
        success: function (res) {
          console.log(res);
          wx.playVoice({
            filePath: res.tempFilePath
          })
        },
        fail: function (e) {
          console.log(e);
        }
      })
    } else {
      wx.playVoice({
        filePath: e.currentTarget.dataset.src,
        complete: function () {
        }
      })
    }
  },

  onClickLogistics: function (e) {
    wx.navigateTo({
      url: 'logistics?needs_id=' + this.data.needs_id,
    });
  },

  sendMediaMessage: function (path, fileId, media_type, length) {
    var that = this;
    var url = 'https://by.edenhe.com/api/needs/' + this.data.needs_id + '/conversation/';
    var data = { }
    if (media_type == 'image') {
      data["type"] = "p";
      data["image"] = fileId;
    } else if (media_type == 'audio') {
      data["type"] = "a";
      data["audio"] = fileId;
      data["length"] = length;
    }
     
    wx.request({
      url: url,
      method: 'post',
      header: {
        Cookie: wx.getStorageSync('cookie'),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: data,
      success: function (res) {
        console.log(res.data);
        that.hideLoading();
        if (res.statusCode >= 200 && res.statusCode < 300) {
          var justnow = that.data.justnow;
          if (media_type == "image") {
            justnow.push({ 'content': path, 'type': 'p', mine: true });
          } else if (media_type == "audio") {
            justnow.push({ 'content': path, 'type': 'a', mine: true, title: length});
          }
          console.log(justnow)
          that.setData({
            justnow: justnow
          })
        }
      },
      fail: function (res) {
        console.log(res.data);
        that.hideLoading();
      }
    });
  }
})