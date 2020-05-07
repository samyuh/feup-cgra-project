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
    float velocityFactor = velocity + 1.0;

    float defaultOndulation = 0.1 * sin(timeFactor * velocityFactor * 0.1 + aVertexPosition.x * 20.0);

    vec3 offset = vec3(0.0, 0.0, defaultOndulation);

    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);

    vTextureCoord = aTextureCoord;
}