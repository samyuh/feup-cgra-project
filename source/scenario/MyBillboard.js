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
    this.material = new CGFappearance(scene);
    this.material.setAmbient(1, 1, 1, 1);
    this.material.setDiffuse(0, 0, 0, 1);
    this.material.setSpecular(0, 0, 0, 1);
    this.material.setShininess(5.0);
    this.material.setTextureWrap('REPEAT', 'REPEAT');
    //this.material.setTexture(this.message);

    this.message = new CGFtexture(scene,"textures/message.png");
    this.back = new CGFtexture(scene,"textures/white.png");
    this.posts = new CGFtexture(scene,"textures/grey.png");

    //Shaders
    this.shader = new CGFshader(scene.gl, "shaders/billboard.vert", "shaders/billboard.frag");

    //this.shader.setUniformsValues({ white: 0 });
    this.shader.setUniformsValues({suppliesDelivered : this.suppliesDelivered/5.0});
    }
    /**
     * Updates the billboard's bar according to the current number of droped supplies
     * @param {number} supplies MyScene's nymber of supplies droped
     */
    update(supplies){
        this.suppliesDelivered = supplies;
        this.shader.setUniformsValues({suppliesDelivered : this.suppliesDelivered/5.0});
    }
    /**
     * Displays the billboard in a certain position
     */
    display() {
        // Planes
        // Front Plane
        this.material.setTexture(this.message);
        this.material.apply();
        this.scene.pushMatrix();
        this.scene.translate(0,3/2,0);
        this.scene.scale(2,1,1);
        this.plane.display();
        this.scene.popMatrix();

        // Back Plane
        this.scene.pushMatrix();
        this.material.setTexture(this.back);
        this.material.apply();
        this.scene.translate(0,3/2,0);
        this.scene.scale(2,1,1);
        this.scene.rotate(Math.PI,0,1,0);
        this.plane.display();
        this.scene.popMatrix();

        // Posts (Height = 1)
        // First Post Front
        this.scene.pushMatrix();
        this.material.setTexture(this.posts);
        this.material.apply();
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

        //Progress Bar
        this.scene.pushMatrix();
        this.scene.setActiveShader(this.shader);
        this.scene.translate(0,3/2,0.001);
        this.scene.scale(3/2,1/5,1);
        this.plane.display();
        this.scene.popMatrix();
        
    }
    /**
     * Enables visualization of Object's normals
     */
    enableNormalViz() {
        this.plane.enableNormalViz()
    }
    /**
     * Disables visualization of Object's normals
     */
    disableNormalViz() {
        this.plane.disableNormalViz()
    }

}
