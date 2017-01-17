maxBranches = 150

function Sakura() {
  this.branchCount = 0
  this.trunk = new Branch(Math.random() * 10, Math.random() / 2, 0, this)

  this.canvas = document.getElementById('canvas')
  this.canvas.width = this.canvas.clientWidth
  this.canvas.height = this.canvas.clientHeight

  this.ctx = this.canvas.getContext('2d')

  this.tick = this.tick.bind(this);
  this.tick() //start animating
}

Sakura.prototype.tick = function() {
  //requests another animation frame
  window.requestAnimationFrame(this.tick);

  var turtle = new Turtle()
  turtle.x = this.canvas.width / 2
  turtle.y = this.canvas.height

  //calls tick on the tree's trunk
  if (this.branchCount < maxBranches) {
    this.draw()
    this.trunk.tick(turtle)
    window.cancelAnimationFrame(this.tick)
  }
}

Sakura.prototype.draw = function() {
  this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height)
}

function Branch(branchLength, thickness, angle, tree) {
  this.branchLength = branchLength;
  this.thickness = thickness;
  this.angle = angle;
  this.tree = tree
  this.children = []

  this.tree.branchCount += 1
  console.log(this.tree.branchCount)
}

Branch.prototype.tick = function(turtle) {
  //grows branch by a random amount
  this.branchLength += Math.random() / 10
  this.thickness += Math.random() / 100
  this.angle += Math.random() / 20

  //sprouts new children 0.5% of the time
  if (Math.random() <= .005) {
    var newBranch = new Branch(Math.random(), Math.random() / 100, Math.random() * -50, this.tree)
    this.children.push(newBranch)
  }

  this.draw(turtle)

  //calls tick on all its children
  if (this.tree.branchCount < maxBranches) {
    for (i = 0; i < this.children.length; i++) {
      this.children[i].tick(turtle.spawn())
    }
  }

}

Branch.prototype.draw = function(turtle) {
  this.tree.ctx.beginPath()
  this.tree.ctx.strokeStyle = "#6E2C00"
  this.tree.ctx.lineWidth = this.thickness
  this.tree.ctx.moveTo(turtle.pos[0], turtle.pos[1])
  turtle.turnLeft(this.angle)
  turtle.fwd(this.branchLength)
  this.tree.ctx.lineTo(turtle.pos[0], turtle.pos[1])
  this.tree.ctx.stroke()
}

var myTree = new Sakura()