// pages/sjd/sjd.js
import {
  $wuxToast
} from '../../components/wux'
var animation = wx.createAnimation({})
var i = 1; 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    heading: "开心小游戏",
    lastUrl: "",
    z: 999999,
    index: 0,
    is_win_first: false,
    animationData: '',
    donghua: true,
    left1: Math.floor(Math.random() * 305 + 1),
    left2: Math.floor(Math.random() * 305 + 1),
    left3: Math.floor(Math.random() * 305 + 1),
    left4: Math.floor(Math.random() * 305 + 1),
    left5: Math.floor(Math.random() * 305 + 1),
    left6: Math.floor(Math.random() * 305 + 1),
    user_score: 0,
    image_list:[],
    image_index: 2,
    image_check: [false,false,false,false,false]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var that = this;
    that.setData({
      heading: "开心小游戏",
      lastUrl: "",
      z: 999999,
      index: 0,
      is_win_first: false,
      animationData: '',
      donghua: true,
      left1: Math.floor(Math.random() * 305 + 1),
      left2: Math.floor(Math.random() * 305 + 1),
      left3: Math.floor(Math.random() * 305 + 1),
      left4: Math.floor(Math.random() * 305 + 1),
      left5: Math.floor(Math.random() * 305 + 1),
      left6: Math.floor(Math.random() * 305 + 1),
      user_score: 0,
      image_list: [],
      image_index: 2,
      image_check: [false, false, false, false, false]
    })
    wx.request({
      url: 'https://by.edenhe.com/api/game/info',
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          user_score: res.data.data.score
        })
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
    wx.request({
      url: 'https://by.edenhe.com/api/game/get_cloth',
      method: 'get',
      header: {
        Cookie: wx.getStorageSync('cookie'),
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          image_list: res.data.data
        })
      },
      fail: function (res) {
        console.log(res.data);
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.title = this.selectComponent("#title");
    getApp().globalData.lastUrl = -2
    this.setData({
      lastUrl: getApp().globalData.lastUrl,
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },

  //触摸开始事件
  touchstart: function(e) {
    console.log(e.touches[0].pageX);
    this.data.touchDot = e.touches[0].pageX;
    var that = this;
    this.data.interval = setInterval(function() {
      that.data.time += 1;
    }, 100);
  },
  //触摸移动事件
  touchmove: function(e) {
    let touchMove = e.touches[0].pageX;
    let touchDot = this.data.touchDot;
    let time = this.data.time;
    console.log("touchMove: " + touchMove + ", touchDot: " + touchDot + ", diff: " + (touchMove - touchDot));

    // if (touchMove - touchDot <= -100 && time < 10 && !this.data.done) {
    //   console.log("向左滑动");
    //   this.data.done = true;
    //   this.scrollLeft();
    // }
    // //向右滑动
    // if (touchMove - touchDot >= 100 && time < 10 && !this.data.done) {
    //   console.log("向右滑动");
    //   this.data.done = true;
    //   this.scrollRight();
    // }
  },
  //触摸结束事件
  touchend: function(e) {
    clearInterval(this.data.interval);
    this.data.time = 0;
    this.data.done = false;
  },

  //向左滑动事件
  scrollLeft() {
    var animation1 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation2 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation3 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation4 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation5 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })

    this.animation1 = animation1;
    this.animation2 = animation2;
    this.animation3 = animation3;
    this.animation4 = animation4;
    this.animation5 = animation5;

    this.animation1.translateX(-60).opacity(0).step();
    this.animation2.translateX(-150).opacity(0).scale(1.8, 1.8).step();
    this.animation3.translateX(-110).opacity(0.5).scale(3.8, 3.8).step();
    this.animation4.translateX(-70).opacity(1).scale(2.8, 2.8).step();
    this.animation5.translateX(-30).opacity(0.5).scale(3.8, 3.8).step();


    this.setData({
      animation1: animation1.export(),
      animation2: animation2.export(),
      animation3: animation3.export(),
      animation4: animation4.export(),
      animation5: animation5.export()
    })

    var that = this;
    setTimeout(function() {
      that.animation1.translateX(-150).opacity(0).scale(1.8, 1.8).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation2.translateX(-140).opacity(0.5).scale(2.8, 2.8).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation3.translateX(0).opacity(1).scale(3.8, 3.8).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation4.translateX(140).opacity(0.5).scale(2.8, 2.8).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation5.translateX(150).opacity(0).scale(1.8, 1.8).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.setData({
        animation1: animation1.export(),
        animation2: animation2.export(),
        animation3: animation3.export(),
        animation4: animation4.export(),
        animation5: animation5.export()
      })
      if (that.data.image_index == 4) {
        that.setData({
          image_index : 0
        })
      } else {
        that.setData({
          image_index : that.data.image_index + 1
        })
      }
      console.log(that.data.image_index);
    }.bind(this), 195)

    let array = this.data.image_list;
    let shift = array.shift();
    array.push(shift);

    setTimeout(function() {
      this.setData({
        image_list: array
      })
    }.bind(this), 195)
  },

  //向右滑动事件
  scrollRight() {
    var animation1 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation2 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation3 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation4 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })
    var animation5 = wx.createAnimation({
      duration: 300,
      timingFunction: "linear",
      delay: 0
    })

    this.animation1 = animation1;
    this.animation2 = animation2;
    this.animation3 = animation3;
    this.animation4 = animation4;
    this.animation5 = animation5;

    this.animation1.translateX(30).opacity(0.5).scale(1.8, 1.8).step();
    this.animation2.translateX(70).opacity(1).scale(2.8, 2.8).step();
    this.animation3.translateX(110).opacity(0.5).scale(3.8, 3.8).step();
    this.animation4.translateX(120).opacity(0).scale(1.8, 1.8).step();
    this.animation5.translateX(130).opacity(0).step();


    this.setData({
      animation1: animation1.export(),
      animation2: animation2.export(),
      animation3: animation3.export(),
      animation4: animation4.export(),
      animation5: animation5.export()
    })

    var that = this;
    setTimeout(function() {
      that.animation1.translateX(-50).opacity(0).scale(1.8, 1.8).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation2.translateX(-40).opacity(0.5).scale(2.8, 2.8).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation3.translateX(0).opacity(1).scale(3.8, 3.8).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation4.translateX(40).opacity(0.5).scale(2.8, 2.8).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.animation5.translateX(50).opacity(0).scale(1.8, 1.8).step({
        duration: 0,
        timingFunction: 'linear'
      });
      that.setData({
        animation1: animation1.export(),
        animation2: animation2.export(),
        animation3: animation3.export(),
        animation4: animation4.export(),
        animation5: animation5.export()
      })
      if (that.data.image_index == 0) {
        that.setData({
          image_index: 4
        })
      } else {
        that.setData({
          image_index: that.data.image_index - 1
        })
      }
      console.log(that.data.image_index);
    }.bind(this), 195)

    let array = this.data.image_list;
    let pop = array.pop();
    array.unshift(pop);

    setTimeout(function() {
      this.setData({
        image_list: array
      })
    }.bind(this), 195)
  },

  onScanQRCode: function(e) {
    var that = this;
    // 只允许从相机扫码
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        console.log(res);
        var code = res.result
        code = code.split(':')[2]
        code = code.split('-')[0]
        console.log(e);
        if (that.data.image_index.cloth_id == code) {
          var data = {
            "score": 1
          }
          wx.request({
            url: 'https://by.edenhe.com/api/game/info/',
            method: 'post',
            header: {
              Cookie: wx.getStorageSync('cookie'),
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: data,
            success: function (res) {
              console.log(res.data);
              that.setData({
                user_score: that.data.user_score + 1,
              })
              var tidx = that.data.image_index;

              that.data.image_check[tidx] = true
              that.setData({
                image_check: that.data.image_check
              })
              $wuxToast.show({
                type: 'success',
                timer: 500,
                color: '#fff',
                text: '恭喜你答对啦~',
              })
              setTimeout(function () {
                $wuxToast.show({
                  type: 'success',
                  timer: 1500,
                  color: '#fff',
                  text: '本页答对4个可以进入下一关(如果积分不为5则扣除2积分)',
                })
              }, 1000)
            },
            fail: function (res) {
              console.log(res.data);
            }
          })
        } else {
          console.log(code);
          $wuxToast.show({
            type: 'cancel',
            timer: 500,
            color: '#fff',
            text: '答错啦!~',
            success: function () {
            }
          })
          
          setTimeout( function() {
            $wuxToast.show({
              type: 'cancel',
              timer: 1500,
              color: '#fff',
              text: '返回上一页，可以刷新图片列表(扣除2积分)',
            })
          }, 1000)
        }
      }
    })
    
  },

  onNext: function() {
      this.onReady()
  },

  donghua: function () {
    setTimeout(function () {
      animation.translateY(604).step({ duration: 1000 })
      this.setData({
        ["animationData" + i]: animation.export()
      })
      i++;
    }.bind(this), 500)
    if (i < 7) {
      setTimeout(function () {
        this.donghua()
      }.bind(this), 500)
    } else {
      console.log(22)
      setTimeout(function () {
        this.setData({
          donghua: false
        })
      }.bind(this), 4500)
    }
  },

  onWin: function () {
    var that = this
    var num = 0
    for (var i in that.data.image_check) {
      if (that.data.image_check[i] == true) {
        num = num + 1
      }
    }

    if (num > 3) {
      that.setData({
        is_win_first: true
      })
    }
    if (that.data.is_win_first) {
      var animation = wx.createAnimation({
        duration: 1000,
        timingFunction: 'linear'
      })
      console.log(animation);
      that.animation = animation
      animation.translateY(400).step()
      that.setData({
        animationData: animation.export()

      })
      console.log(that.data.animationData);
      setTimeout(function () {
        animation.translateY(0).step()
        that.setData({
          animationData: animation.export()
        })
      }, 200)
      this.donghua()
    }
  }

})