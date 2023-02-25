#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

void main(){
	vec2 st = gl_FragCoord.xy/u_resolution;
    float pct = 0.0;
	float a = 10700.588 + u_time * .32;
    vec3 b = vec3(0.995,0.022,0.137);
	 vec3 c = vec3(1.000,0.709,0.323);
    vec3 d = mix(b,c,st.x);

    pct = step(sin(st.y)*sin(st.x),sin((st.y * a)/st.x)) * sin(st.x) - 0.132 ;


    vec3 color = vec3(pct);

	gl_FragColor = vec4( color * d, 1.0 );
}