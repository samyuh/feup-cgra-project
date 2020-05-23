/**
 * MyZeppelin
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyZeppelin extends CGFobject {
    constructor(scene) {
        super(scene);
        // -- Zeppelin Components (Let's build it like a lego building :P) -- //
        this.body = new MyBody(scene);
        this.wing = new MyWing(scene);
        this.helix = new MyHelix(scene);
        this.waggon = new MyWaggon(scene);

        // -- Rotation Variables -- //
        this.helixRotateAngle = 0;
        this.rudderRotateAngle = 0;

        this.zeppelinMaterial = new CGFappearance(scene);
        this.zeppelinMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
        this.zeppelinMaterial.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.zeppelinMaterial.setSpecular(0.5, 0.5, 0.5, 1.0);
        this.zeppelinMaterial.setShininess(5.0);
        this.zeppelinMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }
    /**
     * Updates zeppelin's textures
     * @param {*} bodyTexture New texture for the zeppelin's body
     * @param {*} waggonTextures  New texture for the zeppelin's waggon
     * @param {*} wingTextures New texture for the zeppelin's wings
     * @param {*} helixTextures New texture for the zeppelin's helix
     */
    updateTextures(bodyTexture, waggonTextures, wingTextures, helixTextures) {
        this.body.updateTextures(bodyTexture, this.zeppelinMaterial);
        this.waggon.updateTextures(waggonTextures, this.zeppelinMaterial);
        this.wing.updateTextures(wingTextures, this.zeppelinMaterial);
        this.helix.updateTextures(helixTextures, this.zeppelinMaterial);
    }

    /**
     * Rotates the zeppelin helix
     * @param {number} velocity helix rotation velocity
     */
    rotateHelix(velocity) {
        this.helixRotateAngle += Math.PI / 25 * (velocity * 15 + 1.0);
    }

    /**
     * Rotates the zeppelin's rudder
     * @param {number} direction Direction vehicle is supposed to turn. 0 for negative rotation, 1 for positive rotation
     */
    rotateRudder(direction) {
        var errorTolerance = Math.PI / 300;
        var increment = Math.PI / 200;
        var maxRudderAngle = Math.PI / 20;

        switch(direction) {
            case 0:
                if(this.rudderRotateAngle >= -maxRudderAngle)
                    this.rudderRotateAngle -= increment;
                break;
            case 1:
                if(this.rudderRotateAngle <= maxRudderAngle)
                    this.rudderRotateAngle += increment;
                break;
            default:
                if (this.rudderRotateAngle >= errorTolerance) 
                    this.rudderRotateAngle -= increment;
                else if (this.rudderRotateAngle <= -errorTolerance) 
                    this.rudderRotateAngle += increment;
                break;
        }
    }

    /**
     * Displays the zeppelin
     */
    display() {
        
        // -- Zeppelin body -- //
        this.body.display();

        // -- Waggon -- //
        this.waggon.display();

        // -- Wings -- //
        // -- Top and Bottom Wings -- //
        // -- Rudder Rotation -- //
        this.scene.pushMatrix();
        this.scene.rotate(this.rudderRotateAngle, 0, 1, 1);
        
        // -- Top Wing -- //
        this.scene.pushMatrix();
        this.scene.translate(0, 0.4, -1);
        this.scene.scale(5/8, 5/8, -5/8);
        this.wing.display();
        this.scene.popMatrix();
        // -- Bottom Wing 
        this.scene.pushMatrix();
        this.scene.translate(0, -0.4, -1);
        this.scene.scale(5/8, -5/8, -5/8);
        this.wing.display();
        this.scene.popMatrix();
        this.scene.popMatrix();
        // -- Right and Left Wings -- //
        // -- Right Wing -- //
        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0, -1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1)
        this.scene.scale(5/8, 5/8, -5/8);
        this.wing.display();
        this.scene.popMatrix();
        // Left Wing -- //
        this.scene.pushMatrix();
        this.scene.translate(0.4, 0, -1);
        this.scene.rotate(Math.PI / 2, 0, 0, 1)
        this.scene.scale(5/8, -5/8, -5/8);
        this.wing.display();
        this.scene.popMatrix();

        // -- Helix and Turbine -- //
        // -- Left Helix -- //
        this.scene.pushMatrix();
        this.scene.translate(-0.11, 0, 0);
        this.helix.rotateHelix(this.helixRotateAngle);
        this.scene.translate(0, -0.55, -0.28);
        this.scene.scale(1 / 16, 1 / 16, 1 / 16);
        this.helix.display();
        this.scene.popMatrix();
        // -- Right Helix -- //
        this.scene.pushMatrix();
        this.scene.translate(0.11, 0, 0);
        this.helix.rotateHelix(this.helixRotateAngle);
        this.scene.translate(0, -0.55, -0.28);
        this.scene.scale(1 / 16, 1 / 16, 1 / 16);
        this.helix.display();
        this.scene.popMatrix();
    }
    /**
     * Enables visualization of Object's normals
     */
    enableNormalViz() {
        this.body.enableNormalViz();
        this.wing.enableNormalViz();
        this.helix.enableNormalViz();
        this.waggon.enableNormalViz();
    }
    /**
     * Disables visualization of Object's normals
     */
    disableNormalViz() {
        this.body.disableNormalViz();
        this.wing.disableNormalViz();
        this.helix.disableNormalViz();
        this.waggon.disableNormalViz();
    }
}