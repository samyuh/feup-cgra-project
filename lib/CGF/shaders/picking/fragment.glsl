#version 300 es
precision highp float;

in vec4 vFinalColor;
out vec4 fragColor;

void main() {
	fragColor = vFinalColor;	
}