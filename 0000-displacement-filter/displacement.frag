void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
	vec2 uv = fragCoord.xy / iResolution.xy;
	float displace = (texture(iChannel1, uv.xy).x * 2.0 - 1.0) * 0.005;
	vec3 tex = texture(iChannel0, uv.xy + vec2(displace, 1.0-displace)).xyz;
	fragColor = vec4(tex, 1.0);
}
