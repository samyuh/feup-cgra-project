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
        this.sphere = new MySphere(this, 16, 8);
        this.cube = new MyCubeMap(this);
        this.diamond = new MyDiamond(this);
        this.vehicle = new MyVehicle(this);

        this.selectedMaterial = 0;
        this.speedFactor = 1;
        this.scaleFactor = 1;

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayCylinder = false;
        this.displaySkyBox = false;
        this.displaySphere = false;
        this.displayNormal = false;
        this.selectedTexture = -1;
        this.displayVehicle = true;
    }
    checkKeys() {
        // Check for key codes e.g. in https://keycode.info/
        if (this.gui.isKeyPressed("KeyW")) {
            this.vehicle.accelerate(0.001 * this.speedFactor);
        }
        if (this.gui.isKeyPressed("KeyS")) {
            this.vehicle.accelerate(-0.005 * this.speedFactor);
        }
        if (this.gui.isKeyPressed("KeyA")) {
            this.vehicle.turn(Math.PI / 90);
        }
        if (this.gui.isKeyPressed("KeyD")) {
            this.vehicle.turn(-Math.PI / 90);
        }
        if (this.gui.isKeyPressed("KeyR")) {
            this.vehicle.reset();
        }
    }


    // Function that initialize the scene textures
    initTextures() {
        this.worldTexture = [
            new CGFtexture(this, 'images/world_texture/back.png'),
            new CGFtexture(this, 'images/world_texture/bottom.png'),
            new CGFtexture(this, 'images/world_texture/front.png'),
            new CGFtexture(this, 'images/world_texture/left.png'),
            new CGFtexture(this, 'images/world_texture/right.png'),
            new CGFtexture(this, 'images/world_texture/top.png')
        ];

        this.aridTexture = [
            new CGFtexture(this, 'images/arid/back.jpg'),
            new CGFtexture(this, 'images/arid/bottom.jpg'),
            new CGFtexture(this, 'images/arid/front.jpg'),
            new CGFtexture(this, 'images/arid/left.jpg'),
            new CGFtexture(this, 'images/arid/right.jpg'),
            new CGFtexture(this, 'images/arid/top.jpg')
        ];

        this.divineTexture = [
            new CGFtexture(this, 'images/divine/back.jpg'),
            new CGFtexture(this, 'images/divine/bottom.jpg'),
            new CGFtexture(this, 'images/divine/front.jpg'),
            new CGFtexture(this, 'images/divine/left.jpg'),
            new CGFtexture(this, 'images/divine/right.jpg'),
            new CGFtexture(this, 'images/divine/top.jpg')
        ];

        this.lakeTexture = [
            new CGFtexture(this, 'images/lake/back.jpg'),
            new CGFtexture(this, 'images/lake/bottom.jpg'),
            new CGFtexture(this, 'images/lake/front.jpg'),
            new CGFtexture(this, 'images/lake/left.jpg'),
            new CGFtexture(this, 'images/lake/right.jpg'),
            new CGFtexture(this, 'images/lake/top.jpg')
        ];

        this.rainbowTexture = [
            new CGFtexture(this, 'images/rainbow/back.png'),
            new CGFtexture(this, 'images/rainbow/bottom.png'),
            new CGFtexture(this, 'images/rainbow/front.png'),
            new CGFtexture(this, 'images/rainbow/left.png'),
            new CGFtexture(this, 'images/rainbow/right.png'),
            new CGFtexture(this, 'images/rainbow/top.png')
        ];

        this.palaceTexture = [
            new CGFtexture(this, 'images/palace/back.png'),
            new CGFtexture(this, 'images/palace/bottom.png'),
            new CGFtexture(this, 'images/palace/front.png'),
            new CGFtexture(this, 'images/palace/left.png'),
            new CGFtexture(this, 'images/palace/right.png'),
            new CGFtexture(this, 'images/palace/top.png')
        ];


        this.textures = [this.worldTexture, this.aridTexture, this.divineTexture, this.lakeTexture, this.rainbowTexture, this.palaceTexture];
        this.textureIds = {
            'World': 0,
            'Arid': 1,
            'Divine': 2,
            'Lake': 3,
            'Rainbow': 4,
            'Palace': 5
        };
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        // More visibility to skybox
        this.lights[0].setAmbient(0.25, 0.25, 0.25, 1.0);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    //Function that applies a new texture selected in interface
    updateAppliedTexture() {
        this.cube.setNewTextures(this.textures[this.selectedTexture]);
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t) {
        this.checkKeys();
        this.vehicle.update();
    }
    initMaterials() {
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
        this.materialIDs = {
            'Default': 0,
            'Earth': 1
        };
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
        this.materials[this.selectedMaterial].apply();

        // ---- BEGIN Primitive drawing section
        if (this.displayCylinder)
            this.cylinder.display();

        //This sphere does not have defined texture coordinates
        if (this.displaySphere)
            this.sphere.display();

        if (this.displayVehicle) {
            this.pushMatrix();
            this.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
            this.vehicle.display();
            this.popMatrix();
        }

        if (this.displaySkyBox) {
            this.pushMatrix();
            this.scale(50, 50, 50);
            this.cube.display();
            this.popMatrix();
        }

        if (this.displayNormal) {
            this.cube.enableNormalViz();
            this.vehicle.enableNormalViz();
            this.sphere.enableNormalViz();
            this.cylinder.enableNormalViz();
        } else {
            this.cube.disableNormalViz();
            this.vehicle.disableNormalViz();
            this.sphere.disableNormalViz();
            this.cylinder.disableNormalViz();
        }
        // ---- END Primitive drawing section
    }
}