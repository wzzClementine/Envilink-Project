// pages/message/message.js
const app = getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
    comments:[],
    postId:[]
    //selected:1,
    //isShow0: false,
    //isShow1:true,
    //isShow2:true,
    //isShow3:true
    //login:'',
    //xorLogin:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this

    wx.request({
      url: 'https://mp.envilink.com/index.​php?rest_route=/wp/v2/comments',
      success: function (res) {
        console.log('comment', res.data)
        var replyArr = [];
        var passages = [];
        var postId = [];
        for (var i = 0; i < res.data.length; i++) {
          replyArr.push(res.data[i].content.rendered)
        }
        for (let i = 0; i < replyArr.length; i++) {
          WxParse.wxParse('reply' + i, 'html', replyArr[i], that);
          if (i === replyArr.length - 1) {
            WxParse.wxParseTemArray("replyTemArray", 'reply', replyArr.length, that)
          }
        }
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].date = res.data[i].date.slice(0, 10)
          var leng = res.data.length
          wx.request({
            url: 'https://mp.envilink.com/index.​php?rest_route=/wp/v2/posts/' + res.data[i].post,
            success:function(res){
              passages.push(res.data.excerpt.rendered)
              postId.push(res.data.id)
              if (passages.length - 1 == leng - 1) {
                for (let i = 0; i < passages.length; i++) {
                  WxParse.wxParse('passage' + i, 'html', passages[i], that);
                  if (i === passages.length - 1) {
                    WxParse.wxParseTemArray("passageArray", 'passage', passages.length, that)
                  }
                }
              };
            }
          })
        }
        console.log('passges',passages)

        that.setData({
          comments:res.data,
          postId:postId,
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
  //切换导航栏
  switchTab:function(e){
    var that = this

    var id = e.currentTarget.id

    console.log(id)
   

    if (id == 0) {
      that.setData({
        isShow0:false,
        isShow1: true,
        isShow2: true,
        isShow3: true

      })
    }
    if(id==1){
      that.setData({
        isShow0: true,
        isShow1: false,
        isShow2: true,
        isShow3: true
    })
    }

    if (id == 2) {
        that.setData({
          isShow0: true,
          isShow1: true,
          isShow2: false,
          isShow3: true
      })
    } 
   if (id == 3) {
      that.setData({
        isShow0: true,
        isShow1: true,
        isShow2: true,
        isShow3: false,
 
    })
  }
  },
  //跳转
  turnToPassage:function(e){
    var that = this
    var id=e.currentTarget.id
    console.log(id)
    wx.navigateTo({
      url: '../passageDetails/passageDetails?id='+id,
    })
  }
})