//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    imgUrls: [
     'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505892393563&di=4d186efedf56a3adb65e053f04ed804b&imgtype=0&src=http%3A%2F%2Fpic.90sjimg.com%2Fback_pic%2F00%2F04%2F20%2F33%2Fab33a66306110626b391799bd81b5ee1.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505892485285&di=ea6e034fc56929e0c4809d9529167ee5&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F13%2F18%2F12%2F92b1OOOPIC90.jpg',
      'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1505893482635&di=75f9e195845fcd05c3f31dd98ee873c1&imgtype=0&src=http%3A%2F%2Fpic2.ooopic.com%2F13%2F18%2F12%2F93b1OOOPIC28.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    circular:true,
    navigation: [' 环境检测', '污染治理', '健康风险', '装修材料',  '谣言鉴定', '室内污染']
  },
  //事件处理函数
  
  onLoad: function () {
    var that = this
    wx.request({
      url: 'http://174.138.21.126/wp-json/wp/v2/posts',

      success: function (res) {
        console.log(res.data)
        console.log(res.data[0].content)
        var url = res.data[0]._links.replies[0].href
        var url2 = res.data[0]._links.author[0].href
        wx.request({
         url: url,
          success:function(res){
            console.log('comments', res.data)
            wx.request({
              url: url2,
              success:function(res){
                console.log('author', res.data)
              }
            })

          }
        })
        
      }
      
    })
    
  },
  onShareAppMessage: function () {
    return {
      title: '恩维环境',
      path: '/pages/index/index',

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

  
  turnToPassageDetail:function(e){
    wx.navigateTo({
      url: '../passageDetails/passageDetails',
    })
  },


  navigateTo: function (e) {
    var id=e.currentTarget.id
    console.log(id)
    wx.navigateTo({
      url: '../classificationPassages/classificationPassages?id='+id,
    })
  }
})

