/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene) {
          super(scene);
          this.angleY = 0;
          this.velocity = 0;
          this.posX = 0;
          this.posY = 0;
          this.posZ = 0;
          this.pyramid = new MyPyramid(scene, 5, 1);
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
        this.posY = 0;
        this.posZ = 0;
    }
    display() {
        this.scene.pushMatrix();
        // Update vehicle coordinates
        this.scene.translate(this.posX, this.posY, this.posZ);
        this.scene.rotate(this.angleY, 0, 1, 0);
        // Pyramid on axis x0z
        this.scene.pushMatrix();
        // this.scene.scale(1,1,2);
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.pyramid.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
    enableNormalViz() {
		this.pyramid.enableNormalViz();
    }
    disableNormalViz() {
		this.pyramid.disableNormalViz();
    }

}
