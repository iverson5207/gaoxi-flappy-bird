//利用对象收编变量
//动画 animate 管理所有动画函数
var bird = {
  skyPosition:0,
  skyStep:2,  //天空移动的速度
  birdTop:290,
  birdStepY:0,  //控制下落的速度
  startColor:'blue',
  startFlag : false,
  minTop:0,
  maxTop:700,
  // timer:0,
  // 初始化函数init
  init:function(){
    this.initData();
    this.animate();
    this.handle();
  },
  initData: function(){
    this.el = document.getElementById('game');
    this.oBird = this.el.getElementsByClassName('bird')[0];  //使用父元素来找防止命名重复
    // console.log(el);
    this.oStart = this.el.getElementsByClassName('start')[0];
    this.oScore = this.el.getElementsByClassName('score')[0];
    this.oMask =  this.el.getElementsByClassName('mask')[0];
    this.oEnd =  this.el.getElementsByClassName('end')[0];
  },
  animate:function(){
    //this == bird
    //由于如果给背景小鸟或者文字都分别添加上定时器的话
    //会造成页面开启了多个定时器,造成页面卡顿,因此可以使用一个定时器调用多个动作 
    var self = this;
    var count = 0;
    // var timer;
    // timer =  
    this.timer = setInterval(function(){
      self.skyMove();
      if(self.startFlag){
        self.birdDrop();
      }
      count ++;
      if(count % 10 === 0){
        if(!self.startFlag){
          self.birdJump();
          self.startBound();
        }
        self.birdFly(count);
      }
    },30)
    // this.startBound();
  },
  // 天空移动
  skyMove:function(){
    //定时器实现
    //this === bird
     var self = this; 
    //  setInterval(function(){
       //this == window
      self.skyPosition -= self.skyStep;
      self.el.style.backgroundPositionX = self.skyPosition + 'px';
    //  },30)
  },
  //小鸟蹦动画
  birdJump:function(){
    var self = this;
    // setInterval(function(){
      self.birdTop = self.birdTop === 290 ? 220 :290;
      self.oBird.style.top = self.birdTop + 'px'; 
    // },300)
  },
  // 小鸟飞
  // 移动图片的positionX可以实现视觉上的小鸟在飞
  birdFly:function(count){
    this.oBird.style.backgroundPositionX = count % 3 * - 30 + 'px';
  },
  birdDrop:function(){
    // var birdStepY = this.birdStepY ++;
    this.birdTop += ++this.birdStepY;
    this.oBird.style.top = this.birdTop + 'px';
    // 下落时碰撞检测
    this.judgeKnock();
  },
  judgeKnock:function(){
    this.judgeBoundary();
    this.judgePipe();
  },
  // 上下边界碰撞检测
  judgeBoundary:function(){
    if(this.birdTop < this.minTop || this.birdTop >this.maxTop){
      this.failGame();
    }
  },
  // 柱子碰撞检测
  judgePipe:function(){},
  // 文字切换
  startBound:function(){
    // var color;
    // if(this,startColor === 'blue'){
    //   color = 'white';
    // }else{
    //   color = 'bule';
    // }
    // classList.remove('start-' + this.startColor);
    // classList.add('start-' + color);
    // this.startColor = color;
    var prevColor = this.startColor;
    this.startColor = prevColor === 'blue' ? 'white' : 'blue';
    this.oStart.classList.remove('start-' + prevColor);
    this.oStart.classList.add('start-' + this.startColor);
  },
  handle:function(){
    this.handleStart();
  },
  handleStart:function(){
    var self = this;
    this.oStart.onclick = function(){
      // console.log('XXX');
      self.startFlag = true;
      self.oBird.style.left = 80 + 'px';
      self.oStart.style.display = 'none';
      self.oScore.style.display = 'block';
      self.skyStep = 5;
    }
  },
  failGame:function(){
    clearInterval(this.timer);
    this.oMask.style.display = 'block';
    this.oEnd.style.display = 'block';
    this.oBird.style.display = 'none';
    this.oScore.style.display = 'none';
  }
}
// bird.init();