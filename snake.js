import { getInputDirection } from "./input.js"
export const SNAKE_SPEED = 5 // how many times the snake moves per second
let snakeBody = [{x:11, y:11}]
let newSegments = 0

export function update(){
    console.log("update snake")
    addSegments()
    const newDirection = getInputDirection()
    for (let i= snakeBody.length - 2; i>=0; i--){ //since last link in the body now will not belong to the snake
        snakeBody[i+1] = { ...snakeBody[i]}  //... creates a duplicate of the link
    }
    snakeBody[0].x += newDirection.x
    snakeBody[0].y += newDirection.y     // y+=1 => going down
}

export function draw(gameBoard){
    console.log("draw snake")
    snakeBody.forEach(segment =>{
        const snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = segment.y
        snakeElement.style.gridColumnStart = segment.x
        snakeElement.classList.add('snake')
        gameBoard.appendChild(snakeElement)
    })

}

export function expandSnake(amount){
    newSegments += amount
    
}

export function onSnake(position, {ignoreHead = false} = {}){
    return snakeBody.some((segment,index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
}

export function equalPositions(pos1,pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addSegments(){
    for(let i=0; i<newSegments; i++){
        snakeBody.push({ ...snakeBody[snakeBody.length -1]})
    }
    newSegments = 0
}

export function getSnakeHead(){
    return snakeBody[0]
}

export function snakeIntersection(){
    return onSnake(snakeBody[0], {ignoreHead: true})
}

export function snakeSize() {
    return snakeBody.length
}
