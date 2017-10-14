// pages/mine/mine.js


var app=getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    userInfo: {},
    login:'',
    xorLogin:''
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    }
    var js = !app.globalData.isLogin
    that.setData({
      login:app.globalData.isLogin,
      xorLogin:js
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
    return {
      title: '恩维环境',
      path: '/pages/mine/mine',

      success: function (res) {
        // 转发成功
        console.log('successful!')
      },
      fail: function (res) {
        // 转发失败
        console.log('failed!')
      }
    }

  },
  //跳转
  navigateTo:function(e){
    var id=e.currentTarget.id
    if(id==0){
      console.log(id)
      wx.navigateTo({
        url: '../personalData/personalData',
      })
    }else if(id==1){
      wx.navigateTo({
        url: '',
      })
    } else if (id == 2) {
      wx.navigateTo({
        url: '../collection/collection',
      })
    } else if (id == 3) {
      wx.navigateTo({
        url: '../focus/focus',
      })
    } else if (id == 4) {
      wx.navigateTo({
        url: '../introduction/introduction',
      })
    }

  },
  //登陆
  login:function(e){
    //改变全局变量的值
    //app.globalData.isLogin = false
    wx.getUserInfo({
      
    })
    wx.login({
      success: function (res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: '',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
  }
})