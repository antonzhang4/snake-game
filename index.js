const grid = document.querySelector('.grid') 
const scoreDisplay = document.getElementById("score")
const button = document.getElementById("reset-btn")

let squares = []
let currentSnake = [2,1,0]
let direction = 1
let appleIndex = 0
let score = 0
let intervalTime = 1000
let speed = 0.9
let timerId = 0

function createGrid() {
    for(let i=0; i<100; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}

createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'))

function startGame() {
    //remove the snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    //remove the apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)
    currentSnake = [2,1,0]
    score = 0
    //re add new score to browser
    scoreDisplay.textContent = "Score: " + score
    direction = 1
    intervalTime = 1000
    generateApple()
    //readd the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}

function move() {
    if((currentSnake[0] % 10 === 0 && direction === -1) ||
    (currentSnake[0] % 10 === 9 && direction === 1) ||
    (currentSnake[0] - 10 < 0 && direction === -10) ||
    (currentSnake[0] + 10 > 99 && direction === 10) ||
    (squares[currentSnake[0] + direction].classList.contains('snake'))) {
        return clearInterval(timerId)
    }

    let tail = currentSnake.pop()
    squares[tail].classList.remove('snake')

    if(squares[currentSnake[0] + direction].classList.contains('apple')) {
        squares[appleIndex].classList.remove('apple')
        currentSnake.push(tail)
        squares[tail].classList.add('snake')
        score += 10
        scoreDisplay.textContent = "Score: " + score
        generateApple()
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move, intervalTime)
    }

    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add('snake')
}

function control(e) {
    if(e.key === 'ArrowDown' && direction != -10) {
        direction = 10
    }
    if(e.key === 'ArrowUp' && direction != 10) {
        direction = -10
    }
    if(e.key === 'ArrowLeft' && direction != 1) {
        direction = -1
    }
    if(e.key === 'ArrowRight' && direction != -1) {
        direction = 1
    }
}

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 

document.addEventListener("keyup", control)
button.addEventListener('click', startGame)