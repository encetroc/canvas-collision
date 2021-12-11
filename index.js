/* const container = document.querySelector('.container')

let listItems1 = [
  {id: '1', label: 'todo item 1'}, 
  {id: '2',label: 'none'}, 
  {id: '3',label: 'todo item 2'}, 
  {id: '4',label: 'todo item 3'}, 
  {id: '5',label: 'none'}, 
]

const listItems2 = [
  {id: '1', label: 'todo item 11'}, 
  {id: '2',label: 'none'}, 
  {id: '3',label: 'todo item 21'}, 
  {id: '4',label: 'todo item 31'}, 
  {id: '5',label: 'none'}, 
]

listItems1.push({id: '6', label: 'this is a new item'})
listItems1.shift()
listItems1.unshift({id: '7', label: 'element at the start of my array'})

listItems2.splice(2, 1, {id: '8', label: 'this is a substitute item'})

listItems1 = listItems1.map(item => {
  return {
    id: item.id,
    label: `${item.label}, id:${item.id}`
  }
})

listItems1 = listItems1.filter(item => {
  return item.id % 2
})

createLi(listItems1)
createLi(listItems2)

function createLi(items) {
  const list = document.createElement('ul')
  container.appendChild(list)
  for (let i=0; i<items.length; i++) {
    if (!items[i].label.includes('none')) {
      const listItem = document.createElement('li')
      listItem.innerHTML = items[i].label
      list.appendChild(listItem)
    }
  }
} */

const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

let gameWon = false;
let score = 0;

class Object2D {
  constructor(argX, argY, argW, argH, argColor, argIsMovable) {
    this.x = argX;
    this.y = argY;
    this.w = argW;
    this.h = argH;
    this.color = argColor;
    this.isMovable = argIsMovable;
  }

  checkcollision(object) {
    return (
      this.x < object.x + object.w &&
      this.x + this.w > object.x &&
      this.y < object.y + object.h &&
      this.y + this.h > object.y
    );
  }

  moveRight(objects) {
    this.x += 1;
    objects.forEach((object) => {
      if (this.checkcollision(object)) {
        if (object.isMovable) {
          object.x += 1;
        } else {
          this.x -= 1;
        }
      }
    });
  }

  moveLeft(objects) {
    this.x -= 1;
    objects.forEach((object) => {
      if (this.checkcollision(object)) {
        if (object.isMovable) {
          object.x -= 1;
        } else {
          this.x += 1;
        }
      }
    });
  }

  moveUp(objects) {
    this.y -= 1;
    objects.forEach((object) => {
      if (this.checkcollision(object)) {
        if (object.isMovable) {
          object.y -= 1;
        } else {
          this.y += 1;
        }
      }
    });
  }

  moveDown(objects) {
    this.y += 1;
    objects.forEach((object) => {
      if (this.checkcollision(object)) {
        if (object.isMovable) {
          object.y += 1;
        } else {
          this.y -= 1;
        }
      }
    });
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.w, this.h);
  }

  log() {
    console.log(`
    x: ${this.x}
    y: ${this.y}
    w: ${this.w}
    h: ${this.h}
    color: ${this.color}
    `);
  }
}

class Target {
  constructor(argX, argY, argW, argH, argColor) {
    this.x = argX;
    this.y = argY;
    this.w = argW;
    this.h = argH;
    this.color = argColor;
  }

  draw() {
    ctx.strokeStyle = this.color;
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }
}

const wallThikness = 10;

const player1 = new Object2D(50, 50, 50, 50, "blue");
const obstacles = [
  new Object2D(100, 100, 50, 50, "red", true),
  new Object2D(0, 0, canvas.width, wallThikness, "green", false),
  new Object2D(
    0,
    canvas.height - wallThikness,
    canvas.width,
    wallThikness,
    "green",
    false
  ),
  new Object2D(
    0,
    wallThikness,
    wallThikness,
    canvas.height - wallThikness * 2,
    "green",
    false
  ),
  new Object2D(
    canvas.width - wallThikness,
    wallThikness,
    wallThikness,
    canvas.height - wallThikness * 2,
    "green",
    false
  ),
];
let target1 = new Target(100, 150, 50, 50, "green");

const interval = setInterval(() => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player1.draw();
  target1.draw();
  if (obstacles[0].x === target1.x && obstacles[0].y === target1.y) {
    //gameWon = true;
    score++
    const x = Math.floor(Math.random() * (200 - 100 + 1) + 100)
    const y = Math.floor(Math.random() * (200 - 100 + 1) + 100)
    target1 = new Target(x, y, 50, 50, "green");
  }
  obstacles.forEach((obstacle) => {
    obstacle.draw();
  });
  // score
  ctx.fillStyle = "black";
  ctx.font = "30px Arial";
  ctx.fillText(score, 10, 50);
  // game over
  if (gameWon) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.font = "30px Arial";
    ctx.fillText("You won", 10, 50);
    clearInterval(interval);
  }
}, 10);

document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 38:
      player1.moveUp(obstacles);
      break;
    case 40:
      player1.moveDown(obstacles);
      break;
    case 37:
      player1.moveLeft(obstacles);
      break;
    case 39:
      player1.moveRight(obstacles);
      break;
  }
});
