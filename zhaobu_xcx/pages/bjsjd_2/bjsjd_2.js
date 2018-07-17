// pages/bjsjd/bjsjd.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        t_list: {},
        t_name: '加工厂',
        is_remove: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var app = getApp();
        this.setData({
            t_list: app.globalData.sjd_t_list,
            t_name: app.globalData.sjd_t_name,
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
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    
    chose_cloth: function () {
        wx.redirectTo({
            url: '../xzml/xzml'
        })
    },

    save_sjd: function () {

    },

    remove_sjd: function () {
        this.setData({
            is_remove: true
        })
    },

    remove_sjd_yes: function () {
        this.setData({
            is_remove: false
        })
        /*
        wx.redirectTo({
            url: '../sysjd/sysjd'
        })
        */
    },

    remove_sjd_no: function () {
        this.setData({
            is_remove: false
        })
    }
})