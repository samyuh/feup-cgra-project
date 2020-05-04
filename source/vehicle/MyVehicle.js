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
          this.posY = initialPosY;
          this.initialPosY = initialPosY;
          this.posZ = 0;
          
          this.zeppelin = new MyZeppelin(scene, 5, 1);

          this.flag = new MyPlane(scene, 50);
          this.flagTex = new CGFtexture(scene, "textures/zeppellin/flag.png");
      
          this.flagShader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
            
          this.flagShader.setUniformsValues({ flagTex: 0});
          this.flagShader.setUniformsValues({ flagMap: 1 });
          this.flagShader.setUniformsValues({ velocity: 2 });
          this.flagShader.setUniformsValues({ timeFactor : 3});
          // Auto pilot
          this.auto = false;
          this.autoPilotConfigured = false;
          this.previousTime = 0;
          this.xCenter = 0;
          this.zCenter = 0;
          
    }
    origDist() {
        return Math.sqrt(this.posX*this.posX + this.posZ*this.posZ);
    }
    update(t) {
        if(this.auto) {
            let vAng = (Math.PI*2) / 5000;
            let deltaT = t - this.previousTime;

            if(!this.autoPilotConfigured) {
                this.xCenter = this.posX + Math.cos(this.angleY) * 5;
                this.zCenter = this.posZ - Math.sin(this.angleY) * 5;
                this.velocity = vAng * 5; // to see helix
                this.autoPilotConfigured = true;
                this.previousTime = t;
            }
            else {  
                this.previousTime = t;
                this.angleY += vAng * deltaT;
                this.posX = -Math.cos(this.angleY) * 5 + this.xCenter;
                this.posZ = Math.sin(this.angleY) * 5 + this.zCenter;
           }
        }
        else {
            //this.posX += Math.sin(this.angleY) * this.velocity;
            //this.posZ += Math.cos(this.angleY) * this.velocity;
            this.autoPilotConfigured = false;
        }
        this.zeppelin.rotateHelix(this.velocity);
        this.flagShader.setUniformsValues({ velocity: this.velocity * 1.0 });
        this.flagShader.setUniformsValues({ timeFactor: t / 100 % 1000 });
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
        this.posY = this.initialPosY;
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

        this.scene.setActiveShader(this.flagShader);
  
        this.flagTex.bind(0);
        this.scene.rotate(Math.PI/2, 0, 1, 0);
        this.scene.translate(3, 0, 0);
        this.scene.scale(3, 0.8, 1);
        this.flag.display();
        
        this.scene.setActiveShader(this.scene.defaultShader);
       
        this.scene.popMatrix();
    }
    enableNormalViz() {
		this.zeppelin.enableNormalViz();
    }
    disableNormalViz() {
		this.zeppelin.disableNormalViz();
    }

}
