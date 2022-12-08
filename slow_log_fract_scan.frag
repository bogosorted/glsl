#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

void main() {

    vec2 st = gl_FragCoord.xy/u_resolution;

    float y = fract(log(st.y + u_time ));

    vec3 color = vec3(0,sin(y),0);

    float pct = plot(st,y);
    color = (1.0-pct)*color+pct*vec3(0,sin(u_time),0);

    gl_FragColor = vec4(color,1.0);
}
