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
        this.state=SupplyStates.INACTIVE;

        this.posX = 0;
        this.posY = 0;
        this.posZ = 0;
        this.initialPosY = 0;
        this.accelaration = 9.8; //Constant for accelaration
        this.time = 0;
        this.initialTime = 0;

        this.quad = new MyUnitCubeQuad(scene);
        
        //No need for inactive textures because there will be nothing drawn
        this.landingTextures = [
            new CGFtexture(scene, 'images/world_texture/back.png'),
            new CGFtexture(scene, 'images/world_texture/bottom.png'),
            new CGFtexture(scene, 'images/world_texture/front.png'),
        ];
        this.fallingTextures = [
            new CGFtexture(scene, 'images/arid/back.jpg'),
            new CGFtexture(scene, 'images/arid/bottom.jpg'),
            new CGFtexture(scene, 'images/arid/front.jpg'),
        ];
        
	}
    drop(posX,posY,posZ){
        this.state = SupplyStates.FALLING;
        this.posX = posX;
        this.posY = posY - 0.7;
        this.initialPosY = this.posY;
        this.posZ = posZ;
        this.accelaration = 2*this.initialPosY/9;
        this.quad.setNewTextures(this.fallingTextures); //Isto podia estar no construtor da caixa
    }
    land(){
        if(this.posY <= 0.125){
            this.posY = 0.125;
            this.state=SupplyStates.LANDED;
            this.quad.setNewTextures(this.landingTextures);
        }
    }

    update(t){
        if(this.state == SupplyStates.INACTIVE){
            this.initialTime = t;
        }
        // Fazer a caixa cair a uma certa velocidade
        if(this.state == SupplyStates.FALLING){
            this.time = (t-this.initialTime)/1000;
            this.posY = -1/2*this.accelaration * this.time * this.time + this.initialPosY;
            this.land();
        }
    }
    reset(){
        this.state = SupplyStates.INACTIVE;
        this.posX = 0;
        this.posY = 0;
        this.posZ = 0;
        this.time = 0;
    }

    displayFalling(){
        this.scene.pushMatrix();
        this.scene.translate(this.posX,this.posY,this.posZ);
        this.scene.scale(1/4,1/4,1/4);
        this.quad.display();
        this.scene.popMatrix();
    }

    displayOnLanded(){
        this.scene.pushMatrix();
        this.scene.translate(this.posX,this.posY,this.posZ);
        this.scene.scale(1/4,1/4,1/4);
        this.quad.display();
        this.scene.popMatrix();
    }

    display() {
        switch (this.state) {
            case SupplyStates.INACTIVE:
                return;
                break;
            case SupplyStates.FALLING:
                this.displayFalling();
                break;
            case SupplyStates.LANDED:
                this.displayOnLanded();
                break;
            default:
                break;
        }
	}
}
