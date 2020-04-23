/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene) {
          super(scene);
          this.angleY = 0;
          this.velocity = 0;
          this.posX = -0;
          this.posY = 0;
          this.posZ = 0;
          this.auto = false;
          this.zeppelin = new MyZeppelin(scene, 5, 1);

          //
          this.first = false;
          this.final = 0;
    }
    origDist() {
        return Math.sqrt(this.posX*this.posX + this.posZ*this.posZ);
    }
    update() {
        if(this.auto) {
            if(4.9 < this.origDist() && this.origDist() < 5.1) {
                if(this.first) {
                    this.final = this.angleY + Math.PI / 2;
                    this.first = false;
                }
                if(Math.abs(this.angleY - this.final) > 0.1) {
                    this.angleY += Math.PI / 90;
                }
                else {
                    this.angleY += (Math.PI*2) / 300;
                    this.final = this.angleY;
                    this.velocity = 10;
                    this.posX = -5 * Math.cos(this.angleY);
                    this.posZ = 5 * Math.sin(this.angleY); 
                }
            }
            else if(this.origDist() < 5) {
                this.posZ += Math.cos(this.angleY) * 0.01;
                this.posX += Math.sin(this.angleY) * 0.01;
                this.first = true;
            }
            else {
                //this.angleY = (this.posZ > 0) ? Math.PI/2 + Math.atan(this.posZ/this.posX) : Math.PI/2 + Math.atan(this.posZ/this.posX);
                //this.posZ -= this.posZ * 0.01;
                //this.posX -= this.posX * 0.01;
            }   
        }
        else {
            this.posX += Math.sin(this.angleY) * this.velocity;
            this.posY += 0;
            this.posZ += Math.cos(this.angleY) * this.velocity;
            this.zeppelin.rotateHelix(this.velocity);
        }
    }
    turn(val) {
        this.angleY += val;
    }
    leme(i) {
        switch (i) {
            case 0:
                this.zeppelin.updateLemes(-Math.PI/12, -1);
                return;
            case 1:
                this.zeppelin.updateLemes(Math.PI/12, 1);
                return;
            default:
                this.zeppelin.updateLemes(0, 0);
          }
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
    autoPilot() {
        this.auto = !this.auto;
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
