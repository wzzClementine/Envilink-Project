// pages/classificationPassages/classificationPassages.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navigation: [' 环境检测', '污染治理', '健康风险', '装修材料', '谣言鉴定', '室内污染'],
    title:'',
    titleImageList:['/imag/test02.png','/imag/manage01.png','/imag/health01.png','/imag/material01.png','/imag/identify01.png','/imag/pollution01.png'],
    titleImage:'',
    passageList:[{
      cover:'/imag/poster01.jpg',
      title:'倡导低碳生活 呵护生态家园 共享碧水蓝天',
      readAmount:3786+' 浏览'
    }, {
      cover: '/imag/poster02.jpg',
      title: '环保只是为了人类自己',
      readAmount: 921 + ' 浏览'
      }, {
        cover: '/imag/poster03.jpg',
        title: '回顾2015中国生态环保业大数据报告',
        readAmount: 4176 + ' 浏览'
      },]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    //获取相应的页面标题
    var id=options.id
    var title=this.data.navigation[id]
    var titleImage = this.data.titleImageList[id]
    console.log(options.id)

    that.setData({
       title:title,
       titleImage: titleImage
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
  turnTo:function(e){
    wx.navigateTo({
      url: '../passageDetails/passageDetails',
    })
  }
})