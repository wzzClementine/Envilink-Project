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
    passageList:[],
    pics: [],
    authorName: [],
    contentArray: []
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    //获取相应的页面标题
    var id=options.id
    var title=this.data.navigation[id-2]
    var titleImage = this.data.titleImageList[id-2]
    console.log(options.id)
    that.setData({
       title:title,
       titleImage: titleImage,
       idP:id
    })
    
    //获取分类对应的文章
    var pics = []
    var name = []
    wx.request({
      url: 'https://mp.envilink.com/index.​php?rest_route=/wp/v2/posts&categories[0]='+id,
      success: function (res) {
        console.log('passages', res.data)
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].date = res.data[i].date.slice(0, 10)
          wx.request({
            url: res.data[i]._links['wp:attachment'][0].href,
            success: function (res) {
              console.log(res.data)
              pics.push(res.data[0])
              that.setData({
                pics: pics
              })
            }
          })
          wx.request({
            url: 'https://mp.envilink.com/index.​php?rest_route=/wp/v2/users/' + res.data[i].author,
            success: function (res) {
              name.push(res.data.name)
              that.setData({
                authorName: name
              })
            }
          })
        }
        console.log('pics',pics)
        that.setData({
          passageList: res.data,
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
  turnTo:function(e){
    var id = e.currentTarget.id
    wx.navigateTo({
      url: '../passageDetails/passageDetails?id='+id,
    })
  }
})