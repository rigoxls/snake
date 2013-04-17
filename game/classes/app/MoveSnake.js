if(typeof(Snake)=="undefined"){var Snake = {} };

Snake.MoveSnake = function(config){
    
    var me = this;
    this.posX = 0;
    this.posY = 20;
    this.sourceX = 0;
    this.sourceY = 0;
    this.ctx = this.ctx;
    this.aFrames = [1,2,3,4,5,6,7,8,9];
    this.iFrame = 1;
    
    this.direction = "right";
    me.moving = false;
    
    this.snakeObj = [];
    this.snakeObj[0] = {x : 120, y : 20};
    this.snakeObj[1] = {x : 90, y : 20};
    this.snakeObj[2] = {x : 60, y : 20};
    this.snakeObj[3] = {x : 30, y : 20};
    this.snakeObj[4] = {x : 0, y : 20};
    
    this.BCS = 31;// Bounds frame snake 
    this.speedLevel = 400;

    this.init = function(config){
        me.ctx = config.ctx;
        me.mS = new Image(); //main sprite
        me.mS.src = IMAGES_PATH + "sprites/MainSprite.png";   
        this.start();
    }
    
    this.start = function(){
            //Interval to move snake
            setInterval(function(){
               me.movingSnake(true);
            },me.speedLevel);
            
            //interval to change sprite in snake
            setInterval(function(){ 
                me.spriteEngine();
            },200);             
    }
    
    this.movingSnake = function(auto){
        
        if(me.moving && auto){
             me.moving = false;
            return;
        } 
       
        me.ctx.clearRect (  0, 0, 800, 500 );
        
        for(var c = 0; c < me.snakeObj.length; c++){
                
            if(c > 0){
                //temp position, follow children
                var tmpPosX = me.snakeObj[c]['x'];
                var tmpPosY = me.snakeObj[c]['y'];
                
                me.snakeObj[c]['x'] = me.posX;
                me.snakeObj[c]['y'] = me.posY;
                
                me.posX = tmpPosX;
                me.posY = tmpPosY;                   
            }else{
                me.posX = me.snakeObj[c]['x'];
                me.posY = me.snakeObj[c]['y'];                
                
                switch(me.direction){
                    case 'left'  : me.snakeObj[c]['x'] = me.snakeObj[c]['x'] - me.BCS;
                        break;

                    case 'down'  : me.snakeObj[c]['y'] = me.snakeObj[c]['y'] + me.BCS;
                        break;

                    case 'right' : me.snakeObj[c]['x'] = me.snakeObj[c]['x'] + me.BCS;
                        break;

                    case 'up'    : me.snakeObj[c]['y'] = me.snakeObj[c]['y'] - me.BCS;
                        break;                        
                }
            }
            me.ctx.drawImage(me.mS,me.sourceX,0,+ me.BCS,+ me.BCS,me.snakeObj[c].x,me.snakeObj[c].y,+ me.BCS,+ me.BCS);
        }
    }
    
    this.moveLeft = function(){
        me.direction = 'left';
        this.goMove();
    }
    
    this.moveDown = function(){
        me.direction = 'down';
        this.goMove();
    }

    this.moveRight = function(){
        me.direction = 'right';
        this.goMove();
    }
    
    this.moveUp = function(){
        me.direction = 'up';
        this.goMove();
    }
    
    this.goMove = function(){
        me.moving = true;
        me.movingSnake(false);       
    }
    
    this.spriteEngine = function(){
        me.ctx.clearRect (  0, 0, 800, 500 );
        me.sourceX = Math.floor(me.aFrames[me.iFrame] % 9) * 30;
        me.sourceY = 0;
        
        for(var c = 0; c < me.snakeObj.length; c++){
            me.ctx.drawImage(me.mS,me.sourceX,0,+ me.BCS,+ me.BCS,me.snakeObj[c].x,me.snakeObj[c].y,+ me.BCS,+ me.BCS);
        }
        me.iFrame++;
        if(me.iFrame == me.aFrames.length) me.iFrame=1;          
    }
    
    this.init(config);
}