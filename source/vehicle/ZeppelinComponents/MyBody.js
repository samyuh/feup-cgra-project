/**
 * Mybody
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBody extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 16, 8);
    }

    /**
     * Changes the current applied textures
     * @param {Object} texture  texture applied to the body
     * @param {Object} zeppelinMaterial material used 
     */
    updateTextures(texture, zeppelinMaterial) {
        this.zeppelinMaterial = zeppelinMaterial;
        this.body = texture;
    }

    /**
     * Displays the body in a certain position
     */
    display() {
        this.zeppelinMaterial.setTexture(this.body);
        this.zeppelinMaterial.apply();
        this.scene.pushMatrix();
        this.scene.scale(0.5, 0.5, 1);
        this.sphere.display();
        this.scene.popMatrix();
    }
    /**
     * Enables visualization of Object's normals
     */
    enableNormalViz() {
        this.sphere.enableNormalViz();
    }
    /**
     * Disables visualization of Object's normals
     */
    disableNormalViz() {
        this.sphere.disableNormalViz();
    }
}