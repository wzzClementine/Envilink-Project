// pages/focus/focus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    authorList:[{
      ava:'/imag/ava01.png',
      name:'Catherine',
      sign:'欢迎私信投稿：联系方式-12345678910...'
    },{
      ava:'/imag/ava02.jpg',
      name:'Felicity',
      sign:'谢谢你这么可爱还关注我~~~'
    },{
      ava: '/imag/ava03.jpg',
      name: 'Clementine',
      sign: '最新的环保资讯都在这里有哦！！！'
    }]
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  //取消关注
  cancel:function(e){
    var that =this
    wx.showActionSheet({
      itemList: ['取消关注'],
      itemColor: "red",
      success: function (res) {
        if (!res.cancel) {
          //此处与后台连接，删除选定的元素并且重置列表刷新



          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 1300,
          })




          
        }
      }
    })
  }
})