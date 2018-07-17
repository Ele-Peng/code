// pages/detail/detail.js
import { $wuxDialog } from '../../components/wux'
import { $wuxLoading } from '../../components/wux'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "面料预览",
    search_text: '最新发布',
    isShow: false,
    lastUrl: "",
    hiddenmodalput: true,
    min_price: 0,
    max_price: 0,
    page: 0,
    size: 10,
    cloth_list: [],
    cloth_list_left: [],
    cloth_list_right: [],
    is_show_paixu: false,
    is_latest: false,
    is_hotest: false,
    is_newest: false,
    button_array: [], // 筛选按钮列表
    chose_a: 0, // 当前选择的大类
    chose_b: -1, // 当前选择的中类
    order_by: 'None', // 根据什么排序
    is_shows: {},
    is_checked: 1,
    key: '',
    type_relation: {
      '开发时间': {
        '2018年下': {},
        '2018年上': {},
        '2017年下': {},
        '2017年上': {},
        '2017年前': {}
      },
      '适用季节': {
        '春': {},
        '夏': {},
        '秋': {},
        '冬': {}
      },
      '图案': {
        '人': {},
        '动物': {},
        '植物': {},
        '圆点': {},
        '条纹': {},
        '格子': {},
        '净色特种': {},
        '素色常规': {},
        '其他': {}
      },
      '适用品类': {
        'T恤/打底衫': {},
        '大衣': {},
        '外套': {},
        '衬衫': {},
        '裤子': {},
        '家居服': {},
        '婴儿服饰(哈衣/爬服)': {},
        '棉衣/羽绒服/户外服': {},
        '泳装': {},
        '校服': {},
        '其他': {}
      },
      '织法': {
        '梭织': {
          '平纹': {},
          '斜纹': {},
          '缎纹': {},
          '其他': {},
        },
        '针织': {
          '罗纹布': {},
          '大卫衣': {},
          '小卫衣': {},
          '坑条': {},
          '珠地': {},
          '蕾丝': {},
          '毛圈布': {},
          '网布': {},
          '摇粒绒': {},
          '毛巾布': {},
          '针织平纹': {},
          '针织斜纹': {},
          '汗布': {},
          '针织缎纹': {},
          '起绒/起毛布': {},
          '网眼布': {},
          '其他': {}
        },
        '无纺布': {
          '皮革': {},
          '水刺无纺': {},
          '针织无纺': {},
          '纺粘无纺': {},
          '熔喷无纺': {},
          '热轧无纺': {},
          '其他无纺': {}
        }
      },
      '材质': {
        '棉类': {
          '纱卡': {},
          '平布': {},
          '斜纹布': {},
          '府绸': {},
          '全棉布': {},
          '净色棉': {},
          '牛仔布': {},
          '灯芯绒': {},
          '帆布': {},
          '缎纹/贡缎': {},
          '棉竹节': {},
          '其他': {}
        },
        '麻类': {
          '大麻': {},
          '黄麻': {},
          '剑麻': {},
          '亚麻': {},
          '苎麻': {},
          '麻混纺': {},
          '其他': {}
        },
        '化纤': {
          '粘胶': {},
          '人棉': {},
          '人造丝': {},
          '空气层': {},
          '氨纶': {},
          '腈纶': {},
          '其他': {}
        },
        '混纺': {
          '棉毛混纺': {},
          '化纤类混纺': {},
          '交织类混纺': {},
          'T/C': {},
          'T/R': {},
          'T/A': {},
          '锦棉': {},
          'N/C': {},
          'CVC': {},
          '其他': {}
        },
        '皮毛': {
          '毛毡': {},
          '毛呢/呢绒': {},
          '金毛': {},
          '呢绒': {},
          '鹿皮绒': {},
          '人造皮革': {},
          '羊毛': {},
          '羊绒': {},
          '法兰绒': {},
          '麦呢': {},
          '其他': {}
        },
        '新型纤维': {
          '天丝': {},
          '莫代尔': {},
          '铜氨丝': {},
          '粘纤': {},
          '醋酸纤维': {},
        },
        '真丝/仿真丝': {
          '绢': {},
          '乔琪': {},
          '锦': {},
          '缎': {},
          '绉': {},
          '罗': {},
          '绸': {},
          '绫': {},
          '其他': {}
        }
      },
      '所在市场': {
        '广州': {},
        '柯桥': {},
        '盛泽': {},
        '石狮': {},
        '织里': {},
        '其他': {}
      },
      '货期': {
        '现货': {},
        '1-3天': {},
        '3-7天': {},
        '7-14天': {},
        '14天以上': {}
      },
      '弹性': {
        '单向弹性': {},
        '四面弹性': {},
        '无弹力': {}
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    // 页面初始化 options为页面跳转所带来的参数
    // console.log(app.globalData.is_shows)
    // app.editTabBar3();//添加tabBar数据
    // this.setData({
    //   is_shows: app.globalData.is_shows
    // })
    this.getList();
  },

  showLoading: function () {
    $wuxLoading.show({
      text: '数据加载中',
    });
  },

  hideLoading: function () {
    $wuxLoading.hide();
  },

  getList: function () {
    this.showLoading();
    var that = this;
    wx.request({
      url: 'http://by.edenhe.com/api/record/samples/?' + that.data.key,
      header: {
        Cookie: wx.getStorageSync('cookie'),
        'content-type': 'application/json' // 默认值
      },
      data: {
        page: that.data.page,
        size: that.data.size,
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        var n = 0;
        for (var i in res.data.data) {
          var flag = false;
          for (var j in that.data.is_shows) {
            if (j == res.data.data[i].clothID) {
              flag = true;
              break;
            }
          }
          if (!flag) {
            that.data.is_shows[res.data.data[i].clothID] = true
          }
          that.data.cloth_list.push(res.data.data[i]);
          // res.data.data[i].cloth = res.data.data[i].cloth.substr(10, 10);
          if (n % 2 == 0) {
            that.data.cloth_list_left.push(res.data.data[i]);
          } else {
            that.data.cloth_list_right.push(res.data.data[i]);
          }
          n += 1;
        }
        that.setData({
          is_shows: that.data.is_shows,
          cloth_list: that.data.cloth_list,
          cloth_list_left: that.data.cloth_list_left,
          cloth_list_right: that.data.cloth_list_right
        });
        that.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    wx.request({
      url: 'http://by.edenhe.com/api/record/samples/filter',
      header: {
        Cookie: wx.getStorageSync('cookie'),
        'content-type': 'application/json' // 默认值
      },
      method: 'GET',
      success: function (res) {
        console.log(res.data);
        that.setData({
          button_array: res.data.data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //获得title 标题栏组件
    this.title = this.selectComponent("#title");
    //获得searchbar 搜索框组件
    this.searchBar = this.selectComponent("#searchBar");
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  //点击按钮指定的hiddenmodalput弹出框  
  promptPrice: function () {
    this.setData({
      hiddenmodalput: !this.data.hiddenmodalput
    })
  },
  //取消按钮  
  cancel: function () {
    this.setData({
      hiddenmodalput: true
    });
  },
  //确认  
  confirm: function () {
    this.setData({
      hiddenmodalput: true
    })
  },
  slider4changeMax: function (e) {
    this.setData({
      max_price: e.detail.value
    });
  },
  slider4changeMin: function (e) {
    this.setData({
      min_price: e.detail.value
    });
    if (this.data.min_price >= this.data.max_price) {
      this.setData({
        max_price: e.detail.value
      });
    }
  },
  nextPage: function (e) {
    var that = this;
    that.setData({
      page: that.data.page + 1
    });
    that.getList();
  },

  // 点击大类
  chose_a_f: function (e) {
    var that = this;
    console.log(e);
    that.setData({
      chose_a: e.target.dataset.chose_idx,
      chose_b: -1,
    });
  },

  // 点击中类
  chose_b_f: function (e) {
    var that = this;
    var chose_a = that.data.chose_a;
    var chose_b = e.target.dataset.chose_idx;
    var br = that.data.button_array;
    if (br[chose_a].options) {
      if (br[chose_a].options[chose_b].is_chose) {
        br[chose_a].options[chose_b].is_chose = false;
        var ar = br[chose_a].options;
        var flag = true;
        for (var i in ar) {
          if (ar[i].is_chose) {
            flag = false;
          }
        }
        if (flag) {
          br[chose_a].is_chose = false;
        }
      } else {
        br[chose_a].is_chose = true;
        br[chose_a].options[chose_b].is_chose = true;
      }
      that.setData({
        chose_a: chose_a,
        chose_b: chose_b,
        button_array: br
      });
    }
  },

  // 点击小类
  chose_c_f: function (e) {
    var that = this;
    console.log(
      '接口未定义，暂未找到有第三大类'
    );
  },

  trash_b: function (e) {
    console.log(e);
    var that = this;
    var chose_a = that.data.chose_a;
    var chose_b = e.target.dataset.chose_idx;
    var br = that.data.button_array;

    var ar = br[chose_a].options;
    var flag = true;
    for (var i in ar) {
      ar[i].is_chose = false;
    }
    br[chose_a].is_chose = false;
    that.setData({
      chose_a: chose_a,
      chose_b: chose_b,
      button_array: br
    });
  },

  getChoseType: function (e) {

  },

  show_close: function (e) {
    var that = this;
    that.setData({
      isShow: !that.data.isShow,
    })
    that.getChoseType();
  },

  my_submit: function (e) {
    var that = this;
    var temp = '';
    for (var i in that.data.chose_c) {
      if (that.data.chose_c[i]) {
        if ('' == temp) {
          temp = i;
        } else {
          temp += ',' + i;
        }
      }
    }
    if (temp == '') {
      temp = '全部';
    }
    that.setData({
      page: 0,
      size: 10,
      chose_c_n: temp
    });
    that.getList();
    that.show_close();
  },

  show_paixu: function (e) {
    var that = this;
    that.setData({
      is_show_paixu: !that.data.is_show_paixu
    })
  },

  // 最新发布 order_by: time
  latest_publish: function (e) {
    var that = this;
    that.setData({
      // is_show_paixu: false,
      search_text: '最新发布',
      is_latest: true,
      is_hotest: false,
      is_newest: false,
      order_by: 'time'
    });
    // getList();
  },

  // 热门布料 order_by: hot
  hotest_cloth: function (e) {
    var that = this;
    that.setData({
      // is_show_paixu: false,
      search_text: '热门布料',
      is_hotest: true,
      is_latest: false,
      is_newest: false,
      order_by: 'hot'
    });
    // getList();
  },

  // 新品推荐 order_by: newest
  newest_recom: function (e) {
    var that = this;
    that.setData({
      // is_show_paixu: false,
      search_text: '新品推荐',
      is_newest: true,
      is_latest: false,
      is_newest: false,
      order_by: 'newest'
    });
    // getList();
  },

  chose_image: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        wx.uploadFile({
          url: 'https://by.edenhe.com/api/shibie', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          success: function (res) {
            var data = res.data
            //do something
            console.log(res.data);
            var n = 0;
            for (var i in res.data.data) {
              that.data.cloth_list.push(res.data.data[i]);
              if (n % 2 == 0) {
                that.data.cloth_list_left.push(res.data.data[i]);
              } else {
                that.data.cloth_list_right.push(res.data.data[i]);
              }
              n += 1;
            }
            that.setData({
              cloth_list: that.data.cloth_list,
              cloth_list_left: that.data.cloth_list_left,
              cloth_list_right: that.data.cloth_list_right
            })

          }
        })
      }
    })
  },

  show_item: function (e) {
    var that = this
    that.data.is_shows[e.target.dataset.cloth_id] = false
    this.setData({
      is_shows: that.data.is_shows
    })
    var app = getApp();
    app.globalData.is_shows = that.data.is_shows
    if (!e.target.dataset.is_pay) {
      e.target.dataset.is_pay = false;
    }
    wx.navigateTo({
      url: '../twxx/twxx?is_pay=' + e.target.dataset.is_pay + '&cloth_id=' + e.target.dataset.cloth_id
    })
  },

  //modal隐藏
  hideModal: function (e) {
    if (e) {
      let type = e.currentTarget.dataset.type;
      if (type == 'mask' && !this.data.backdrop) {
        return;
      }
    }
    if (this.data.isShow) this._toggleModal();
  },

  //modal显示
  showModal: function () {
    if (!this.data.isShow) {
      this._toggleModal();
    }
  },

  //切换modal的显示还是隐藏
  _toggleModal: function () {
    if (!this.data.animated) {
      this.setData({
        isShow: !this.data.isShow
      })
    }
    else {
      let isShow = !this.data.isShow;
      this._executeAnimation(isShow);
    }


  },

  //根据需求执行动画
  _executeAnimation: function (isShow) {

    let animation = this.animation;
    if (isShow) {

      animation.opacity(0).step();

      this.setData({
        animationData: animation.export(),
        isShow: true
      })

      setTimeout(function () {
        animation.opacity(1).step()
        this.setData({
          animationData: animation.export()
        })
      }.bind(this), 50)
    }
    else {
      animation.opacity(0).step()
      this.setData({
        animationData: animation.export()
      })

      setTimeout(function () {
        this.setData({
          isShow: isShow
        })
      }.bind(this), this.data.animationOption.duration)

    }
  },

  //取消事件 向外部page 发送事件通知
  _cancelModal: function () {
    console.log("点击确认了");

    var key = '';
    var that = this;
    var br = that.data.button_array;

    for (var i in br) {
      var first_key = br[i].key + '=';
      if (br[i].is_chose) {
        var flag = false;
        for (var j in br[i].options) {
          if (br[i].options[j].is_chose) {
            if (flag) {
              first_key = first_key + ',';
            }
            flag = true;
            first_key = first_key + j;
          }
          /* 暂时用不到第三类
          for (var k in br[i].options[j].options) {
            br[i].options[j].options[k].is_chose = false;
          }
          */
        }
        if (key != '') {
          key = key + '&';
        }
        key = key + first_key;
      }
    }

    console.log(key);


    that.setData({
      key: key,
      cloth_list: [],
      cloth_list_left: [],
      cloth_list_right: []
    });

    that.setData({
      is_shows: that.data.is_shows,
    })
    that.getList();
    this.hideModal();
    this.triggerEvent("cancelEvent");
  },

  //确认事件
  _confirmModal: function () {
    console.log("点击重置了");

    var that = this;
    var br = that.data.button_array;

    for (var i in br) {
      br[i].is_chose = false;
      for (var j in br[i].options) {
        br[i].options[j].is_chose = false;
        for (var k in br[i].options[j].options) {
          br[i].options[j].options[k].is_chose = false;
        }
      }
    }

    that.setData({
      chose_a: 0,
      chose_b: -1,
      button_array: br
    });

    this.triggerEvent("confirmEvent");
  },

  _confirmEventFirst: function () {
    console.log("点击确定了!");
    this.Modal.hideModal();
  },
  _cancelEvent: function () {
    console.log("点击取消!");
  }
})