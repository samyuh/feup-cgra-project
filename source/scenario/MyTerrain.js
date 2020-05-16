/**
 * MyTerrain
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTerrain extends CGFobject {
        constructor(scene) {
                super(scene);

                this.plane = new MyPlane(scene, 50);

                this.terrainShader = new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");

                
        }

        updateTextures(textures) {
                this.terrainTex = textures[0];
                this.terrainMap = textures[1];

                this.terrainShader.setUniformsValues({ terrainTex: 0 });
                this.terrainShader.setUniformsValues({ terrainMap: 1 });
        }

        /**
         * Displays the terrain in a certain position
         */
        display() {
                this.scene.pushMatrix();
                this.scene.setActiveShader(this.terrainShader);
                this.terrainTex.bind(0);
                this.terrainMap.bind(1);
                this.scene.scale(50, 50, 50);
                this.scene.rotate(-Math.PI / 2, 1, 0, 0);
                this.plane.display();
                this.scene.setActiveShader(this.scene.defaultShader);
                this.scene.popMatrix();
        }
}