/**
 * MyWaggon
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyWaggon extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 16, 8);
        this.cylinder = new MyCylinder(scene, 100);
    }

    /**
     * Changes the current applied textures
     * @param {Array<Object>} textures Array with 3 textures which are applied to the waggon
     */
    updateTextures(textures, zeppelinMaterial) {
        this.zeppelinMaterial = zeppelinMaterial;
        this.mainWaggon = textures[0];
        this.frontWaggon = textures[1];
        this.backWaggon = textures[2];
    }
    
    /**
     * Displauys the waggon in a certain position
     */
    display() {
        // Central cylinder 
        this.zeppelinMaterial.setTexture(this.mainWaggon);
        this.zeppelinMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.scale(1 / 8, 1 / 8, 1 / 2);
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.cylinder.display();
        this.scene.popMatrix();
        
        // First sphere completing one side of the waggon
        this.zeppelinMaterial.setTexture(this.backWaggon);
        this.zeppelinMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -0.125);
        this.scene.scale(1 / 8, 1 / 8, 1 / 8);
        this.scene.translate(0, 0, -1);
        this.sphere.display();
        this.scene.popMatrix();

        // First sphere completing the other side of the waggon
        this.zeppelinMaterial.setTexture(this.frontWaggon);
        this.zeppelinMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0.125);
        this.scene.scale(1 / 8, 1 / 8, 1 / 8);
        this.scene.translate(0, 0, 1);
        this.sphere.display();
        this.scene.popMatrix();
    }
}