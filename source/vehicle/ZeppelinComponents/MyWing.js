/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyWing extends CGFobject {
      constructor(scene) {
            super(scene);
            this.square = new MySquare(scene);
            this.triangle = new MyTriangle(scene);

            this.zeppelinMaterial = new CGFappearance(scene);
            this.zeppelinMaterial.setAmbient(1.0, 1.0, 1.0, 1.0);
            this.zeppelinMaterial.setDiffuse(1.0, 1.0, 1.0, 1.0);
            this.zeppelinMaterial.setSpecular(1.0, 1.0, 1.0, 1.0);
            this.zeppelinMaterial.setShininess(5.0);
            this.zeppelinMaterial.setTextureWrap('REPEAT', 'REPEAT');
      }
      
      /**
       * Changes the current applied textures
       * @param {Array<Object>} textures Array with 2 textures which are applied to the wings
       */
      updateTextures(texture) {
            this.frontWing = texture[0];
            this.backWing = texture[1];
      }

      /**
       * Displauys the wings in a certain position
       */
      display() {
            /* Wing's Square */
            this.zeppelinMaterial.setTexture(this.frontWing);
            this.zeppelinMaterial.apply();
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.scene.scale(0.5, 0.5, 0.5);
            this.square.display();
            this.scene.popMatrix();

            /* Wing's Triangle */
            this.zeppelinMaterial.setTexture(this.backWing);
            this.zeppelinMaterial.apply();
            this.scene.pushMatrix();
            this.scene.translate(0, 0, -0.5);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.scene.scale(0.25, 0.25, 0.25);
            this.triangle.display();
            this.scene.popMatrix();
      }
}