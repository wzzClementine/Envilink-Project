// pages/message/message.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    examples:[
      {
        avatar:"/imag/avatar01.jpg",
        name:'clementine',
        time:'2017.09.17',
        commentDetails:'这是什么啊？好漂亮哦！',
        post: '【中国环保在线 废气处理】《中国煤电清洁发展报告》显示，煤电仍是我国电力供应的主力电源和基础电源，但是技术已经达到世界先进水平，清洁发展取得巨大成效。在十几年的努力下，燃煤电厂大气污染物控制装置基本形成了全覆盖。'
      },{
        avatar: "/imag/avatar02.jpg",
        name: 'Katherine',
        time: '2017.02.22',
        commentDetails: '哈哈哈哈，这样真的好吗？？？',
        post: '以技术为媒，品质为窗，爱科昇振动机械(嘉兴)有限公司市场开拓步伐锐不可当。本着友好交流，提升品牌知名度的初衷，爱科昇携接力式气锤、活塞振动器等多款明星产品亮相第九届上海化工环保展，一经展出就引起热议。'
      },{
        avatar: "/imag/avatar03.jpg",
        name: 'Felicity',
        time: '2017.08.02',
        commentDetails: '已经不知道要说些什么了，就随便打几句话了，词穷了已经.....',
        post: '再将目光转向爱科昇的另一款明星产品——活塞振动器，多种款型任君挑选。一根螺栓即可安装，轻松便捷。而且，爱科昇还对旗下活塞振动器产品进行了特殊技术处理，大幅度提升了耐久性。无需加油就能使用，低噪音结构，更加符合节能环保的发展趋势。'
      }
    ],
    selected:1,
    isShow0: false,
    isShow1:true,
    isShow2:true,
    isShow3:true
  
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
  }
})