/**
 * MyWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyHelix extends CGFobject {
    constructor(scene) {
          super(scene);
          this.sphere = new MySphere(scene, 16, 8);
    }
    display() {

        // Body
        this.scene.pushMatrix();
        this.scene.translate(0,0,0);
        this.scene.scale(3/4,3/4,2);
        this.sphere.display();
        this.scene.popMatrix();

        // Translateion of none-body part
        this.scene.pushMatrix();
        this.scene.translate(0,0,-2);

        // Sphere in the middle
        this.scene.pushMatrix();
        this.scene.scale(1/4,1/4,1/4);
        this.sphere.display();
        this.scene.popMatrix();

        // Helix nª 1
        this.scene.pushMatrix();
        this.scene.translate(-1/2,1/2,0);
        this.scene.rotate(Math.PI/2,1,1,0);
        this.scene.scale(1/4,1/4,1);
        this.sphere.display();
        this.scene.popMatrix();

        // Helix nª 2
        this.scene.pushMatrix();
        this.scene.translate(1/2,-1/2,0);
        this.scene.rotate(Math.PI/4,0,0,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(1/4,1/4,1);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.popMatrix();


      }
}
