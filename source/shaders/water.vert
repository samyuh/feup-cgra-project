attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;
uniform sampler2D waterMap;
uniform sampler2D waterTex;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

void main() {
    vec3 offset = vec3(0.0, 0.0, 0.0);

    vec4 filter = texture2D(waterMap, aTextureCoord);
    offset = aVertexNormal * filter.b * 0.1;

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
    vTextureCoord = aTextureCoord;
}
