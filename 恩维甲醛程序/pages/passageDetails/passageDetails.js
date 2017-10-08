// pages/passageDetails/passageDetails.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examples: [
      {
        avatar: "/imag/avatar01.jpg",
        name: 'clementine',
        time: '2017.09.17',
        commentDetails: '这是什么啊？好漂亮哦！',
        commentReply:[{
          nickName: '王大锤',
          replyContent: '你在说啥子哦？听不懂哦~~~~~'
        },{
          nickName:'刘星雨',
          replyContent: '哈哈哈哈哈,王大锤这个逗比!!!!!'
        },{
          nickName: 'clementine'+' 回复 '+'王大锤',
          replyContent: '你这个瓜皮'
          
        }]
      }, {
        avatar: "/imag/avatar02.jpg",
        name: 'Katherine',
        time: '2017.02.22',
        commentDetails: '哈哈哈哈，这样真的好吗？？？',
        commentReply: [{
          nickName: '王大锤',
          replyContent: '你在说啥子哦？听不懂哦~~~~~'
        }, {
          nickName: '刘星雨',
          replyContent: '哈哈哈哈哈,王大锤这个逗比!!!!!'
        }]
      }, {
        avatar: "/imag/avatar03.jpg",
        name: 'Felicity',
        time: '2017.08.02',
        commentDetails: '词穷了词穷了，随便发了随便发了',
      }],
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
    id:'initial'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var id1=options.id
    if(id1==null){}
    else{
      that.setData({
        id: id1
      })
    }
    
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
  getContent:function(e){
    var that=this
    console.log(e.detail.value)

    //判断输入是否为空，再将数据传入数据库

    that.setData({
      input:e.detail.value,
      org:''
    })
    //将input的内容传入数据库




  },
  saveContent:function(e){
    var that=this

    that.setData({
      input: e.detail.value,
    })

  },
  submitJudgment:function(e){
    var that = this
    var input = this.data.input
    //判断输入是否为空，再将数据传入数据库
    if(input!=''){

       console.log(input)
       that.setData({
         org: ''
       })
       //将input的内容传入数据库






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
  //回复评论
  replyComment:function(e){
    var that = this
    that.setData({
      isReply:false
    })
  },
  hiddenAndSave:function(e){
    var that =this
    
    that.setData({
      isReply: true,
      reply:e.detail.value
    })
  },
  getReplyContent:function(e){
    var that = this
    console.log(e.detail.value)

    that.setData({
      reply:e.detail.value,
      orgR: '',
    })
  },
  submitReply:function(e){
    var that = this
    var input = this.data.reply
    //判断输入是否为空，再将数据传入数据库
    if (input != '') {

      console.log(input)
      that.setData({
        orgR:'',
      })
      //将input的内容传入数据库






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

  }
})