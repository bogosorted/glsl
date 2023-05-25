#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
float rand(vec2 pos){
    return fract(sin(dot(pos.xy, vec2(12312,12.))) * 123123.);
}
vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    vec2 u = f*f*(3.0-2.0*f);

    return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
                     dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
                mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
                     dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    vec3 color = vec3(.0);

    vec2 cells[7];
	 cells[0] = u_mouse/u_resolution;
    cells[1] = vec2(0.8,0.217) - sin(u_time)/400.;
    cells[3] =  vec2(0.5,0.4) + sin(u_time)/1200.;
    cells[4] =  vec2(0.2,0.93)- sin(u_time)/355.;
    cells[5] =  vec2(0.8,0.9) + sin(u_time)/250.;
	cells[6] =  vec2(0.0,0.456) + sin(u_time)/250.;

    float r = 1.;
	float oldr = r; 
	int cella;

    for (int i = 0; i < 7; i++) {
        float dist = distance(st, cells[i]);
        r = min(r, dist);
		cella = oldr != r? i: cella;
		oldr = r;
    }
	
    color += (sin(r * 6.) + pow(fract(-r*4. /0.1),404.) * r * 4.);
	color *= pow((1. -r * 2.),1.) * vec3(1.0, 1.0, 1.0);
	color += max(noise(float(cella) *sin(u_time * rand(vec2(cella)))* rand(vec2(cella)) /5.0 + st  * 4.)*0.8 + 0.8,0.54) * vec3(0.4745, 0.0, 0.8863) * 0.8 + (1.- r*7.)/2.;
	color *= max(rand(st),0.899);
	color += max(rand(st),0.0111)/8.;
	color *=  1.+step(rand(st*0.1),.0001);


    gl_FragColor = vec4(color,1.);
}
