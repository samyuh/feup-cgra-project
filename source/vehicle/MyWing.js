/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyWing extends CGFobject {
      constructor(scene) {
            super(scene);
            this.square = new MySquare(scene);
            this.triangle = new MyTriangle(scene); //Recalibrar vertices

            this.skybox = new CGFappearance(scene);
            this.skybox.setAmbient(1, 1, 1, 1);
            this.skybox.setDiffuse(0.5, 0.5, 0.5, 1);
            this.skybox.setSpecular(0.5, 0.5, 0.5, 1);
            this.skybox.setShininess(5.0);
            this.skybox.setTextureWrap('REPEAT', 'REPEAT');
            this.skybox.setTexture(new CGFtexture(scene, 'textures/zeppellin/body.jpg'));
      }
      display() {
            //Wing's Square
            this.skybox.apply();
            this.scene.pushMatrix();
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.scene.scale(0.5, 0.5, 0.5);
            this.square.display();
            this.scene.popMatrix();

            //Wing's Triangle
            this.scene.pushMatrix();
            this.scene.translate(0, 0, -0.5);
            this.scene.rotate(Math.PI / 2, 0, 1, 0);
            this.scene.scale(0.25, 0.25, 0.25);
            this.triangle.display();
            this.scene.popMatrix();
      }
}