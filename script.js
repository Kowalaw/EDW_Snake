let canvas = document.getElementById('canvas')
let ctx = canvas.getContext("2d") 
let snake = [{x:150,y:150},{x:140,y:150},{x:130,y:150},{x:120,y:150} ]
let moveX = 10
let moveY = 0
let pomX = 0
let pomY = 0
let score = 0
let dirInterdi = false
let fin = false

function animation(){
    setTimeout(function(){
        if(fin){
            return
        } else{
            dirInterdi = false
            actualisationCanvas()
            spritePom()
            moveSnake()
            creeSnake()
            animation()
        }
    },100)
}

animation()
creeSnake()
creePom()

function actualisationCanvas(){
    ctx.fillStyle = "#66AAFF" 
    ctx.fillRect(0,0,canvas.width,canvas.height)
    ctx.strokeStyle = "#000000"
    ctx.strokeRect(0,0,canvas.width,canvas.height)
}

function creeElementDuSnake(elementDuSnake){
    ctx.fillStyle = "#009900" 
    ctx.strokeStyle = "#000000"
    ctx.fillRect(elementDuSnake.x,elementDuSnake.y,10,10)
    ctx.strokeRect(elementDuSnake.x,elementDuSnake.y,10,10)
}
function creeSnake(){
    snake.forEach(elementDuSnake=>{
        creeElementDuSnake(elementDuSnake)
    })
}
function moveSnake(){
    const move = {x:snake[0].x+moveX, y:snake[0].y+moveY}
    snake.unshift(move)
    if(gameOver()){
        restart()
        snake.shift(move)
        fin = true
        return
    }
    const snakeMangePom = snake[0].x === pomX && snake[0].y === pomY
    if(snakeMangePom){
        creePom()
        score ++
        document.getElementById("score").innerHTML = score
    } else{
        snake.pop()
    }
}

document.addEventListener('keydown', dirSnake)

function dirSnake(event){
    if(dirInterdi){return}
    dirInterdi=true

    const up = 90
    const left = 81
    const down =  83
    const right = 68

    const dirSnake = event.keyCode

    const dirU = moveY=== -10
    const dirL = moveX=== -10
    const dirD = moveY=== 10
    const dirR = moveX=== 10

    if(dirSnake === up && !dirD){
        moveY = -10
        moveX = 0
    }
    if(dirSnake === left && !dirR) {
        moveY = 0
        moveX = -10
    }
    if(dirSnake===down && !dirU) {
        moveY = 10
        moveX = 0
    }
    if(dirSnake===right&&!dirL){
        moveY = 0
        moveX = 10
    }
}

function positionPom(){
    return Math.round(Math.random()*(canvas.width-10)/10)*10
}
function creePom(){
    pomX = positionPom()
    pomY = positionPom()

    snake.forEach(function(partDeSnake){
        const pomSurSnake = partDeSnake.x == pomX && partDeSnake.y == pomY
        if(pomSurSnake){
            creePom()
        }
    })
}
function spritePom(){
    ctx.fillStyle = '#FF0000'
    ctx.strokeStyle = "#000000"
    ctx.beginPath()
    ctx.arc(pomX+5,pomY+5,5,0,2*Math.PI)
    ctx.fill()
    ctx.stroke()
}

function gameOver(){
    let corpDeSnake = snake.slice(1,-1)
    let mortLaQueue = false
    corpDeSnake.forEach(corp=>{
        if(snake[0].x === corp.x &&snake[0].y===corp.y){
            mortLaQueue = true
        }
    })
    const murG = snake[0].x < -1
    const murH = snake[0].y < -1
    const murD = snake[0].x > canvas.width-10
    const murB = snake[0].y > canvas.width-10
    let gameOver = false
    if(mortLaQueue||murG||murH||murD||murB){
        gameOver=true
    }
    return gameOver
}
function restart(){
    const restart = document.getElementById('prestart')
    restart.style.display = "block"

    document.addEventListener("keydown",(event)=>{
        if(event.keyCode===32){
            document.location.reload(true)
        }
    })
}