// 设置画布

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// 生成随机数的函数

function random(min,max) {
  const num = Math.floor(Math.random() * (max - min)) + min;
  return num;
};

// 生成随机颜色值的函数

function randomColor() {
  const color = 'rgb(' +
                random(0, 255) + ',' +
                random(0, 255) + ',' +
                random(0, 255) + ')';
  return color;
};

// 定义 Shape 构造器
class Shape {
  x;
  y;
  velX;
  velY;
  exists;

  constructor(x, y, velX, velY, exists){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
  }

};


//定义Ball构造器
class Ball extends Shape{
  color;
  size;
  constructor(x, y, velX, velY, exists, color, size){
    super(x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
  }

  prototype = {
    draw(){},
    updata(){},
    collisionDetect(){}
  }
};

//定义恶魔圈
class EvilCircle{
  x;
  y;
  velX;
  velY;
  exists;
  color = "white";
  size = 30;
  constructor(x, y, velX, velY, exists){
    //==Shape.call(this, x, y, 20, 20, exists);==用不来call
    //super(x, y, velX, velY, exists);
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
  }
  prototype = {
    draw(){},
    checkBounds(){},
    collisionDetect(){},
    setControls(){}
  }

};

// 定义彩球绘制函数

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
};

// 定义恶魔圈绘制函数
EvilCircle.prototype.draw = function() {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.strokeStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.stroke();
};

// 定义恶魔圈位置
EvilCircle.prototype.checkBounds = function() {
  if((this.x + this.size) >= width) {
    this.x = this.x - this.size;
  }

  if((this.x - this.size) <= 0) {
    this.x = this.x + this.size;
  }

  if((this.y + this.size) >= height) {
    this.y = this.y - this.size;
  }

  if((this.y - this.size) <= 0) {
    this.y = this.y + this.size;
  }

};

//定义恶魔圈控制方式
EvilCircle.prototype.setControls = function() {
  window.onkeydown = (e) => {
    switch (e.key) {
      case "a":
        this.x -= this.velX;
        break;
      case "d":
        this.x += this.velX;
        break;
      case "w":
        this.y -= this.velY;
        break;
      case "s":
        this.y += this.velY;
        break;
    }
  };
};

//定义恶魔圈碰撞方式
EvilCircle.prototype.collisionDetect = function(){
  for(let j = 0; j < balls.length; j++) {
    if(balls[j].exists === true) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].exists = false;
      }
    }
  }
};


// 定义彩球更新函数

Ball.prototype.update = function() {
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// 定义碰撞检测函数

Ball.prototype.collisionDetect = function() {
  for(let j = 0; j < balls.length; j++) {
    if(this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = randomColor();
      }
    }
  }
};

// 定义一个数组，生成并保存所有的球

let balls = [];

while(balls.length < 25) {
  const size = random(10,20);
  let ball = new Ball(
    // 为避免绘制错误，球至少离画布边缘球本身一倍宽度的距离
    random(0 + size, width - size),
    random(0 + size, height - size),
    random(-7, 7),
    random(-7, 7),
    true,
    randomColor(),
    size
  );
  balls.push(ball);
}

// 创建一个恶魔圈的实例--色彩恶魔
const size2 = 10;
colorEvil = new EvilCircle(
  random(0 + size2, width - size2),
  random(0 + size2, height - size2),
  20,
  20,
  true
);

colorEvil.setControls();

// 定义一个循环来不停地播放

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)';
  ctx.fillRect(0,0,width,height);

  for(let i = 0; i < balls.length; i++) {
    if(balls[i].exists === true)
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  colorEvil.draw();
  colorEvil.checkBounds();
  colorEvil.collisionDetect();

  requestAnimationFrame(loop);
}

loop();