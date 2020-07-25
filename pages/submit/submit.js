// pages/submit/submit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    msg: "您的分数是： ",
    score: 0,
    desc: ""
  },
  toAnswer: function () {
    wx.navigateTo({
      url: '../topic/topic'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 调用方法外面的方法，一定要加this., 否则就是未定义
    let result = this.initResult();
    let score = options.score;
    let rmsg = "";
    if (score <= 100) {
      rmsg = result.rButton;
    } else if (score <= 160) {
      rmsg = result.rCenter;
    } else if (score <= 200) {
      rmsg = result.rTop;
    }else {
      rmsg = result.rButton;
    }
    this.setData({
      score: score,
      desc: rmsg
    });

  },
  initResult: function () {
    let result = {
      rButton: "当你在面临压力时，你经常缺少警觉性，即使身边发生某些事故你也总是反应迟钝，比别人晚发现，千万不要因为受过伤害而怨天尤人或者萎靡不振。建议你多看些相关书籍，或者多与人接触沟通，增加你的警觉性。",
      rCenter: "你能与他人关系相处融洽、亲善，让每一个人都感到心情舒畅，也因此，与你协作的人办事效率通常也比别人高，如果你能再释放些你的热情，相信在任何情况下你都能突破自己，提升自身的能力。",
      rTop: "你的情商已到登峰造极的境界，你喜欢挑战自己，激发你的热情。你善于利用他人情绪状态不好的时机对他人进行情绪教育，帮助他人明白是什么使他们感到不安，他们正在感受的情绪状态是怎样的，以及他们能进行的选择。"
    };
    return result;
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

  }
})