#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform float suppliesDelivered;

void main() {
    const float divisions = 5.0;
    vec4 color = vec4(0.0,0.0,0.0,1.0);

    if(suppliesDelivered > vTextureCoord.x)
        color = vec4(1.0-vTextureCoord.x,vTextureCoord.x,0,1.0);
    else
        color = vec4(0.5,0.5,0.5,1.0);
    
    gl_FragColor = color;
}