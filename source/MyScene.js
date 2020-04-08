/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();
        this.initTextures();
        this.initMaterials();
        this.setUpdatePeriod(50);

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        this.setUpdatePeriod(10);

        this.enableTextures(true);


        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.cylinder = new MyCylinder(this, 8);
        this.incompleteSphere = new MySphere(this, 16, 8);
        this.cube = new MyCubeMap(this);
        this.diamond = new MyDiamond(this);
        this.vehicle = new MyVehicle(this);

        this.selectedMaterial = 0;
        this.speedFactor = 1;
        this.scaleFactor = 1;

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayCylinder = false;
        this.displaySphere = false;
        this.displayNormal = false;
        this.selectedTexture = -1;
        this.displayVehicle = true;
    }
    checkKeys() {
        var move=false;
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.vehicle.accelerate(0.1*this.speedFactor);
        }
        if (this.gui.isKeyPressed("KeyS")) {
            this.vehicle.accelerate(-0.1*this.speedFactor);
        }
        if (this.gui.isKeyPressed("KeyA")) {
            this.vehicle.turn(Math.PI/90);
        }
        if (this.gui.isKeyPressed("KeyD")) {
            this.vehicle.turn(-Math.PI/90);
        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.vehicle.reset();
        }
        if (move)
            this.vehicle.update();
    }


    // Function that initialize the scene textures
    initTextures() {
      this.worldTexture = [ new CGFtexture(this,'images/world_texture/back.png'),
                            new CGFtexture(this,'images/world_texture/bottom.png'),
                            new CGFtexture(this,'images/world_texture/front.png'),
                            new CGFtexture(this,'images/world_texture/left.png'),
                            new CGFtexture(this,'images/world_texture/right.png'),
                            new CGFtexture(this,'images/world_texture/top.png')
                          ];

      this.aridTexture = [ new CGFtexture(this,'images/arid/back.jpg'),
                            new CGFtexture(this,'images/arid/bottom.jpg'),
                            new CGFtexture(this,'images/arid/front.jpg'),
                            new CGFtexture(this,'images/arid/left.jpg'),
                            new CGFtexture(this,'images/arid/right.jpg'),
                            new CGFtexture(this,'images/arid/top.jpg')
                          ];

      this.divineTexture = [ new CGFtexture(this,'images/divine/back.jpg'),
                            new CGFtexture(this,'images/divine/bottom.jpg'),
                            new CGFtexture(this,'images/divine/front.jpg'),
                            new CGFtexture(this,'images/divine/left.jpg'),
                            new CGFtexture(this,'images/divine/right.jpg'),
                            new CGFtexture(this,'images/divine/top.jpg')
                          ];

      this.lakeTexture = [ new CGFtexture(this,'images/lake/back.jpg'),
                            new CGFtexture(this,'images/lake/bottom.jpg'),
                            new CGFtexture(this,'images/lake/front.jpg'),
                            new CGFtexture(this,'images/lake/left.jpg'),
                            new CGFtexture(this,'images/lake/right.jpg'),
                            new CGFtexture(this,'images/lake/top.jpg')
                          ];

      this.testeTexture = [ new CGFtexture(this,'images/teste/back.png'),
                            new CGFtexture(this,'images/teste/bottom.png'),
                            new CGFtexture(this,'images/teste/front.png'),
                            new CGFtexture(this,'images/teste/left.png'),
                            new CGFtexture(this,'images/teste/right.png'),
                            new CGFtexture(this,'images/teste/top.png')
                          ];


      this.textures = [this.worldTexture, this.aridTexture, this.divineTexture, this.lakeTexture, this.testeTexture];
      this.textureIds = { 'World': 0, 'Arid' : 1, 'Divine' : 2, 'Lake' : 3, 'Teste': 4};
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    //Function that applies a new texture selected in interface
    updateAppliedTexture() {
        this.cube.setNewTextures(this.textures[this.selectedTexture]);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        this.vehicle.update();
    }
    initMaterials(){
      this.default = new CGFappearance(this);
      this.default.setAmbient(0.2, 0.4, 0.8, 1.0);
      this.default.setDiffuse(0.2, 0.4, 0.8, 1.0);
      this.default.setSpecular(0.2, 0.4, 0.8, 1.0);
      this.default.setShininess(10.0);

      this.earth = new CGFappearance(this);
      this.earth.setAmbient(0.1, 0.1, 0.1, 1);
      this.earth.setDiffuse(0.9, 0.9, 0.9, 1);
      this.earth.setSpecular(0.1, 0.1, 0.1, 1);
      this.earth.setShininess(10.0);
      this.earth.loadTexture('images/earth.jpg');
      this.earth.setTextureWrap('REPEAT', 'REPEAT');

      this.materials = [this.default, this.earth];

      // Labels and ID's for object selection on MyInterface
      this.materialIDs = {'Default': 0, 'Earth': 1};

    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        // Draw axis
        if (this.displayAxis) {
            this.axis.display();
        }

        this.setDefaultAppearance();
        this.materials[this.selectedMaterial].apply();

        // Make the vehicle move here;
        // this.vehiclePosition = speedFactor

        // ---- BEGIN Primitive drawing section


        if(this.displayCylinder)
            this.cylinder.display();

        //This sphere does not have defined texture coordinates
        if(this.displaySphere)
            this.incompleteSphere.display();

        if(this.displayVehicle){
          this.pushMatrix();
          this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
          this.vehicle.display();
          this.popMatrix();
        }


        if (this.displayNormal)
            this.cylinder.enableNormalViz();

        if (1) {
            this.pushMatrix();
            this.scale(50, 50, 50);
            this.cube.display();
            this.popMatrix();
        }

        // ---- END Primitive drawing section

        this.checkKeys();
    }
}
