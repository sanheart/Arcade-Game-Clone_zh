// 这是我们的玩家要躲避的敌人 
var Enemy = function() {
    // 要应用到每个敌人的实例的变量写在这里
    this.x = -50;
    this.y = Math.random() * 400;
    this.speed = Math.random() * 100 + 50;
    // 我们已经提供了一个来帮助你实现更多

    // 敌人的图片，用一个我们提供的工具函数来轻松的加载文件
    this.sprite = 'images/enemy-bug.png';
};

// 此为游戏必须的函数，用来更新敌人的位置
// 参数: dt ，表示时间间隙
Enemy.prototype.update = function(dt, x) {
    // 你应该给每一次的移动都乘以 dt 参数，以此来保证游戏在所有的电脑上
    // 都是以同样的速度运行的
    this.x += this.speed * dt;
    //敌人的X坐标超过，则重新出现
    if(this.x > 500){
        this.x = -50;
        this.y = Math.random() * 400;
    }
};

// 此为游戏必须的函数，用来在屏幕上画出敌人，
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// 现在实现你自己的玩家类
var Player = function() {
    this.x = 200;
    this.y = 430;
    //宽70 高78
    this.sprite = "images/char-boy.png"
    this.isCrash = false;
};
//碰撞函数
Player.prototype.checkCollision = function() {
	for(var i = 0; i<allEnemies.length; i++){
   		if (Math.abs(this.y-allEnemies[i].y )<40) {
   			if (Math.abs(this.x- allEnemies[i].x)<50) {//参照论坛，玩家与虫子的距离小于一定值得时候提示游戏失败，并复位玩家位置
    	    	this.isCrash = true;
    	    	this.y = 400;
    	    	this.x = 200;
     		}
    	}
 	}
};
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
Player.prototype.update = function() {
    this.checkCollision();
    if(this.y < -14 && this.isCrash == false){
    	alert("you win!");
    	this.y = 400;
    	this.x = 200;
    }

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(allowedKeys) {
    switch(allowedKeys){
        case "left":
        	if( this.x > 0){
        		this.x -= 101;
        	}
            break;
        case "up":
        	if( this.y > 4){
        		this.y -= 83;
        	}
            break;
        case "right":
        	if( this.x < 402){
            	this.x += 101;
        	}
            break;
        case "down":
        	if(this.y < 400){
                this.y += 83;
        	}
            break;
    }
};
// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
var allEnemies = [];

for (var i = 0; i < 6; i++) { 
    var bugs = new Enemy();
    allEnemies.push(bugs); 
};
// 把玩家对象放进一个叫 player 的变量里面
var player = new Player();

// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
