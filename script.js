function rand(start, end) {
    let randArr = [];
    for (let i = start; i <= end; i++) {
        randArr.push(i);
    }
    return randArr[Math.floor(Math.random() * randArr.length)];
}

const player = {
    x: this.x,
    y: this.y,
    lastx: this.lastx,
    lasty: this.lasty,
    nodes: [],
    direction: '',
    instance: 1,
    score: 0
}

const apple = {
    x: this.x,
    y: this.y
}


var gameWindow = document.getElementById('map');
var playerSnake = document.createElement('div');
playerSnake.className = 'player';

var appleBoard = document.createElement('div');
appleBoard.className = 'apple'


gameWindow.appendChild(playerSnake)
gameWindow.appendChild(appleBoard)

var scoreBoard = document.getElementById('score');
updateScore();

function updateScore() {
    scoreBoard.innerText = `Score: ${player.score}`
}

function spawnPlayer() {
    playerSnake.style.gridRow = rand(1, 15);
    player.y = Number(playerSnake.style.gridRowStart);
    playerSnake.style.gridColumn = rand(1, 15);
    player.x = Number(playerSnake.style.gridColumnStart);
    createNode();
    createNode();
}

function spawnApple() {
    appleBoard.style.gridRow = rand(1, 15);
    apple.y = Number(appleBoard.style.gridRowStart);
    appleBoard.style.gridColumn = rand(1, 15);
    apple.x = Number(appleBoard.style.gridColumnStart);
    appleBoard.style.opacity = 1;
}

function createNode() {

    var node = {
        x: player.x,
        y: player.y
    }

    player.nodes.push(node)

    var nodeBoard = document.createElement('div');
    nodeBoard.className = 'node';
    nodeBoard.style.gridRow = node.x;
    nodeBoard.style.gridColumn = node.y;
    gameWindow.appendChild(nodeBoard);

}

function changeDirection(direction) {
    player.direction = direction;
} 

function movePlayer() {
    
    switch (player.direction) {
        case 'up':
            if (player.y != 1) {
                player.lasty = player.y
                player.lastx = player.x
                player.y--;
                break;
            } else {
                player.lasty = player.y
                player.y = 15;
                break;
            }
        case 'down':
            if (player.y != 15) {
                player.lasty = player.y
                player.lastx = player.x
                player.y++;
                break;
            } else {
                player.lasty = player.y
                player.y = 1;
                break;
            }
        case 'left':
            if (player.x != 1) {
                player.lastx = player.x
                player.lasty = player.y
                player.x--;
                break;
            } else {
                player.lastx = player.x
                player.x = 15;
                break;
            }
        case 'right':
            if (player.x != 15) {
                player.lastx = player.x
                player.lasty = player.y
                player.x++;
                break;
            } else {
                player.lastx = player.x
                player.x = 1;
                break;
            }
    }
}

function moveNodes() {

    if (player.nodes.length === 0) {
        return;
    }

    player.nodes[0].x = player.lastx;
    player.nodes[0].y = player.lasty;

    // switch (player.direction) {
    //     case 'up':
    //         player.nodes[0].lasty = player.nodes[0].y + 1;
    //         player.nodes[0].lastx = player.nodes[0].x;
    //         break;
    //     case 'down':
    //         player.nodes[0].lasty = player.nodes[0].y - 1;
    //         player.nodes[0].lastx = player.nodes[0].x;
    //         break;
    //     case 'left':
    //         player.nodes[0].lastx = player.nodes[0].x + 1;
    //         player.nodes[0].lasty = player.nodes[0].y;
    //         break;
    //     case 'right':
    //         player.nodes[0].lastx = player.nodes[0].x - 1;
    //         player.nodes[0].lasty = player.nodes[0].y;
    //         break;
    // }

    // for (let i=player.nodes.length - 2;i>=0;i--) {
    //     player.nodes[i].lastx = player.nodes[i + 1].x;
    //     player.nodes[i].lasty = player.nodes[i + 1].y;
    // }

    for (let i=player.nodes.length - 2; i>=0; i--) {
        player.nodes[i + 1].x = player.nodes[i].x;
        player.nodes[i + 1].y = player.nodes[i].y;
    }
}

function updatePlayer() {
    playerSnake.style.gridRow = player.y;
    playerSnake.style.gridColumn = player.x;
}

function updateNodes() {

    if (player.nodes.length === 0) {
        return;
    }

    let nodesBoard = document.getElementsByClassName('node');

    nodesBoard[0].style.gridRow = player.nodes[0].y;
    nodesBoard[0].style.gridColumn = player.nodes[0].x;

    for (let i=0;i<player.nodes.length;i++) {

        // if (i === 0) {
        //     nodesBoard[i].style.gridColumn = player.nodes[i].x;
        //     nodesBoard[i].style.gridRow = player.nodes[i].y;
        // }
        
        nodesBoard[i].style.gridColumn = player.nodes[i].x;
        nodesBoard[i].style.gridRow = player.nodes[i].y;

    }
}

document.onkeydown = function(e) {
    switch (e.key) {
        case 'w':
            if (player.direction != 'down') {
                changeDirection('up');
                break;
            } else {
                break;
            }
        case 's':
            if (player.direction != 'up') {
                changeDirection('down');
                break;
            } else {
                break;
            }
        case 'a':
            if (player.direction != 'right') {
                changeDirection('left');
                break;
            } else {
                break;
            }
        case 'd':
            if (player.direction != 'left') {
                changeDirection('right');
                break;
            } else {
                break;
            }
        case ' ':
            console.log(player.nodes)
            break;
    }
}

function detectCollision() {
    if (player.x === apple.x && player.y === apple.y) {
        createNode();
        spawnApple();
        player.score += 1;
        updateScore();
        return;
    }

    for (let i=2;i<player.nodes.length;i++) {
        if (player.x === player.nodes[i].x && player.y === player.nodes[i].y) {
            alert(`You Lose! You got a score of: ${player.score}`)
            location.reload();
            player.score = 0;
        }
    }

}

function main() {

    updatePlayer();
    detectCollision();
    movePlayer();
    moveNodes();
    updateNodes();
    setTimeout(main, 1000/10);
}

spawnPlayer();
spawnApple();

main();









