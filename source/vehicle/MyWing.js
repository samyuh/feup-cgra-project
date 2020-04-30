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
    }
    display() {

        //Wing's Square
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.5,0.5,0.5);
        this.square.display();
        this.scene.popMatrix();

        //Wing's Triangle
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.25,0.25,0.25);
        this.triangle.display();
        this.scene.popMatrix();


      }
}
