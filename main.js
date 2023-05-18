console.log("创建地图")
var box = document.createElement('div')
box.setAttribute('id', "box")
document.body.appendChild(box)
let pointDiv = document.createElement('div')
pointDiv.setAttribute('id', 'pointDiv')
let point = document.createElement('span')
point.setAttribute('id', 'point')
point.innerText = "长度:3"
pointDiv.appendChild(point)
let tip = document.createElement('span')
tip.innerText = "按Enter开始/继续，空格键暂停，F5重置"
pointDiv.appendChild(tip)
let wrapper = document.createElement('div')
let checkbox = document.createElement('input')
checkbox.setAttribute('id', 'checkbox1')
checkbox.setAttribute('type', 'checkbox')
checkbox.setAttribute('value', 'checked')
wrapper.appendChild(checkbox)
let text = document.createTextNode('开启长按加速')
wrapper.appendChild(text)
pointDiv.appendChild(wrapper)
document.body.appendChild(pointDiv)
console.log("创建网格")
for (let i = 0; i < 400; i++) {
    let grid = document.createElement('div')
    grid.setAttribute('id', `grid_${i}`)
    document.getElementById('box').appendChild(grid)
}

function refresh() {
    for (let i = 0; i < 400; i++) {
        document.getElementById(`grid_${i}`).style.backgroundColor = ""
        document.getElementById(`grid_${i}`).style.borderRadius = ""

    }
    snake.show()
    food.show()
}
class Node {
    constructor(index, isHead) {
        this.index = index
        this.x = index / 20
        this.y = index % 20
        this.isHead = isHead
    }
}
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

class Food {
    constructor() {
        this.levelColor = ['#d3a120', '#22c017', '#9f5eba']
        this.levelLength = [1, 2, 3]
        this.refresh()
    }
    refresh() {
        this.level = randInt(0, 3)
        this.index = randInt(0, 400)
        this.show()

    }

    show() {
        document.getElementById(`grid_${this.index}`).style.backgroundColor = this.levelColor[this.level]

    }
}


class Snake {
    constructor() {
        this.length = 3
        this.nodes = [new Node(201, false), new Node(202, false), new Node(203, false), new Node(204, false), new Node(205, false), new Node(206, true)]
        this.isDead = false
        this.moveDirection = 1
        this.show()
    }
    show() {
        for (let i = this.nodes.length - this.length; i < this.nodes.length; i++) {
            let color = "#359895"
            if (this.nodes[i].isHead) {
                color = "pink"
                document.getElementById(`grid_${this.nodes[i].index}`).style.borderRadius = "10px"
            }
            document.getElementById(`grid_${this.nodes[i].index}`).style.backgroundColor = color
        }

    }
    move() {
        switch (this.moveDirection) {
            case 1:
                this.moveRight()
                break
            case -1:
                this.moveLeft()
                break
            case -20:
                this.moveUp()
                break
            case 20:
                this.moveDown()
                break
        }
        if (this.nodes.at(this.nodes.length - 1).index === food.index) {
            this.length += food.levelLength[food.level]
            food.refresh()
            document.getElementById("point").innerText = `长度:${this.length}`
        }
    }

    moveUp() {
        let headNode = this.nodes.at(this.nodes.length - 1)
        if (headNode.index - 20 < 0) {
            alert(`你撞墙死了，得分:${snake.length}`)
            this.isDead = true
            return

        }
        headNode.isHead = false
        this.nodes.push(new Node(headNode.index - 20, true))
        if (this.nodes.length > this.length * 3) {
            this.nodes.shift()
        }
    }
    moveDown() {
        let headNode = this.nodes.at(this.nodes.length - 1)
        if (headNode.index + 20 > 399) {
            alert(`你撞墙死了得分:${snake.length}`)
            this.isDead = true
            return

        }
        headNode.isHead = false
        this.nodes.push(new Node(headNode.index + 20, true))
        if (this.nodes.length > this.length * 3) {
            this.nodes.shift()
        }
    }
    moveLeft() {
        let headNode = this.nodes.at(this.nodes.length - 1)
        if (headNode.index % 20 === 0) {
            alert(`你撞墙死了,得分:${snake.length}`)
            this.isDead = true
            return

        }

        headNode.isHead = false
        this.nodes.push(new Node(headNode.index - 1, true))
        if (this.nodes.length > this.length * 3) {
            this.nodes.shift()
        }
    }
    moveRight() {
        let headNode = this.nodes.at(this.nodes.length - 1)
        if ((headNode.index + 1) % 20 === 0) {
            alert(`你撞墙死了，得分:${snake.length}`)
            this.isDead = true
            return

        }
        headNode.isHead = false
        this.nodes.push(new Node(headNode.index + 1, true))
        if (this.nodes.length > this.length * 3) {
            this.nodes.shift()

        }
    }
}
var started = false
console.log("创建蛇")
var snake = new Snake()
var food = new Food()

function mainFrame() {
    if (!started || snake.isDead) {
        clearInterval(interval1)
        window.location.reload()
        return

    }
    console.log(snake.nodes)
    snake.move()
    refresh()

}
var interval1 = null
//方向改变监听
window.addEventListener('keydown', function (event) {
    if (event.key === "Enter") {
        interval1 = setInterval(mainFrame, 200)
        started = true
    }
    if (!started) {
        return
    }
    if (event.code === "Space" && started) {
        this.clearInterval(interval1)
        started = false
    }

    let oldDirection = snake.moveDirection
    switch (event.key) {
        case "ArrowUp":
        case "w":
        case "W":
            if (snake.moveDirection == 20) {
                break;
            }
            snake.moveDirection = -20
            break;
        case "ArrowLeft":
        case "a":
        case "A":
            if (snake.moveDirection == 1) {
                break;
            }
            snake.moveDirection = -1
            break
        case "ArrowRight":
        case "r":
        case "R":
            if (snake.moveDirection == -1) {
                break;
            }
            snake.moveDirection = 1
            break;
        case "ArrowDown":
        case "s":
        case "S":
            if (snake.moveDirection == -20) {
                break;
            }
            snake.moveDirection = 20
            break;


    }
    if (this.document.getElementById("checkbox1").checked) {
        snake.move()
        refresh()
    } else {
        if (oldDirection !== snake.moveDirection) {
            snake.move()
            refresh()
        }
    }




})
