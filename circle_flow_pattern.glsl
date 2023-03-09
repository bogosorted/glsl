#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

vec2 Tiles(vec2 st, float amount)
{
    st *= amount;

    st.x += step(1.0, mod(st.y,2.0)) * step(0., cos(u_time)) * (sin(u_time)/2.0 -0.5 );
    st.y += step(1.0, mod(st.x,2.0)) * step(cos(u_time), 0.) * (sin(u_time)/2.0 -0.5 );

    return fract(st);
}

vec3 Circle(vec2 st, float size, vec2 global_st)
{
    vec2 to_center = st - 0.5 ; 
    float d = smoothstep(size / 4., (size  / 4.) + 0.01  , dot(to_center,to_center));
    vec3 color = (vec3(0,0,1) * (step(1., mod(global_st.x,2.0)) - 1.) * (step(1., mod(global_st.y,2.0)) -1.)) + d;
    
    return color;
}

void main(void){
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

    
    float tiles = 9.0;
    vec3 color = vec3(0.0);

    vec2 global_st = st * tiles;
    st = Tiles(st, tiles);

    color = vec3(Circle(st ,0.6, global_st));

    gl_FragColor = vec4(color,1.0);
}
