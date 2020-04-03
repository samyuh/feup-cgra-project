/**
* MyVehicle
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene) {
        super(scene);
        //SE colocar 2 no primeiro parametro, seráum triangulo;
        this.pyramid = new MyPyramid(scene, 5, 1);
    }
    //ESte metodo deve dar display a uma pirâmide ou triangulo na orientação correta
    display(){
        //Para fazer um triangulo, bata ir ao constructor;
        //Display da pirâmide
        this.scene.pushMatrix();
        this.scene.scale(1,1,2);
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.pyramid.display();
        this.scene.popMatrix();
    }

}
