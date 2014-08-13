var canvas = document.getElementById('c');
var ctx    = canvas.getContext('2d');

width = window.innerWidth;
height = window.innerHeight;

side = Math.min(width, height) / 8;

canvas.width  = width;
canvas.height = height;

var Box = function(x,y,leftSide,topSide,rightSide,endSide){
  _.bindAll(this,'move','remove');
  this.leftSide = leftSide;
  this.topSide = topSide;
  this.rightSide = rightSide;
  this.endSide = endSide;

  this.x = this.rightX = this.originX = x;
  this.y = this.originY = y;

  this.rightY = this.y+this.leftSide;
  this.leftY = this.y+this.leftSide;

  this.pointLeft = [];
  this.pointLeft[0] = {x:this.x,y:this.y};
  this.pointLeft[1] = {x:this.x,y:this.y+this.leftSide};

  this.move();
}

Object.defineProperty(Box.prototype, 'rightX', {
  get:function(){
    return this._rightX;
  },
  set:function(val){
    this._rightX = val;

    this.pointRight = [];
    this.pointRight[0] = {x:this._rightX, y:this.y};
    this.pointRight[1] = {x:this._rightX, y:this.rightY}
  }
})

Object.defineProperty(Box.prototype, 'rightY', {
  get:function(){
    return this._rightY;
  },
  set:function(val){
    this._rightY = val;

    this.pointRight = [];
    this.pointRight[0] = {x:this.rightX,y:this.y};
    this.pointRight[1] = {x:this.rightX,y:this._rightY}
  }
})

Object.defineProperty(Box.prototype, 'x', {
  get:function(){
    return this._x;
  },
  set:function(val){
    this._x = val;

    this.pointLeft = [];
    this.pointLeft[0] = {x:this._x,y:this.y};
    this.pointLeft[1] = {x:this._x,y:this.leftY}
  }
})

Object.defineProperty(Box.prototype, 'leftY', {
  get:function(){
    return this._leftY;
  },
  set:function(val){
    this._leftY = val;

    this.pointLeft = [];
    this.pointLeft[0] = {x:this.x,y:this.y};
    this.pointLeft[1] = {x:this.x,y:this._leftY}
  }
})


Box.prototype.move = function(){
  TweenLite.to(this,1,{rightX:this.rightX+this.topSide,onComplete:this.remove});
  TweenLite.to(this,1,{rightY:this.rightY-(this.leftSide-this.rightSide),onComplete:this.remove});
}

Box.prototype.remove=function(){
  this.aa = this.rightSide+this.endSide*(this.leftSide-this.rightSide)/this.topSide;
  TweenLite.to(this,0.5,{x:this.x+(this.topSide-this.endSide)});
  TweenLite.to(this,0.5,{leftY:this.y+this.aa});
}

Box.prototype.update = function(){
  ctx.beginPath();
  ctx.fillStyle = '#fff';
  ctx.moveTo(this.pointLeft[0].x,this.pointLeft[0].y);
  ctx.lineTo(this.pointRight[0].x,this.pointRight[0].y);
  ctx.lineTo(this.pointRight[1].x,this.pointRight[1].y);
  ctx.lineTo(this.pointLeft[1].x,this.pointLeft[1].y);
  ctx.closePath();
  ctx.fill();
}

var box = new Box(100,100,200,100,100,20);
loop();
function loop(){
  ctx.fillStyle = '#333';
  ctx.fillRect(0, 0, width, height);
  box.update();
  requestAnimationFrame(loop);
}

