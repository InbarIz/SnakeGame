import {update as updateSnake, draw as drawSnake, SNAKE_SPEED, snakeSize, snakeIntersection, getSnakeHead} from './snake.js'
import {update as updateFood, draw as drawFood} from './food.js'
import {outsideGridBoundries} from './grid.js'

const gameBoard = document.getElementById('game-board')
let lastRenderTime = 0
let gameOver = false
let score = 0
localStorage.setItem('highscores', JSON.stringify([]))

// setting the game-loop
function main(currentTime){
    if(gameOver){
        // const highScores = JSON.parse(localStorage.getItem('highScores')) || []
        let s = snakeSize() - 1
        // highScores.push(s)
        // highScores.sort((a,b)=>{
        //     return a-b
        // })
        return alert(`You Lose!\n\nYour score is ${s}`)
    }
    window.requestAnimationFrame(main)
    // makes sure we render just as much as we need (depends on the snake's speed)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000  //conversions from miliseconds to seconds
    if (secondsSinceLastRender < 1 /SNAKE_SPEED) return 
    // window.requestAnimationFrame(main)  // allows the browser to notify when the next frame can be rendered
    lastRenderTime = currentTime
    console.log('Render')

    update()        // updates the new position of the snake, new length etc..
    draw()          // rendering the new updates on the screen
}
// calling to start the loop
window.requestAnimationFrame(main)

function update(){
    let _score = updateSnake()
    console.log(_score)
    updateFood()
    checkDeath()
    score += _score
}

function draw(){
    gameBoard.innerHTML = ''     // clear the old pices (before snake's movement)
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath(){
    gameOver = outsideGridBoundries(getSnakeHead()) || snakeIntersection()
}
