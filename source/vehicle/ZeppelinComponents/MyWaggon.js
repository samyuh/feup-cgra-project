/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyWaggon extends CGFobject {
    constructor(scene) {
        super(scene);
        this.sphere = new MySphere(scene, 16, 8);
        this.cylinder = new MyCylinder(scene, 100);

        this.zeppelinMaterial = new CGFappearance(scene);
        this.zeppelinMaterial.setAmbient(1, 1, 1, 1);
        this.zeppelinMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
        this.zeppelinMaterial.setSpecular(0.5, 0.5, 0.5, 1);
        this.zeppelinMaterial.setShininess(5.0);
        this.zeppelinMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }
    updateTextures(textures) {
        this.mainWaggon = textures[0];
        this.frontWaggon = textures[1];
        this.backWaggon = textures[2];
    }
    display() {
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

        this.zeppelinMaterial.setTexture(this.backWaggon);
        this.zeppelinMaterial.apply();
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -0.125);
        this.scene.scale(1 / 8, 1 / 8, 1 / 8);
        this.scene.translate(0, 0, -1);
        this.sphere.display();
        this.scene.popMatrix();

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