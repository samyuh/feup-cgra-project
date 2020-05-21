/**
 * Struct for current state of the supply box
 */
const SupplyStates = {
    INACTIVE: 0,
    FALLING: 1,
    LANDED: 2
};

/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {
    constructor(scene) {
        super(scene);

        this.state = SupplyStates.INACTIVE;

        // -- Objets
        this.quad = new MyUnitCubeQuad(scene);
        this.side = new MyQuad(scene);

        // -- Supply Position
        this.posX = 0;
        this.posY = 0;
        this.initialPosY = 0;
        this.posZ = 0;

        // -- Supply Velocity
        this.velocityX = 0;
        this.velocityZ = 0;

        // -- Supply Acceleration
        this.acceleration = 0;

        // -- Time
        this.initialTime = 0;
        this.time = 0;

        // -- Supply rotation angle and scale
        this.rot = 0;
        this.rescale = 1;

        //-- Falling Cube Textures
        var fallingTextures = [
            new CGFtexture(scene, 'textures/zeppellin/cube.png'),
            new CGFtexture(scene, 'textures/zeppellin/cube.png'),
            new CGFtexture(scene, 'textures/zeppellin/cube.png'),
        ];

        this.quad.setNewTextures(fallingTextures);

        // -- Ground Textures
        this.boxGroundMaterial = new CGFappearance(scene);
        this.boxGroundMaterial.setAmbient(1, 1, 1, 1);
        this.boxGroundMaterial.setDiffuse(1, 1, 1, 1);
        this.boxGroundMaterial.setSpecular(1, 1, 1, 1);
        this.boxGroundMaterial.setShininess(5.0);
        this.boxGroundMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.boxGroundMaterial.setTexture(new CGFtexture(scene, 'textures/zeppellin/cube.png'));

        // -- Boxes will always fall on a pentagon like form with:
        // Random rotations
        this.rotations = [Math.random(), Math.random(), Math.random(), Math.random(), Math.random(), Math.random()]
    }

    /**
     * Distances are only created after drop because they depend on the Vehicle Scale Factor
     */
    createDistances() {
        this.distances = [
            this.rescale * (Math.random() % 1 + 1 / 2),
            this.rescale * (Math.random() % 1 + 1 / 2),
            this.rescale * (Math.random() % 1 + 1 / 2),
            this.rescale * (Math.random() % 1 + 1 / 2),
            this.rescale * (Math.random() % 1 + 1 / 2)
        ]
    }

    /**
     * Calculates a random position for the box indicated by index
     * @param {number} index index of this.distances 
     * @returns array with the parametres of scene.translate() CGF function
     */
    breakBox(index) {
        return [
            this.posX + this.distances[index] * Math.cos(2 * (index + 1) * Math.PI / 5 + this.distances[index] / 5.0),
            this.posY,
            this.posZ + this.distances[index] * Math.sin(2 * (index + 1) * Math.PI / 5 + this.distances[index] / 5.0)
        ];
    }

    /**
     * Drops the supply crate with a certain position, velocity and angle.
     * Also changes the supply state to FALLING
     * @param {number} posX vehicle position in the x axis
     * @param {number} posY vehicle position in the y axis (default value should be 10)
     * @param {number} posZ vehicle position in the z axis
     * @param {number} scale vehicle scale factor
     * @param {number} velocity vehicle velocity
     * @param {number} angle  vehicle angle with the y axis
     */
    drop(posX, posY, posZ, scale, velocity, angle) {
        this.state = SupplyStates.FALLING;
        this.posX = posX;
        this.posY = posY - 0.7 * scale;
        this.initialPosY = this.posY;
        this.posZ = posZ;
        this.acceleration = 2 * (this.posY + 0.125 * this.rescale) / 9;
        this.velocityX = velocity * Math.sin(angle) * 0.4;
        this.velocityZ = velocity * Math.cos(angle) * 0.4;
        this.rot = angle;
        this.rescale = scale;
    }

    /**
     * Changes the SupplyBox state if it hits the ground
     */
    land() {
        if (this.posY <= 0.125 * this.rescale) {
            this.posY = 0.01;
            this.createDistances();
            this.state = SupplyStates.LANDED;
        }
    }

    /**
     * Resets the object's attributes to its default state
     */
    reset() {
        this.state = SupplyStates.INACTIVE;
        this.posX = 0;
        this.posY = 0;
        this.posZ = 0;
        this.time = 0;
    }

    /**
     * Updates the box position and state, if needed
     * @param {number} t current time of the program, in ms
     */
    update(t) {
        // Reseting the initial time until drop
        if (this.state == SupplyStates.INACTIVE) {
            this.initialTime = t;
        }
        // Drop the box at a certain speed with a certain size
        else if (this.state == SupplyStates.FALLING) {
            this.time = (t - this.initialTime) / 1000;
            this.posX += this.velocityX;
            this.posY = -1 / 2 * this.acceleration * this.time * this.time + this.initialPosY;
            this.posZ += this.velocityZ;
            this.land();
        }
    }

    /**
     * Displays the box when its state equals SupplyStates.FALLING
     */
    displayFalling() {
        this.scene.pushMatrix();
        this.scene.translate(this.posX, this.posY, this.posZ);
        this.scene.scale(1 / 4 * this.rescale, this.rescale * 1 / 4, this.rescale * 1 / 4);
        this.scene.rotate(this.rot, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
    }

    /**
     * Displays the box when its state equals SupplyStates.LANDED
     */
    displayLanded() {
        this.boxGroundMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.posX, this.posY, this.posZ);
        this.scene.scale(1 / 4, 1 / 4, 1 / 4);
        this.scene.rotate(this.rotations[0], 0, 1, 0);
        this.scene.scale(this.rescale, this.rescale, this.rescale);
        this.scene.rotate(3 * Math.PI / 2, 1, 0, 0);
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(...this.breakBox(0));
        this.scene.scale(1 / 4, 1 / 4, 1 / 4);
        this.scene.rotate(this.rotations[1], 0, 1, 0);
        this.scene.scale(this.rescale, this.rescale, this.rescale);
        this.scene.rotate(3 * Math.PI / 2, 1, 0, 0);
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(...this.breakBox(1));
        this.scene.scale(1 / 4, 1 / 4, 1 / 4);
        this.scene.rotate(this.rotations[2], 0, 1, 0);
        this.scene.scale(this.rescale, this.rescale, this.rescale);
        this.scene.rotate(3 * Math.PI / 2, 1, 0, 0);
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(...this.breakBox(2));
        this.scene.scale(1 / 4, 1 / 4, 1 / 4);
        this.scene.rotate(this.rotations[3], 0, 1, 0);
        this.scene.scale(this.rescale, this.rescale, this.rescale);
        this.scene.rotate(3 * Math.PI / 2, 1, 0, 0);
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(...this.breakBox(3));
        this.scene.scale(1 / 4, 1 / 4, 1 / 4);
        this.scene.rotate(this.rotations[4], 0, 1, 0);
        this.scene.scale(this.rescale, this.rescale, this.rescale);
        this.scene.rotate(3 * Math.PI / 2, 1, 0, 0);
        this.side.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(...this.breakBox(4));
        this.scene.scale(1 / 4, 1 / 4, 1 / 4);
        this.scene.rotate(this.rotations[5], 0, 1, 0);
        this.scene.scale(this.rescale, this.rescale, this.rescale);
        this.scene.rotate(3 * Math.PI / 2, 1, 0, 0);
        this.side.display();
        this.scene.popMatrix();
    }
    
    /**
     * Evaluates the currunet SupplyState and calls a display function accordingly
     */
    display() {
        switch (this.state) {
            case SupplyStates.INACTIVE:
                return;
            case SupplyStates.FALLING:
                this.displayFalling();
                return;
            case SupplyStates.LANDED:
                this.displayLanded();
                return;
            default:
                return;
        }
    }
}