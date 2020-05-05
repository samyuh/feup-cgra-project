/**
 * MyVehicle
 * @constructor
 */
class MyVehicle extends CGFobject {
    constructor(scene, initialPosY) {
        super(scene);
        /* Vehicle main variables */
        this.velocity = 0;
        this.angleY = 0;
        this.posX = 0;
        this.posY = initialPosY;
        this.posZ = 0;

        /* Vehicle model */
        this.zeppelin = new MyZeppelin(scene, 5, 1);

        /* Vehicle flag */
        this.flag = new MyPlane(scene, 50);
        this.flagTex = new CGFtexture(scene, "textures/zeppellin/flag.png");
        this.flagShader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");

        this.flagShader.setUniformsValues({flagTex: 0});

        /* Auto pilot variables */
        this.auto = false;
        this.autoPilotConfigured = false;
        this.previousTime = 0;
        this.xCenter = 0;
        this.zCenter = 0;
    }
    setNewTextures(textures) {
        this.zeppelin.updateTextures(textures[0], textures[1], textures[2], textures[3]);
    }
    setAutoPilot() {
        this.auto = !this.auto;
    }
    update(t) {
        if (this.auto) {
            let vAng = (Math.PI * 2) / 5000;
            let deltaT = t - this.previousTime;

            if (!this.autoPilotConfigured) {
                this.xCenter = this.posX + Math.cos(this.angleY) * 5;
                this.zCenter = this.posZ - Math.sin(this.angleY) * 5;
                this.velocity = vAng * 5; // to see helix
                this.autoPilotConfigured = true;
                this.previousTime = t;
            } else {
                this.previousTime = t;
                this.angleY += vAng * deltaT;
                this.posX = -Math.cos(this.angleY) * 5 + this.xCenter;
                this.posZ = Math.sin(this.angleY) * 5 + this.zCenter;
            }
        } else {
            this.posX += Math.sin(this.angleY) * this.velocity;
            this.posZ += Math.cos(this.angleY) * this.velocity;
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
                this.zeppelin.rotateRudder(-Math.PI / 12, -1);
                return;
            case 1:
                this.zeppelin.rotateRudder(Math.PI / 12, 1);
                return;
            default:
                this.zeppelin.rotateRudder(0, 0);
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
        this.posZ = 0;
    }
    display() {
        this.scene.pushMatrix();
        /* Update Vehicle Coordinates */
        this.scene.translate(this.posX, this.posY, this.posZ);
        /* Rotate Vehicle */
        this.scene.rotate(this.angleY, 0, 1, 0);

        this.zeppelin.display();

        /* Flag */
        this.scene.setActiveShader(this.flagShader);
        this.flagTex.bind(0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
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