#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    vec2 wh = vec2(0.0,0.0);
    float velocity = 1.;

    float wavy = sin(st.x  * 4. + u_time * velocity)/10. + 0.35;
    float wavy_y = sin(st.y  * 2. + u_time * velocity)/30. + 0.35;

    wh.y = smoothstep(wavy,wavy +0.03 ,st.y);
    wh.x = smoothstep(wavy_y +0.1 ,wavy_y + 0.107 , st.x);
  
    float pct = wh.x * wh.y;
    
    vec2 sh = smoothstep(vec2(0.0),vec2(0.1) + 0.5,1.0- st);
    pct *= sh.x * sh.y;

    color = vec3(pct,pct,pct);

    gl_FragColor = vec4(color,1.0);
}
