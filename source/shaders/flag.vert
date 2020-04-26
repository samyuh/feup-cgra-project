attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

uniform sampler2D flagTex;
uniform sampler2D flagMap;
uniform float velocity;
uniform float timeFactor;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

void main() {
    vec3 offset = vec3(0.0,0.0,0.0);
    vec4 filter = texture2D(flagMap, aTextureCoord + timeFactor*(0.01, 0.01));
    
    offset = aVertexNormal * filter.b * 0.1;

	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

	vTextureCoord = aTextureCoord;
}