// pages/personalData/personalData.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    genderList:['请选择性别','男','女'],
    gender:'',
    location:['请选择所在城市','',''],
    index:0
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getUserInfo({
      success: function (res) {
        var userInfo = res.userInfo
        var nickName = userInfo.nickName
        var avatarUrl = userInfo.avatarUrl
        var gender = userInfo.gender //性别 0：未知、1：男、2：女
        var province = userInfo.province
        var city = userInfo.city
        var country = userInfo.country
        console.log(res)
        that.setData({
           userInfo:userInfo
        })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  //选择性别
  chooseGender:function(e){
    var that = this
    console.log(e.detail.value)
    that.setData({
      index: e.detail.value
    })
  },
  //选择城市
  bindRegionChange:function(e){
    var that = this
    console.log(e.detail.value)
    var city = e.detail.value
    that.setData({
      location:city
    })
 
  }
})