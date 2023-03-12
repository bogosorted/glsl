#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

float rand(vec2 pos){
    return fract(sin(dot(pos.xy, vec2(12.9898,78.233))) * 43758.);
}
float random (in float x) {
    return fract(sin(x)*1e4);
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(0.0);

    float tiles_y = 750.0;
    float tiles_x = 200.0;
    vec2 global_st = st * tiles_y;
    st.y = fract(st.y * tiles_y);
        
    float rng = step(0.2,rand(vec2(floor(st.x* tiles_x) + floor( pow((-1.),floor(global_st.y))* u_time *20.), floor(global_st.y))));
    
    color = vec3(rng);

    gl_FragColor = vec4(color, 1.0);
}
