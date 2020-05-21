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
        this.flag = new MyFlag(scene);

        /* Auto pilot variables */
        this.autoPilot = false;
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
        this.flag.updateTextures(textures[4]);
    }

    /**
     * Changes auto pilot state (on->off or off->on)
     */
    setAutoPilot() {
        this.autoPilot = !this.autoPilot;
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
     * @param {number} direction 0 for left, 1 for right
     */
    rudderDirection(direction) {
        this.zeppelin.rotateRudder(direction);
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
        this.zeppelin.rudderRotateAngle = 0; // ???
        this.autoPilot = false;
        this.autoPilotConfigured = false;
    }

    /**
     * Updates vehicle's attributes depending on user input and time passed
     * @param {number} t current time of the program, in ms
     */
    update(t) {
        var deltaT = t - this.previousTime;
        if (this.autoPilot) {
            let vAng = (Math.PI * 2) / 5000;

            if (!this.autoPilotConfigured) {
                //this.velocity = this.angleY * 5;
                this.xCenter = this.posX + Math.cos(this.angleY) * 5;
                this.zCenter = this.posZ - Math.sin(this.angleY) * 5;
                this.autoPilotConfigured = true;
            } else {
                this.angleY += vAng * deltaT;
                this.posX = -Math.cos(this.angleY) * 5 + this.xCenter;
                this.posZ = Math.sin(this.angleY) * 5 + this.zCenter;
                this.zeppelin.rotateHelix(this.angleY * 5 / deltaT);
                this.zeppelin.rotateRudder(0);
            }
        } else {
            this.posX += Math.sin(this.angleY) * this.velocity;
            this.posZ += Math.cos(this.angleY) * this.velocity;
            this.zeppelin.rotateHelix(this.velocity);
            this.autoPilotConfigured = false;
        }

        this.position += this.velocity * (deltaT /1000);
        
        this.flag.setTime(t / 100 % 1000);
        this.flag.setPos(this.position);

        this.previousTime = t;
    }

    /**
     * Displays the vehicle in it's current position
     */
    display() {
        this.scene.pushMatrix();
        // --- Update Coordinates
        this.scene.translate(this.posX, this.posY, this.posZ);

        // --- Vehicle
        this.scene.rotate(this.angleY, 0, 1, 0);
        this.zeppelin.display();
        // --- Flag
        this.flag.display();

        this.scene.popMatrix();
    }
    /**
     * Enables visualization of Object's normals
     */
    enableNormalViz() {
        //this.flag.enableNormalViz();
        this.zeppelin.enableNormalViz();
    }
    /**
     * Disables visualization of Object's normals
     */
    disableNormalViz() {
        //this.flag.disableNormalViz();
        this.zeppelin.disableNormalViz();
    }

}