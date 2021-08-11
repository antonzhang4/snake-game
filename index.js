const grid = document.querySelector('.grid') 
const scoreDisplay = document.getElementById("score")
const button = document.getElementById("reset-btn")

let currentSnake = [2,1,0]
let squares = []
let direction = 1

let score = 0
let appleIndex = 0

function createGrid() {
    for(let i=0; i<100; i++) {
        const square = document.createElement('div')
        square.classList.add('square')
        grid.appendChild(square)
        squares.push(square)
    }
}

createGrid()
generateApple()

currentSnake.forEach(index => squares[index].classList.add('snake'))

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
    }

    currentSnake.unshift(currentSnake[0] + direction)
    squares[currentSnake[0]].classList.add('snake')
}

let timerId = setInterval(move, 300)

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
/*steps to finish this game:
1. function for restarting game
*/

function generateApple() {
    do {
        appleIndex = Math.floor(Math.random() * squares.length)
    } while (squares[appleIndex].classList.contains('snake'))
    squares[appleIndex].classList.add('apple')
} 

document.addEventListener("keyup", control)
