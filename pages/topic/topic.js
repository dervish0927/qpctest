// pages/question/index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    desc: "现在，请静下心来，诚实地回答下面的测题。一定要按照您真正可能会去做的实际去回答，而不要试图用在学校里获取的做多项选择题的技巧去猜哪一个才是对的。好，下面开始!",
    quest: [],
    answerScore: [],
    score: 0
  }, // 点击问题答案触发事件
  answerSelected(e) {
    let outidx = e.currentTarget.dataset.outidx;
    let idx = e.currentTarget.dataset.idx;
    let question = this.data.quest[outidx];
    if (question.type == 1) {
      //单选
      for (let item of question.answers) {
        item.selected = false;
      }
      question.answers[idx].selected = true;
      this.setData({
        quest: this.data.quest
      });
    } else if (question.type == 2) {
      //多选
      question.answers[idx].selected = !question.answers[idx].selected;
      this.setData({
        quest: this.data.quest
      });
    }
  },

  // 点击提交按钮
  submit() {
    let {
      quest
    } = this.data;
    //用来保存选中的答案
    let answerSelected = [];
    for (let questItem of quest) {
      if (questItem.type == 1) { //处理单选题
        let isSelected = false;
        for (let answerItem of questItem.answers) {
          if (answerItem.selected) {
            //答案被选中
            isSelected = true;
            answerSelected.push(answerItem.index);
          }
        }
        if (!isSelected) {
          //如果一个都没选
          answerSelected.push('');
        }
      } else { //处理多选题
        let multiAnswer = [];
        for (let answerItem of questItem.answers) {
          if (answerItem.selected) {
            //答案被选中
            multiAnswer.push(answerItem.index);
          }
        }
        answerSelected.push(multiAnswer.join(','));
      }
    }
    console.log(answerSelected);
    let notSelect = [];
    for (let index = 0; index < answerSelected.length; index++) {
      const element = answerSelected[index];
      let id = index + 1;
      if (element == "") {
        notSelect.push(id);

      }
      this.scoring(id, element);
    }
    if (notSelect.length != 0) {
      wx.showModal({
        title: '提示',
        content: '第 ' + notSelect.toString() + ' 题没有答题！',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
      return;
    }
    //计算出结果；跳转道下一页
    this.toSubmit();
  },

  scoring: function (id, option) {
    for (let index = 0; index < this.data.answerScore.length; index++) {
      const element = this.data.answerScore[index];
      console.log(element.id);
      if (id == element.id) {
        for (let j = 0; j < element.scores.length; j++) {
          const optsco = element.scores[j];
          console.log(optsco);
          if (optsco.option == option) {
            this.data.score += optsco.score;
            break;
          }
        }
        break;
      }
    }
    console.log("总分：", this.data.score);
  },


  toSubmit: function () {
    let url = '/pages/submit/submit?score=' + this.data.score;
    wx.redirectTo({
      url: url
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.queryData();
    this.queryAnswerScore();
  },
  queryAnswerScore: function () {
    this.setData({
      answerScore: [{
        id: 1,
        scores: [{
          option: "A",
          score: 20
        }, {
          option: "B",
          score: 20
        }, {
          option: "C",
          score: 20
        }, {
          option: "D",
          score: 0
        }]
      }, {
        id: 2,
        scores: [{
          option: "A",
          score: 0
        }, {
          option: "B",
          score: 20
        }, {
          option: "C",
          score: 0
        }, {
          option: "D",
          score: 0
        }]
      }, {
        id: 3,
        scores: [{
          option: "A",
          score: 20
        }, {
          option: "B",
          score: 0
        }, {
          option: "C",
          score: 20
        }, {
          option: "D",
          score: 0
        }]
      }, {
        id: 4,
        scores: [{
          option: "A",
          score: 0
        }, {
          option: "B",
          score: 0
        }, {
          option: "C",
          score: 20
        }, {
          option: "D",
          score: 0
        }]
      }, {
        id: 5,
        scores: [{
          option: "A",
          score: 0
        }, {
          option: "B",
          score: 0
        }, {
          option: "C",
          score: 20
        }, {
          option: "D",
          score: 0
        }]
      }, {
        id: 6,
        scores: [{
          option: "A",
          score: 0
        }, {
          option: "B",
          score: 5
        }, {
          option: "C",
          score: 5
        }, {
          option: "D",
          score: 20
        }]
      }, {
        id: 7,
        scores: [{
          option: "A",
          score: 20
        }, {
          option: "B",
          score: 0
        }, {
          option: "C",
          score: 0
        }, {
          option: "D",
          score: 0
        }]
      }, {
        id: 8,
        scores: [{
          option: "A",
          score: 0
        }, {
          option: "B",
          score: 20
        }, {
          option: "C",
          score: 0
        }, {
          option: "D",
          score: 0
        }]
      }, {
        id: 9,
        scores: [{
          option: "A",
          score: 0
        }, {
          option: "B",
          score: 5
        }, {
          option: "C",
          score: 0
        }, {
          option: "D",
          score: 20
        }]
      }, {
        id: 10,
        scores: [{
          option: "A",
          score: 0
        }, {
          option: "B",
          score: 20
        }, {
          option: "C",
          score: 0
        }, {
          option: "D",
          score: 0
        }]
      }]

    });


  },

  queryData: function () {
    this.setData({
      quest: [{
        id: 1,
        type: 1, //类型，1.单选，2.多选
        question: "坐飞机时，突然受到很大的震动，你开始随着机身左右摇摆。这时候，您会怎样做呢?",
        answers: [{
          index: 'A',
          content: '继续读书或看杂志，或继续看电影，不太注意正在发生的骚乱'
        }, {
          index: 'B',
          content: '注意事态的变化，仔细听播音员的播音，并翻看紧急情况应付手，以备万一'
        }, {
          index: 'C',
          content: 'A和B都有一点'
        }, {
          index: 'D',
          content: '不能确定--根本没注意到'
        }]
      }, {
        id: 2,
        type: 1, //类型，1.单选，2.多选
        question: "带一群4岁的孩子去公园玩，其中一个孩子由于别人都不和他玩而大哭起来。这个时候，您该怎么办呢?",
        answers: [{
          index: 'A',
          content: '置身事外--让孩子们自己处理'
        }, {
          index: 'B',
          content: '和这个孩子交谈，并帮助她想办法'
        }, {
          index: 'C',
          content: '轻轻地告诉她不要哭'
        }, {
          index: 'D',
          content: '想办法转移这个孩子的注意力，给她一些其他的东西让她玩'
        }]
      }, {
        id: 3,
        type: 1, //类型，1.单选，2.多选
        question: "假设您是一个大学生，想在某门课程上得优秀，但是在其中考试时却只得了及格。这时候，您该怎么办呢?",
        answers: [{
          index: 'A',
          content: '制定一个详细的学习，并决心按计划进行'
        }, {
          index: 'B',
          content: '决心以后好好学'
        }, {
          index: 'C',
          content: '告诉自己在这门课上考不好没什么大不了的，把精力集中在其他可能考得好的课程上'
        }, {
          index: 'D',
          content: '去拜访任课教授，试图让他给您高一点的分数'
        }]
      }, {
        id: 4,
        type: 1, //类型，1.单选，2.多选
        question: "假设您是一个保险推销员，去访问一些有希望成为您的顾客的人。可是一连十五个人都只是对您敷衍，并不明确表态，您变得很失望。这时候，您会怎么做呢?",
        answers: [{
          index: 'A',
          content: '认为这只不过是一天的遭遇而已，希望明天会有好运气'
        }, {
          index: 'B',
          content: '考虑一下自己是否适合做推销员'
        }, {
          index: 'C',
          content: '在下一次拜访时再做努力，保持勤勤恳恳工作的状态'
        }, {
          index: 'D',
          content: '考虑去争取其他的顾客'
        }]
      }, {
        id: 5,
        type: 1, //类型，1.单选，2.多选
        question: "您是一个经理，提倡在公司中不要搞种族歧视。一天您偶然听到有人正在开有关种族歧视的玩笑。您会怎么办呢?",
        answers: [{
          index: 'A',
          content: '不理它--这只是一个玩笑而已'
        }, {
          index: 'B',
          content: '把那人叫到办公室去，严厉斥责他一顿'
        }, {
          index: 'C',
          content: '当场大声告诉他，这种玩笑是不恰当的，在您这里是不能容忍的'
        }, {
          index: 'D',
          content: '建议开玩笑的人去参加一个有关反对种族歧视的培训班'
        }]
      }, {
        id: 6,
        type: 1, //类型，1.单选，2.多选
        question: "您的朋友开车时别人的车突然危险地抢到你们前面，您的朋友勃然大怒，而您试图让他平静下来。您会怎么做呢?",
        answers: [{
          index: 'A',
          content: '告诉他忘掉它吧--现在没事了，这不是什么大不了的事'
        }, {
          index: 'B',
          content: '放一盘他喜欢听的磁带，转移他的注意力'
        }, {
          index: 'C',
          content: '一起责骂那个司机，表示自己站在他那一边'
        }, {
          index: 'D',
          content: '告诉他您也曾有同样的经历，当时您也一样气得发疯，可是后来您看到那个司机出了车祸，被送到医院急救室'
        }]
      }, {
        id: 7,
        type: 1, //类型，1.单选，2.多选
        question: "您和伴侣发生了争论，两人激烈地争吵;盛怒之下，互相进行人身攻击，虽然你们并不是真的想这样做。这时候，最好怎么办呢?",
        answers: [{
          index: 'A',
          content: '停止20分钟，然后继续争论'
        }, {
          index: 'B',
          content: '停止争吵……保持沉默，不管对方说什么'
        }, {
          index: 'C',
          content: '向对方说抱歉，并要求他(她)也向您道歉'
        }, {
          index: 'D',
          content: '先停一会儿，整理一下自己的想法，然后尽可能清楚地阐明自己的立场'
        }]
      }, {
        id: 8,
        type: 1, //类型，1.单选，2.多选
        question: "您被分到一个单位当领导，想提出一些解决工作中烦难问题的好方法。这时候，您第一件要做的是什么呢?",
        answers: [{
          index: 'A',
          content: '起草一个议事日程，以便充分利用和大家在一起讨论的时间。'
        }, {
          index: 'B',
          content: '给人们一定的时间相互了解'
        }, {
          index: 'C',
          content: '让每一个人说出如何解决问题的想法'
        }, {
          index: 'D',
          content: '采用一种创造性地发表意见的形式，鼓励每一个人说出此时进入他脑子里的任何想法，而不管该想法有多疯狂'
        }]
      }, {
        id: 9,
        type: 1, //类型，1.单选，2.多选
        question: "您3岁的儿子非常胆小，实际上，从他出生起就对陌生地方和陌生人有些神经过敏或者说有些恐惧。您该怎么办呢?",
        answers: [{
          index: 'A',
          content: '接受他具有害羞气质的事实，想办法让他避开他感到不安的环境'
        }, {
          index: 'B',
          content: '带他去看儿童精神科医生，寻求帮助'
        }, {
          index: 'C',
          content: '有目的地让他一下子接触许多人，带他到各种陌生的地方，克服他的恐惧心理'
        }, {
          index: 'D',
          content: '设计渐进的系列挑战性计划，每一个相对来说都是容易对付的，从而让他渐渐懂得他能够应付陌生的人和陌生的地方'
        }]
      }, {
        id: 10,
        type: 1, //类型，1.单选，2.多选
        question: "多年以来，您一起想重学一种您在儿时学过的乐器，而现在只是为了娱乐，您又开始学了。您想最有效的利用时间。您该怎么做呢?",
        answers: [{
          index: 'A',
          content: '每天坚持严格的练习'
        }, {
          index: 'B',
          content: '选择能稍微扩展能力的有针对性的曲子去练习'
        }, {
          index: 'C',
          content: '只有当自己有情绪的时候才去练习'
        }, {
          index: 'D',
          content: '选择远远超出您的能力但通过勤奋的努力能掌握的乐曲去练习'
        }]
      }]
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

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