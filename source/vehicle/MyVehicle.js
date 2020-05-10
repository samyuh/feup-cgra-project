/**
 * MyVehicle
 * @constructor
 * @param scene - Reference to MyScene object
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
        this.flag = new MyDoubleSidePlane(scene, 50);
        this.flagTex = new CGFtexture(scene, "textures/zeppellin/flag.png");
        this.flagShader = new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");

        this.flagShader.setUniformsValues({flagTex: 0});

        /* Auto pilot variables */
        this.auto = false;
        this.autoPilotConfigured = false;
        this.previousTime = 0;
        this.xCenter = 0;
        this.zCenter = 0;


        this.position = 0;
    }
    /**
     * Set Method for changing current textures
     * @param {Array<Object>} textures Array with 4 textures which are applied to the vehicle
     */
    setNewTextures(textures) {
        this.zeppelin.updateTextures(textures[0], textures[1], textures[2], textures[3]);
    }
    /**
     * Changes auto pilot state (on->off or off->on)
     */
    setAutoPilot() {
        this.auto = !this.auto;
    }
    /**
     * Updates vehicle's attributes depending on user input and time passed
     * @param {number} t current time of the program, in ms
     */
    update(t) {
        var deltaT = t - this.previousTime;
        if (this.auto) {
            let vAng = (Math.PI * 2) / 5000;
            

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
        this.position += this.velocity* (deltaT /1000);
        this.flagShader.setUniformsValues({ position : this.position});
    }
    /**
     * Turns the vehicle
     * @param {number} val vehicle angle for turning
     */
    turn(val) {
        this.angleY += val;
    }
    /**
     * Rotates the vehicle's rudder
     * @param {number} i 0 for negative rotation, 1 for positive rotation
     */
    leme(i) {
        switch (i) {
            case 0:
                this.zeppelin.rotateRudder(0);
                return;
            case 1:
                this.zeppelin.rotateRudder(1);
                return;
            default:
                this.zeppelin.rotateRudder(2);
        }
    }
    /**
     * Changes vehicle's current speed
     * @param {number} val value of accelaration
     */
    accelerate(val) {
        this.velocity += val;
        this.velocity = ((this.velocity > 0) ? this.velocity : 0);
        this.velocity = Math.min(this.velocity,1);

    }
    /**
     * Resets the obejcts's atrributes to its default state
     */
    reset() {
        this.angleY = 0;
        this.velocity = 0;
        this.posX = 0;
        this.posZ = 0;
        this.position = 0;
        this.zeppelin.rudderRotateAngle = 0;
    }
    /**
     * Displays the vehicle in it's current position
     */
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
    /**
     * Enables visualization of Object's normals
     */
    enableNormalViz() {
        this.zeppelin.enableNormalViz();
    }
    /**
     * Disables visualization of Object's normals
     */
    disableNormalViz() {
        this.zeppelin.disableNormalViz();
    }

}