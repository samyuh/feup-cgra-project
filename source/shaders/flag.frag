#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D flagTex;

void main() {
  vec4 color = texture2D(flagTex, vTextureCoord);

  gl_FragColor =  color;

}