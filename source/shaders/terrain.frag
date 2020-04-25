#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D terrainMap;
uniform sampler2D terrainTex;

void main() {
  vec4 color = texture2D(terrainTex, vTextureCoord);

  gl_FragColor =  color;

}