class bomb{
    constructor(x, y) {
        var options = {
            isStatic:false,
            restitution:1
        }
        this.image = loadImage("bomb.png");
        this.body = Bodies.circle(x, y, 20, options);
        World.add(world, this.body);
      }
      display(){
        var angle = this.body.angle;
        var pos=this.body.position;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image,0,0,40,40);
        pop();
      }
}