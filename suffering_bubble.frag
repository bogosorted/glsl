
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
#define PI 3.1415

float random (float st) {
    return fract(sin(st * 12.9898 * 437.5453123  + u_time/10000.));
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
      st.x *= u_resolution.x/u_resolution.y;

    float tiles = 30.;

    vec2 pos = vec2(0.5) - st;
    float d = length(pos);
    float a = (atan(pos.y,pos.x) + PI)/(2.*PI);

    st.x = st.x * tiles; 
    
    float pixels_x =40.;
    float i = floor(st.x);
    float periods = fract(st.x);

    float rnd = mix(random(i + floor(u_time * 20.)),random(i + 1. + floor(u_time * 20.)),floor(periods * pixels_x)/ pixels_x);
    d += rnd/220. * abs(sin(u_time * 1.)/1.);
    float polar = smoothstep(d,d + 0.002 , 0.25);
   

    gl_FragColor = vec4(vec3(polar ),1.0);
}
