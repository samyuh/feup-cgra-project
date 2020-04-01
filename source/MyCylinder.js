/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Reference to number of sides of Cylinder
 */
class MyCylinder extends CGFobject {
  	constructor(scene, slices) {
  		super(scene);
      this.slices = slices;
  		this.initBuffers();
  	}

  	initBuffers() {
      this.vertices = [0, 0, 0]; // Base Center
      this.normals = [0, -1, 0]; // Bas Normal -> If Base is necessary do it for each vertice at base
      this.texCoords = [];

      var amplitude = (2 * Math.PI)/this.slices;
      var angle = 0;
      var inc = 1;

      for (var i = 0; i < this.slices; i++) {
          var x = Math.cos(angle);
          var z = Math.sin(angle);

          // Base of Cylinder
          this.vertices.push(x);
          this.vertices.push(0);
          this.vertices.push(z);

          // Top of Cylinder
          this.vertices.push(x);
          this.vertices.push(1);
          this.vertices.push(z);

          // cos^2 (x) + sin^2 (x) = 1, so normal is unitary
          this.normals.push(Math.cos(angle), 0, Math.sin(angle));
          this.normals.push(Math.cos(angle), 0, Math.sin(angle));

          /*  0 ----------- 1
           *  |
           *  |
           *  |
           *  |
           *  1
           *  To map a texture, each side will have 1/this.slices
           * */
          this.texCoords.push(i/this.slices, 1);
          this.texCoords.push(i/this.slices, 0);

          angle += amplitude;
      }

      this.indices = [];

      for (var i = 0; i < this.slices * 2; i = i+2) {
          // Cylinder bot view -> Is this necessary?
          this.indices.push(1 + (i+2) % (this.slices * 2));
          this.indices.push(0);
          this.indices.push(1 + i);

          this.indices.push(1 + i % (this.slices * 2));
          this.indices.push(1 + (i + 1) % (this.slices * 2));
          this.indices.push(1 + (i + 2) % (this.slices * 2));

          this.indices.push(1 + (i + 3) % (this.slices * 2));
          this.indices.push(1 + (i + 2) % (this.slices * 2));
          this.indices.push(1 + (i + 1) % (this.slices * 2));
      }

  		this.primitiveType = this.scene.gl.TRIANGLES;
  		this.initGLBuffers();
  	}
}
