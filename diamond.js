class Diamond{
    constructor(x, y) {
        var options = {
            isStatic:true,
        }
        this.image = loadImage("diamond.png");
        this.body = Bodies.circle(x, y, 40, options);
        World.add(world, this.body);
      }
      display(){
        var angle = this.body.angle;
        var pos=this.body.position;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,0,80,80);
        pop();
      }
}