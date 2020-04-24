/**
 * MyZeppelin
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyZeppelin extends CGFobject {
    constructor(scene) {
          super(scene);
          this.cylinder = new MyCylinder(scene, 100);
          this.sphere = new MySphere(scene, 16, 8);
          this.square = new MySquare(scene);
          this.triangle = new MyTriangle(scene); //Recalibrar vertices
          this.wing = new MyWing(scene);
          this.helix = new MyHelix(scene);
          this.helixRotate = 0;
          this.lemesRotate = 0;
    }
    rotateHelix(velocity) {
        this.helixRotate += Math.PI/3 * velocity;
    }

    updateLemes(max, signal) {
        this.lemesRotate = (Math.abs(this.lemesRotate) >= Math.abs(max) ? max : this.lemesRotate + (Math.PI/200)*signal); 
    }
    display() {
        // Zeppelin body
        this.scene.pushMatrix();
        this.scene.scale(1/2,1/2,1);
        this.sphere.display();
        this.scene.popMatrix();

        // --------
        // Top Wing and Bottom Wing
        // Top Wing
        this.scene.pushMatrix();
        this.scene.rotate(this.lemesRotate, 0, 1, 1);
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, -1);
        this.scene.scale(1, 1, -1);
        this.wing.display();
        this.scene.popMatrix();
        // Bottom Wing
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, -1);
        this.scene.scale(1, -1, -1);
        this.wing.display();
        this.scene.popMatrix();
        this.scene.popMatrix();

        // --------
        // Front and Back Wing
        // Front Wing
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,-1);
        this.scene.rotate(Math.PI/2,0,0,1)
        this.scene.scale(1,1,-1);
        this.wing.display();
        this.scene.popMatrix();
        // Back Wing
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,-1);
        this.scene.rotate(Math.PI/2,0,0,1)
        this.scene.scale(1,-1,-1);
        this.wing.display();
        this.scene.popMatrix();

        // --------

        // Waggon
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.scale(1/8,1/8,1/2);
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.cylinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,-0.125);
        this.scene.scale(1/8,1/8,1/8);
        this.scene.translate(0,0,-1);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0.125);
        this.scene.scale(1/8,1/8,1/8);
        this.scene.translate(0,0,1);
        this.sphere.display();
        this.scene.popMatrix();

        // --------

        // Helix
        
        this.scene.pushMatrix();
        this.scene.translate(0.1,-0.55,-0.3);
        this.scene.scale(1/16,1/16,1/16);
        this.scene.rotate(this.helixRotate, 0, 0, 1);

        this.scene.pushMatrix();
        this.scene.translate(0,0,0);
        this.scene.scale(3/4,3/4,2);
        this.sphere.display();
        this.scene.popMatrix();

        this.helix.display();
        this.scene.popMatrix();
    }
    enableNormalViz() {
        this.cylinder.enableNormalViz();
        this.sphere.enableNormalViz();
        this.square.enableNormalViz();
        this.triangle.enableNormalViz();
    }
    disableNormalViz() {
        this.cylinder.disableNormalViz();
        this.sphere.disableNormalViz();
        this.square.disableNormalViz();
        this.triangle.disableNormalViz();
    }

}
