#ifdef GL_ES
precision highp float;
#endif
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 orange = vec3(221, 123, 52)/255.0;
vec3 sky_blue = vec3(6, 57, 203)/255.0;

void main() {

    vec2 st = gl_FragCoord.xy / u_resolution;
    float pct = sin(u_time * 2.0) /2. + 1.0 / 2.0;
    pct = pow(smoothstep(0.0 ,1.0 , st.y), 0.5);
    vec3 sky_orange = orange + vec3(1, 0.45, 0) *sin(1.0 * st.y + u_time);
    gl_FragColor = vec4(mix(sky_blue, sky_orange, pct),1.0);

}