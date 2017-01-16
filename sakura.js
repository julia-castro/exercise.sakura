maxBranches = 100

function Sakura() {
  this.trunk = new Branch(Math.random() * 10, Math.random() / 10, 0, this)
  this.branchCount = 0

  this.tick = this.tick.bind(this);
  this.tick() //start animating
}

Sakura.prototype.tick = function() {
  //requests another animation frame
  window.requestAnimationFrame(this.tick);

  //calls tick on the tree's trunk
  while (this.branchCount < maxBranches) {
    this.trunk.tick()
  }
}

function Branch(branchLength, thickness, angle, tree) {
  this.branchLength = branchLength;
  this.thickness = thickness;
  this.angle = angle;
  this.tree = tree
  this.children = []

  this.tree.branchCount += 1
}

Branch.prototype.tick = function() {
  //grows branch by a random amount
  this.branchLength += Math.random()
  this.thickness += Math.random()
  this.angle += Math.random()

  //sprouts new children 0.5% of the time
  if (Math.random() <= .005){
    var newBranch = new Branch(Math.random() * 5, Math.random() / 5, Math.random() * 90, this.tree)
    this.children.push(newBranch)
  }

  //calls tick on all its children
  if (this.tree.branchCount < maxBranches) {
    for (i = 0; i < this.children.length; i++) {
      this.children[i].tick()
    }
  }
}

var myTree = new Sakura()