/**
 * MyZeppelin
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyZeppelin extends CGFobject {
    constructor(scene) {
        super(scene);
        /* Zeppelin Components (Let's build it like a lego building :P) */
        this.body = new MyBody(scene);
        this.wing = new MyWing(scene);
        this.helix = new MyHelix(scene);
        this.waggon = new MyWaggon(scene);

        /* Rotation Variables */
        this.helixRotateAngle = 0;
        this.rudderRotateAngle = 0;
    }
    /**
     * Updates zeppelin's textures
     * @param {*} bodyTexture New texture for the zeppelin's body
     * @param {*} waggonTextures  New texture for the zeppelin's waggon
     * @param {*} wingTextures New texture for the zeppelin's wings
     * @param {*} helixTextures New texture for the zeppelin's helix
     */
    updateTextures(bodyTexture, waggonTextures, wingTextures, helixTextures) {
        this.body.updateTextures(bodyTexture);
        this.waggon.updateTextures(waggonTextures);
        this.wing.updateTextures(wingTextures);
        this.helix.updateTextures(helixTextures);
    }
    /**
     * Rotates the zeppelin helix
     * @param {number} velocity helix rotation velocity
     */
    rotateHelix(velocity) {
        this.helixRotateAngle += Math.PI / 3 * velocity;
    }
    /**
     * Rotates the zeppelin's rudder
     * @param {number} max Maximum value of rudder rotation
     * @param {number} signal Value added to the rotation, if max is not surpassed
     */
    rotateRudder(signal) {
        //this.rudderRotateAngle = (Math.abs(this.rudderRotateAngle) >= Math.abs(max) ? max : this.rudderRotateAngle + (Math.PI / 200) * signal);
        switch(signal){
            case 0:
                if(this.rudderRotateAngle >= -Math.PI / 12)
                    this.rudderRotateAngle -= Math.PI / 200;
                break;
            case 1:
                if(this.rudderRotateAngle <= Math.PI / 12)
                    this.rudderRotateAngle += Math.PI / 200;
                break;
            case 2:
                break;
        }
    }
    /**
     * Displays the zeppelin in a certain position
     */
    display() {
        
        // Zeppelin body
        this.body.display();

        // Waggon 
        this.waggon.display();

        // Wings
        // Top and Bottom Wings 
        // Rudder Rotation
        this.scene.pushMatrix();
        this.scene.rotate(this.rudderRotateAngle, 0, 1, 1);
        
        // Top Wing
        this.scene.pushMatrix();
        this.scene.translate(0, 0.4, -1);
        this.scene.scale(3/4, 3/4, -3/4);
        this.wing.display();
        this.scene.popMatrix();
        // Bottom Wing 
        this.scene.pushMatrix();
        this.scene.translate(0, -0.4, -1);
        this.scene.scale(3/4, -3/4, -3/4);
        this.wing.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        // Right and Left Wings 
        // Right Wing 
        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0, -1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1)
        this.scene.scale(3/4, 3/4, -3/4);
        this.wing.display();
        this.scene.popMatrix();
        // Left Wing 
        this.scene.pushMatrix();
        this.scene.translate(0.4, 0, -1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1)
        this.scene.scale(3/4, -3/4, -3/4);
        this.wing.display();
        this.scene.popMatrix();

        // Helix and Turbine 
        // Left Helix 
        this.scene.pushMatrix();
        this.scene.translate(-0.1, 0, 0);
        this.helix.rotateHelix(this.helixRotateAngle);
        this.scene.translate(0, -0.55, -0.3);
        this.scene.scale(1 / 16, 1 / 16, 1 / 16);
        this.helix.display();
        this.scene.popMatrix();
        // Right Helix 
        this.scene.pushMatrix();
        this.scene.translate(0.1, 0, 0);
        this.helix.rotateHelix(this.helixRotateAngle);
        this.scene.translate(0, -0.55, -0.3);
        this.scene.scale(1 / 16, 1 / 16, 1 / 16);
        this.helix.display();
        this.scene.popMatrix();
    }
}