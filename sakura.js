function Sakura() {
  this.trunk = new Branch(Math.random() * 10, Math.random() / 10, 0, this)
  this.branchCount = 0
  this.tick = this.tick.bind(this);
  this.tick() //start animating
}

Sakura.prototype.tick = function() {
  console.log("sakura's tick not branch's tick")
  //requests another animation frame
  window.requestAnimationFrame(this.tick);

  //calls tick on the tree's trunk
  while (this.branchCount < 100) {
    this.trunk.tick()
  }
}

function Branch(length, thickness, angle, tree) {
  this.length = length;
  this.thickness = thickness;
  this.angle = angle;
  this.tree = tree
  this.children = []

  this.tree.branchCount += 1
  console.log(this.tree.branchCount)
}

Branch.prototype.tick = function() {
  console.log('CALLED TICK')
  //grows branch by a random amount
  this.length += Math.random()
  this.thickness += Math.random()
  this.angle += Math.random()

  //sprouts new children 0.5% of the time
  if (Math.random() <= .005){
    console.log("making new children")
    var newBranch = new Branch(Math.random() * 5, Math.random() / 5, Math.random() * 90, this.tree)
    this.children.push(newBranch)
    console.log("CHILDREN")
    console.log(this.children)
    console.log("CHILDREN")
  }

  //calls tick on all its children
  for (i = 0; i < this.children.length; i++) {
    console.log("calling tick on a child")
    console.log(this.children[i])
    this.children[i].tick()
  }

}

var myTree = new Sakura()