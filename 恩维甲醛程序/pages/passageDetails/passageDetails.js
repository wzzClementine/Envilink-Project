// pages/passageDetails/passageDetails.js
var WxParse = require('../../wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:[],
    reply:[],
    InitialCicon:'/imag/collection01.png',
    iconCPath:'/imag/collection01.png',
    iconCSelectedPath: '/imag/collected02.png',
    InitialLicon: '/imag/like02.png',
    iconLPath: '/imag/like02.png',
    iconLSelectedPath: '/imag/like01.png',
    n:0,
    i:0,
    readAmount:4839,
    likeAmount:765,
    input:'',
    org:'',
    isReply:true,
    reply:'',
    orgR:'',
    height:0,
    id:0,
    title:'',
    time:'',
    author:'',
    content:'',
    author_id:0,
    cover:'',
    parent_id:0,
    passage_id:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id=options.id
    var author_id = this.data.author_id
    var replyArr = [];
    var comArr =[];
    var reply0 = []
    console.log(id)
    wx.request({
      url: 'https://mp.envilink.com/index.​php?rest_route=/wp/v2/posts/'+id,
      success:function(res){
        console.log('passage',res.data)

        var article = res.data.content.rendered
        WxParse.wxParse('article', 'html', article, that, 5);
        that.setData({
          title:res.data.title.rendered,
          time:res.data.date.slice(0,10),
          passage_id:res.data.id      
        })
        wx.request({
          url: 'https://mp.envilink.com/index.​php?rest_route=/wp/v2/users/' + res.data.author,
          success: function (res) {
            that.setData({
              author: res.data.name
            })
          }
        })
        wx.request({
          url: res.data._links['wp:attachment'][0].href,
          success:function(res){
            that.setData({
              cover: res.data[0].source_url
            })
          }
        })
        wx.request({
          url: 'https://mp.envilink.com/index.​php?rest_route=/wp/v2/comments&post=' + res.data.id,
          success: function (res) {
            for (var i = 0; i < res.data.length; i++) {
                comArr.push(res.data[i].content.rendered)
                res.data[i].date = res.data[i].date.slice(0, 10)
            }
            for (let i = 0; i < comArr.length; i++) {
              WxParse.wxParse('comment' + i, 'html', comArr[i], that);
              if (i === comArr.length - 1) {
                WxParse.wxParseTemArray("comArray", 'comment', comArr.length, that)
              }
            }
            that.setData({
              comments:res.data
            })
            console.log(res.data)
          }
        })
      }
    })

      
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.windowHeight)
        that.setData({
          height:res.windowHeight
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var read = this.data.readAmount
    var that=this
    read++;
    that.setData({
      readAmount:read
    })
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
      title: '恩维环境知识贴',
      path: '/pages/passageDetails/passageDetails',

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
  //收藏
  changeIcon:function(e){

    var counter=this.data.i+1
    
    var that=this

    var path = this.data.InitialCicon

    var iconPath=this.data.iconCPath
    var iconSelectedPath = this.data.iconCSelectedPath

    if(counter%2==0){
      that.setData({
        InitialCicon:iconPath,
        i:counter
      })
      wx.showToast({
        title: '已取消',
        image: '/imag/cancel01.png',
        duration: 1000
      })
    }else{
      that.setData({
        InitialCicon: iconSelectedPath,
        i:counter
      })
      wx.showToast({
        title: '已收藏',
        icon: 'success',
        duration: 1000
      })
    }
  },

//点赞
  addLikeAmount:function(e){
    var counter = this.data.n + 1

    var that = this

    var path = this.data.InitialLicon

    var iconPath = this.data.iconLPath
    var iconSelectedPath = this.data.iconLSelectedPath

    if (counter % 2 == 0) {
      var like=this.data.likeAmount
      like--;
      that.setData({
        InitialLicon: iconPath,
        n: counter,
        likeAmount:like
      })
    } else {
      var like = this.data.likeAmount
      like++;
      that.setData({
        InitialLicon: iconSelectedPath,
        n: counter,
        likeAmount: like
      })
    }
  },


  //点击键盘完成触发
  getContent:function(e){
    var that=this
    var passage_id=this.data.passage_id
    console.log(e.detail.value)
    //判断输入是否为空，再将数据传入数据库
    if(e.detail.value!=''){
      that.setData({
        input: e.detail.value,
        org: ''
      })
       //将input的内容传入数据库
      wx.request({
        url: 'https://mp.envilink.com//wp-json/wp/v2/comments', //仅为示例，并非真实的接口地址
        data: {
          content: e.detail.value,
          post: passage_id
        },
        method: 'POST',
        header: {
          'content-type': 'application/json',// 默认值
          'Authorization': 'Bearer      eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbXAuZW52aWxpbmsuY29tIiwiaWF0IjoxNTE1ODIwNzQwLCJuYmYiOjE1MTU4MjA3NDAsImV4cCI6MTUxNjQyNTU0MCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiNCJ9fX0.khl79z4doajEoWsSvb3f0S136alAUxOGII2_3KZlgCM'
        },
        success: function (res) {
          console.log(res.data)
          wx.showToast({
            title: '发布成功！',
            icon: 'success',
            duration: 1000
          })

        },
        fail: function (e) {
          console.log('failed!')
        }
      })
    } else {
      wx.showToast({
        title: '不能为空哦~',
        image: '/imag/cancel01.png',
        duration: 1000
      })
    }
  },


  //暂存输入的评论内容
  saveContent:function(e){
    var that=this
    that.setData({
      input: e.detail.value,
    })
  },



  //点击图标按钮触发
  submitJudgment:function(e){
    var that = this
    var input = this.data.input
    var passage_id = this.data.passage_id
    //判断输入是否为空，再将数据传入数据库
    if(input!=''){
       console.log(input)
       that.setData({
         org: ''
       })
       //将input的内容传入数据库
       wx.request({
         url: 'https://mp.envilink.com//wp-json/wp/v2/comments', //仅为示例，并非真实的接口地址
         data: {
           content: input,
           post: passage_id
         },
         method: 'POST',
         header: {
           'content-type': 'application/json',// 默认值
           'Authorization': 'Bearer      eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbXAuZW52aWxpbmsuY29tIiwiaWF0IjoxNTE1ODIwNzQwLCJuYmYiOjE1MTU4MjA3NDAsImV4cCI6MTUxNjQyNTU0MCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiNCJ9fX0.khl79z4doajEoWsSvb3f0S136alAUxOGII2_3KZlgCM'
         },
         success: function (res) {
           console.log(res.data)
           wx.showToast({
             title: '发布成功！',
             icon: 'success',
             duration: 1000
           })

         },
         fail: function (e) {
           console.log('failed!')
         }
       })
    }else{
      wx.showToast({
        title: '不能为空哦~',
        image: '/imag/cancel01.png',
        duration: 1000
      })
    }
  },



  //删除
  deleteComment:function(e){

  },


  //回复评论,显示回复框
  replyComment:function(e){
    var that = this
    that.setData({
      isReply:false,
      parent_id: e.currentTarget.id
    })
    console.log(this.data.parent_id)
  },


//关闭回复框
  hiddenAndSave:function(e){
    var that =this    
    that.setData({
      isReply: true,
      reply:e.detail.value
    })
  },


//键盘完成触发（回复）
  getReplyContent:function(e){
    var that = this
    var id= this.data.parent_id
    var passage_id = this.data.passage_id
    console.log(e.detail.value)
    if (e.detail.value != ''){
      that.setData({
        reply: e.detail.value,
        orgR: '',
      })
      wx.request({
        url: 'https://mp.envilink.com//wp-json/wp/v2/comments', //仅为示例，并非真实的接口地址
        data: {
          content: e.detail.value,
          post: passage_id,
          parent: id
        },
        method: 'POST',
        header: {
          'content-type': 'application/json',// 默认值
          'Authorization': 'Bearer      eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbXAuZW52aWxpbmsuY29tIiwiaWF0IjoxNTE1ODIwNzQwLCJuYmYiOjE1MTU4MjA3NDAsImV4cCI6MTUxNjQyNTU0MCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiNCJ9fX0.khl79z4doajEoWsSvb3f0S136alAUxOGII2_3KZlgCM'
        },
        success: function (res) {
          console.log(res.data)
          wx.showToast({
            title: '发布成功！',
            icon: 'success',
            duration: 1000
          })

        },
        fail: function (e) {
          console.log('failed!')
        }
      }) 
    }
  },


//图标按钮完成触发（触发）
  submitReply:function(e){
    var that = this
    var input = this.data.reply
    var id= this.data.parent_id
    var passage_id = this.data.passage_id
    //判断输入是否为空，再将数据传入数据库
    if (input != '') {
      console.log(input)
      that.setData({
        orgR:'',
      })
      //将input的内容传入数据库
      wx.request({
        url: 'https://mp.envilink.com//wp-json/wp/v2/comments', //仅为示例，并非真实的接口地址
        data: {
          content: input,
          post: passage_id,
          parent: id
        },
        method: 'POST',
        header: {
          'content-type': 'application/json',// 默认值
          'Authorization': 'Bearer      eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbXAuZW52aWxpbmsuY29tIiwiaWF0IjoxNTE1ODIwNzQwLCJuYmYiOjE1MTU4MjA3NDAsImV4cCI6MTUxNjQyNTU0MCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiNCJ9fX0.khl79z4doajEoWsSvb3f0S136alAUxOGII2_3KZlgCM'
        },
        success: function (res) {
          console.log(res.data)
          wx.showToast({
            title: '发布成功！',
            icon: 'success',
            duration: 1000
          })
        },
        fail: function (e) {
          console.log('failed!')
        }
      })





    } else {
      wx.showToast({
        title: '不能为空哦~',
        image: '/imag/cancel01.png',
        duration: 1000
      })
    }
  },
  //添加关注
  add:function(e){

  },
  //测试评论
  test:function(e){
    wx.request({
      url: 'https://mp.envilink.com//wp-json/wp/v2/comments', //仅为示例，并非真实的接口地址
      data: {
        content: '测试测试测试.....',
        post: '1'
      },
      method:'POST',
      header: {
        'content-type': 'application/json' ,// 默认值
        'Authorization':'Bearer      eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvbXAuZW52aWxpbmsuY29tIiwiaWF0IjoxNTE1ODIwNzQwLCJuYmYiOjE1MTU4MjA3NDAsImV4cCI6MTUxNjQyNTU0MCwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiNCJ9fX0.khl79z4doajEoWsSvb3f0S136alAUxOGII2_3KZlgCM'
      },
      success: function (res) {
        console.log(res.data)

        
      }
    })

  }
})