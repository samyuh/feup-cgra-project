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
          this.square = new MyQuad(scene);
          this.triangle = new MyTriangle(scene); //Recalibrar vertices
    }
    display() {

        //Corpo do dirigível
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,1);
        this.sphere.display();
        this.scene.popMatrix();

        //Quadrado da asa de cima
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,-1);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.5,0.5,0.5);
        this.square.display();
        this.scene.popMatrix();

        //Quadrado da asa de baixo
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,-1);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.5,0.5,0.5);
        this.square.display();
        this.scene.popMatrix();

        //Triangulo da asa de cima
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.25,0.25,0.25);
        this.triangle.display();
        this.scene.popMatrix();

        //Triangulo da asa de baixo
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,-0.5);
        this.scene.rotate(Math.PI,1,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.25,0.25,0.25);
        this.triangle.display();
        this.scene.popMatrix();


        //Quadrado da asa lateral da frente
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,-1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.5,0.5,0.5);
        this.square.display();
        this.scene.popMatrix();

        //Quadrado da asa lateral de trás
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,-1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.5,0.5,0.5);
        this.square.display();
        this.scene.popMatrix();

        //Triangulo da asa de frente
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,-0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.25,0.25,0.25);
        this.triangle.display();
        this.scene.popMatrix();

        //Triangulo da asa de trás
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,-0.5);
        this.scene.scale(-1,1,1);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.scale(0.25,0.25,0.25);
        this.triangle.display();
        this.scene.popMatrix();



        //Corpo inferior

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








    }

}
