let canvas = document.getElementById('canvas')
let ctx = canvas.getContext("2d") 

//Style pour définir Rect pour apliqué(position,x,y, taille,hauteur,largeur)
ctx.fillStyle = "#00AAFF" 
ctx.fillRect(0,0,canvas.width,canvas.height)
ctx.strokeStyle = "#000000"
ctx.strokeRect(0,0,canvas.width,canvas.height)

let snake = [{x:250,y:250},{x:240,y:250},{x:230,y:250},{x:220,y:250} ]
let vitesseSnake = 10

function creeElementDuSnake(elementDuSnake){
    ctx.fillStyle = "#00FFAA" 
    ctx.strokeStyle = "#000000"
    ctx.fillRect(elementDuSnake.x,elementDuSnake.y,10,10)
    ctx.strokeRect(elementDuSnake.x,elementDuSnake.y,10,10)
}
function creeSnake(){
    snake.forEach(elementDuSnake=>{
        creeElementDuSnake(elementDuSnake)
    })
}
function movX(){
    const move = {x:snake[0].x+vitesseSnake, y:snake[0].y}
    snake.unshift(move)
    snake.pop()
}
function movY(){
    const move = {x:snake[0].x, y:snake[0].y-vitesseSnake}
    snake.unshift(move)
    snake.pop()
}

movX()
movY()
creeSnake()