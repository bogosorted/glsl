
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123 + u_time );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;

    float tiles = 50.;
    float rng = floor(random(st)* 50.);
    float rnd = mix(random(floor((st * tiles))), random(floor((st * 500.))), 0.5);
 

    gl_FragColor = vec4(vec3(rnd),1.0);
}
