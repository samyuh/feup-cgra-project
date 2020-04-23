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
        this.posY = 2;
        this.posZ = 0;
        this.velocity = 0;

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
        this.posZ = posZ;
        this.quad.setNewTextures(this.fallingTextures); //Isto poia estar no construtor da caixa
    }
    land(){
        if(this.posY <= 0.125){
            this.state=SupplyStates.LANDED;
            this.quad.setNewTextures(this.landingTextures);
        }
    }

    update(){
        // Fazer a caixa cair a uma certa velocidade
        if(this.state == SupplyStates.FALLING){
            this.posY -= 0.01;
            this.land();
        }
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
