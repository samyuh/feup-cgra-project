/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHelix extends CGFobject {
      constructor(scene) {
            super(scene);
            this.sphere = new MySphere(scene, 16, 8);
            this.rotateAngle = 0;

            this.zeppelinMaterial = new CGFappearance(scene);
            this.zeppelinMaterial.setAmbient(1, 1, 1, 1);
            this.zeppelinMaterial.setDiffuse(0.5, 0.5, 0.5, 1);
            this.zeppelinMaterial.setSpecular(0.5, 0.5, 0.5, 1);
            this.zeppelinMaterial.setShininess(5.0);
            this.zeppelinMaterial.setTextureWrap('REPEAT', 'REPEAT');
      }
      updateTextures(textures) {
            this.helixTexture = textures[1];
            this.turbineTexture = textures[2];
      }
      rotateHelix(rotateAngle) {
            this.rotateAngle = rotateAngle;
      }
      display() {
            
            // Rotating the Helix and placing it on the side of the body
            this.scene.pushMatrix();
            this.scene.translate(0, 0, -2);
            this.scene.rotate(this.rotateAngle, 0, 0, 1);

            // Sphere in the middle
            this.scene.pushMatrix();
            this.scene.scale(1 / 4, 1 / 4, 1 / 4);
            this.sphere.display();
            this.scene.popMatrix();

            // Helix nª 1
            this.scene.pushMatrix();
            this.scene.translate(-1 / 2, 1 / 2, 0);
            this.scene.rotate(Math.PI / 2, 1, 1, 0);
            this.scene.scale(1 / 4, 1 / 4, 1);
            this.sphere.display();
            this.scene.popMatrix();

            // Helix nª 2
            this.scene.pushMatrix();
            this.scene.translate(1 / 2, -1 / 2, 0);
            this.scene.rotate(Math.PI / 4, 0, 0, 1);
            this.scene.rotate(Math.PI / 2, 1, 0, 0);
            this.scene.scale(1 / 4, 1 / 4, 1);
            this.sphere.display();
            this.scene.popMatrix();

            this.scene.popMatrix();
            // End of Helix rotation 

            // Body holding the helix
            this.scene.pushMatrix();
            this.scene.translate(0, 0, 0);
            this.scene.scale(3 / 4, 3 / 4, 2);
            this.sphere.display();
            this.scene.popMatrix();

      }
}