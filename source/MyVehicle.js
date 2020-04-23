/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene,initialPosY) {
          super(scene);
          this.angleY = 0;
          this.velocity = 0;
          this.posX = 0;
          this.initialPosY = initialPosY;
          this.posY = initialPosY;
          this.posZ = 0;
          this.zeppelin = new MyZeppelin(scene, 5, 1);
    }
    update() {
        this.posX += Math.sin(this.angleY) * this.velocity;
        this.posY += 0;
        this.posZ += Math.cos(this.angleY) * this.velocity;
    }
    turn(val) {
        this.angleY += val;
    }
    accelerate(val) {
        this.velocity += val;

        this.velocity = ((this.velocity > 0) ? this.velocity : 0);
    }
    reset() {
        this.angleY = 0;
        this.velocity = 0;
        this.posX = 0;
        this.posY = this.initialPosY;
        this.posZ = 0;
    }
    display() {
        this.scene.pushMatrix();
        // Update vehicle coordinates
        this.scene.translate(this.posX, this.posY, this.posZ);
        this.scene.rotate(this.angleY, 0, 1, 0);
        this.zeppelin.display();
        this.scene.popMatrix();
    }
    enableNormalViz() {
		this.zeppelin.enableNormalViz();
    }
    disableNormalViz() {
		this.zeppelin.disableNormalViz();
    }

}
