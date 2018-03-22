//index.js
//
const app = getApp()

var WxParse = require('../../wxParse/wxParse.js');

// 引入 QCloud 小程序增强 SDK
var qcloud = require('../../vendor/qcloud-weapp-client-sdk/index');

// 引入配置
var config = require('../../config');

// 显示繁忙提示
var showBusy = text => wx.showToast({
  title: text,
  icon: 'loading',
  duration: 10000
});

// 显示成功提示
var showSuccess = text => wx.showToast({
  title: text,
  icon: 'success'
});

// 显示失败提示
var showModel = (title, content) => {
  wx.hideToast();

  wx.showModal({
    title,
    content: JSON.stringify(content),
    showCancel: false
  });
};

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
    navigation: [{
      title:'环境检测',
      id:'2'
    },{
      title: '污染治理',
      id: '3'
    },{
      title: '健康风险',
      id: '4'
    }, {
      title: '装修材料',
      id: '5'
    }, {
      title: '谣言鉴定',
      id: '6'
    }, {
      title: '室内污染',
      id: '7'
    }],
    login:'',

   /*登陆部分数据*/
    loginUrl: config.service.loginUrl,
    requestUrl: config.service.requestUrl,
    tunnelUrl: config.service.tunnelUrl,
    tunnelStatus: 'closed',
    tunnelStatusText: {
      closed: '已关闭',
      connecting: '正在连接...',
      connected: '已连接'
    },
    pages_id:0,
    pics:[],
    authorName:[],
    contentArray:[]
  },
  //测试登陆SDK
  /**
     * 点击「登录」按钮，测试登录功能
     */
  doLogin() {
    showBusy('正在登录');

    // 登录之前需要调用 qcloud.setLoginUrl() 设置登录地址，不过我们在 app.js 的入口里面已经调用过了，后面就不用再调用了
    qcloud.login({
      success(result) {
        showSuccess('登录成功');
        console.log('登录成功', result);
      },

      fail(error) {
        showModel('登录失败', error);
        console.log('登录失败', error);
      }
    });
  },

  /**
   * 点击「清除会话」按钮
   */
  clearSession() {
    // 清除保存在 storage 的会话信息
    qcloud.clearSession();
    showSuccess('会话已清除');
  },
  //
  onLoad: function () {
    var that = this
    var pics = []
    var name = []
    wx.request({
      url: 'https://mp.envilink.com/wp-json/wp/v2/posts/',
      success: function (res) {
        console.log('passages', res.data)
        var replyArr = [];
        for (var i = 0; i < res.data.length; i++) {
          replyArr.push(res.data[i].excerpt.rendered)
        }
        for (let i = 0; i < replyArr.length; i++) {
          WxParse.wxParse('reply' + i, 'html', replyArr[i], that);
          if (i === replyArr.length - 1) {
            WxParse.wxParseTemArray("replyTemArray", 'reply', replyArr.length, that)
          }
        }
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].date = res.data[i].date.slice(0, 10)
          wx.request({
            url: res.data[i]._links['wp:attachment'][0].href,
            success: function (res) {
              pics.push(res.data[0])
              console.log(res.data[0])
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
        that.setData({
          passages: res.data,
        })
      }
    })
   


    
   //测试登陆SDK
   
    
    //检查session状态并设置isLogin的值

    wx.checkSession({
      success: function () {
        //session 未过期，并且在本生命周期一直有效
      
      },
      fail: function () {
        //如果过期则设置isLogin为true隐藏部分功能
   
  }
})
    
  },
  onReady:function(e){
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
    var id= e.currentTarget.id
    console.log('id',id)
    if (this.data.login == false) {
      wx.navigateTo({
        url: '../passageDetails/passageDetails?id='+id,
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '登录后即可浏览文章，是否要登录？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.reLaunch({
              url: '../mine/mine',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },


  navigateTo: function (e) {
    var id=e.currentTarget.id
    console.log(id)
    if (this.data.login==false){
      wx.navigateTo({
        url: '../classificationPassages/classificationPassages?id='+id,
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '登录后即可浏览文章，是否要登录？',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.reLaunch({
              url: '../mine/mine',
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  }
})

