if(typeof(Snake)=="undefined"){var Snake = {} };

Snake.FoodBehavior = function(config){
    
    var me = this;
    var BWB = 625; //width board
    var BHB = 525; //height board
    var LWB = 160; //minor limit in x
    var LHB = 115; //minor limit in y
    
    var posBX = 400;
    this.posX = 0;
    this.posY = 0;
    this.xScore = 20;
    
    this.score = 0000000;
    
    this.init = function(){
        me.ctx = config.ctx;
        me.main = config.main;
        me.mS = new Image(); //main sprite
        me.mS.src = IMAGES_PATH + "sprites/MainSprite.png";   
        me.start();
    }
    this.start = function(){
        //Interval to move snake
        setInterval(function(){
           if(!me.main.paused){
               me.animateFood(true);
           }
        },300);
        
        this.generateRandomFood();
    }
    
    this.generateRandomFood = function(){
        me.posX = Math.floor(Math.random() * (BWB - LWB)) + LWB; //max value - min value + min value
        me.posY = Math.floor(Math.random() * (BHB - LHB)) + LHB; //
        
        //little fix to set the food in the right side
        me.posX = (me.posX - (me.posX % 25)) + 10;
        me.posY = (me.posY - (me.posY % 25) + 25) - 10;
    }
    
    this.animateFood = function(auto){
        me.ctx.clearRect (  me.posX, me.posY, 25, 25 );
        
        posBX = posBX+ 32;
        if(posBX > 490) posBX = 400;
        me.ctx.drawImage(me.mS, posBX, 0, 30, 30, me.posX, me.posY , 25, 25);
    }
    
    this.updateScore = function(){
         console.info(me.xScore);
        me.score = (me.score) + (50 * me.xScore);
        var showScore = String(me.score);
        var cntScore = showScore.length;
        var loopZeros = 7 - cntScore;
        
        for(var k=0; k<loopZeros; k++) 
            showScore = "0" + showScore;
        
        me.ctx.fillStyle = '#FFF';
        me.ctx.font = 'italic bold 30px Lemon';
        me.ctx.clearRect(550, 40, 300,40);
        me.ctx.fillText(showScore, 590, 65); 
        
        me.xScore = 20;
    }
    
    this.resetScore = function(){
        me.score = 0;
        me.ctx.fillStyle = '#FFF';
        me.ctx.font = 'italic bold 30px Lemon';
        me.ctx.clearRect(550, 40, 300,40);
        me.ctx.fillText("0000000", 590, 65); 
        
    }
    
    this.init();
}