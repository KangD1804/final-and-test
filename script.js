document.addEventListener("DOMContentLoaded", () => { //LOAD HTML BEFORE JS FILES
    const grid = document.querySelector(".grid");
    const doodler = document.createElement("div");
    let doodlerLeftSpace = 50;
    let startPoint = 250;
    let doodlerBottomSpace = startPoint;
    let isGameOver = false;
    let platformCount = 5;
    let platforms = [];
    let upTimerId;
    let downTimerId;
    let leftTimerId;
    let rightTimerId;
    let isJumping = true;
    let isGoingLeft = false;
    let isGoingRight = false;
    let score = 0;

    function createDoodler() {
        grid.appendChild(doodler);
        doodler.classList.add("doodler");
        doodlerLeftSpace = platforms[0].left;
        doodler.style.left= doodlerLeftSpace + 'px';
        doodler.style.bottom= doodlerBottomSpace + 'px';
    }

    class Platform {
        constructor(newPlatformBottom) {
            this.bottom = newPlatformBottom;
            this.left = Math.random()*(400-85);
            this.visual = document.createElement('div');

            const visual = this.visual;
            visual.classList.add("platform");
            visual.style.left = this.left + 'px';
            visual.style.bottom = this.bottom + 'px';
            grid.appendChild(visual);
        }
    }

    function createPlatforms(){
        for(let i = 0; i < platformCount; i++){
            let platformGap = 600/platformCount; //game height = 600px
            let newPlatformBottom = 100 + i*platformGap // increase platform gap
            let newPlatform = new Platform(newPlatformBottom)
            platforms.push(newPlatform);
        }
    }

    function movePlatform(){
        if(doodlerBottomSpace > 200){
            platforms.forEach(platform => {
                platform.bottom -= 4;
                let visual = platform.visual;
                visual.style.bottom = platform.bottom + 'px';

            if(platform.bottom < 10){
                let firstPlatform = platforms[0].visual;
                firstPlatform.classList.remove('platform');
                platforms.shift();
                score++;
                var newPlatform = new Platform(600);
                platforms.push(newPlatform);
            }
            })
        }
    }

    function jump(){
        clearInterval(downTimerId);
        isJumping = true;
        upTimerId = setInterval(function (){
            doodlerBottomSpace += 20;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if(doodlerBottomSpace > startPoint + 200){
                fall();
            }
        }, 30)
    }

    function fall(){
        clearInterval(upTimerId);
        isJumping = false;
        downTimerId  = setInterval(function (){
            doodlerBottomSpace -= 5;
            doodler.style.bottom = doodlerBottomSpace + 'px';
            if(doodlerBottomSpace <= 0){
                gameOver()
            }
            platforms.forEach(platform => {
                if ( //condition for collision btw doodler and platform
                    (doodlerBottomSpace >= platform.bottom) &&
                    (doodlerBottomSpace <= platform.bottom + 15 )&& //platform height
                    ((doodlerLeftSpace + 60) >= platform.left) && // doodler width
                    (doodlerLeftSpace <= (platform.left + 85)) && // platform width
                    !isJumping
                ){
                    startPoint = doodlerBottomSpace
                    jump()
                }
            })
        }, 30)
    }

    function gameOver(){
        alert('Game over. Your score: ' +score);
        isGameOver = true;
        while (grid.firstChild) {
            grid.removeChild(grid.firstChild)
        }
        clearInterval(upTimerId);
        clearInterval(downTimerId);
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
    }

    function moveLeft(){
        if(isGoingRight){
            clearInterval(rightTimerId);
            isGoingRight = false;
        }
        isGoingLeft = true;
        leftTimerId = setInterval(function (){
            if(doodlerLeftSpace >= 0){
                doodlerLeftSpace -= 5;
                doodler.style.left = doodlerLeftSpace + 'px'
            } else moveRight();
        },30)
    }

    function moveRight(){
        if(isGoingLeft){
            clearInterval(leftTimerId);
            isGoingLeft = false;
        }
        isGoingRight = true;
        leftTimerId = setInterval(function (){
            if(doodlerLeftSpace <= 340){ // grid width - doodler width
                doodlerLeftSpace += 5;
                doodler.style.left = doodlerLeftSpace + 'px'
            } else moveLeft();
        },30)
    }

    function moveStraight(){
        isGoingRight = false;
        isGoingLeft = false;
        clearInterval(leftTimerId);
        clearInterval(rightTimerId);
    }

    function control(){
        if(event.key ==="ArrowLeft"){
            moveLeft();
        } else if(event.key === "ArrowRight"){
            moveRight();
        } else if(event.key === "ArrowUp"){
            moveStraight()
        }
    }

    function start(){
        if(!isGameOver){
            createPlatforms();
            createDoodler();
            setInterval(movePlatform, 30) // setInterval(ten ham, thoi gian thay doi(ms));
            jump();
            document.addEventListener('keyup', control)
        }
    }

    start();
})