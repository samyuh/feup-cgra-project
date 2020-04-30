/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBillboard extends CGFobject {
    constructor(scene) {
    super(scene);

    this.plane = new MyPlane(scene, 50);
    this.suppliesDelivered = 0;

    //Textures
    this.message = new CGFtexture(scene,"textures/white.png");

    //Shaders
    this.shader = new CGFshader(scene.gl, "shaders/billboard.vert", "shaders/billboard.frag");

    //this.shader.setUniformsValues({ white: 0 });
    this.shader.setUniformsValues({suppliesDelivered : this.suppliesDelivered/5.0});
    }

    update(supplies){
        this.suppliesDelivered = supplies;
        this.shader.setUniformsValues({suppliesDelivered : this.suppliesDelivered/5.0});
    }

    display() {
        // Planes
        // Front Plane
        this.scene.pushMatrix();
        this.scene.translate(0,3/2,0);
        this.scene.scale(2,1,1);
        this.plane.display();
        this.scene.popMatrix();

        // Back Plane
        this.scene.pushMatrix();
        this.scene.translate(0,3/2,0);
        this.scene.scale(2,1,1);
        this.scene.rotate(Math.PI,0,1,0);
        this.plane.display();
        this.scene.popMatrix();

        // Posts (Height = 1)
        // First Post Front
        this.scene.pushMatrix();
        this.scene.translate(-15/16,1/2,0);
        this.scene.scale(1/8,1,1);
        this.plane.display();
        this.scene.popMatrix();

        // First Post Back
        this.scene.pushMatrix();
        this.scene.translate(-15/16,1/2,0);
        this.scene.scale(1/8,1,1);
        this.scene.rotate(Math.PI,0,1,0);
        this.plane.display();
        this.scene.popMatrix();

        // Second Post Front
        this.scene.pushMatrix();
        this.scene.translate(15/16,1/2,0);
        this.scene.scale(1/8,1,1);
        this.plane.display();
        this.scene.popMatrix();

        // Second Post Back
        this.scene.pushMatrix();
        this.scene.translate(15/16,1/2,0);
        this.scene.scale(1/8,1,1);
        this.scene.rotate(Math.PI,0,1,0);
        this.plane.display();
        this.scene.popMatrix();

        //Progress Bar (Not visible by now because it's contained in the front plane)
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.shader);
        //this.shader.bind(0);
        this.scene.translate(0,3/2,0.001);
        this.scene.scale(3/2,1/5,1);
        this.plane.display();
        this.scene.popMatrix();
        
    }
    enableNormalViz() {
        this.plane.enableNormalViz()
    }
    disableNormalViz() {
        this.plane.disableNormalViz()
    }

}
