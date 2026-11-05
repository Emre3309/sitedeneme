'use strict';
(() => {
  const canvas = document.getElementById('ring-canvas');
  const panel = canvas?.closest('.hero-art');
  if (!canvas || !panel) return;
  let gl;
  try { gl = canvas.getContext('webgl', { alpha: true, antialias: true, powerPreference: 'low-power' }); } catch { return; }
  if (!gl) return; // Keep the original CSS illustration on unsupported devices.
  const motion = document.getElementById('motion-on');
  const initial = { yaw: -0.42, pitch: 0.52 };
  let yaw = initial.yaw, pitch = initial.pitch;
  let frame = 0, previous = 0, visible = true, lost = false, dragging = null;
  let resources;
  const identity = () => new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
  function multiply(a, b) {
    const out = new Float32Array(16);
    for (let column = 0; column < 4; column++) for (let row = 0; row < 4; row++) {
      for (let k = 0; k < 4; k++) out[column * 4 + row] += a[k * 4 + row] * b[column * 4 + k];
    }
    return out;
  }
  function rotation(y, x) {
    const cy = Math.cos(y), sy = Math.sin(y), cx = Math.cos(x), sx = Math.sin(x);
    return multiply(new Float32Array([cy,0,-sy,0, 0,1,0,0, sy,0,cy,0, 0,0,0,1]), new Float32Array([1,0,0,0, 0,cx,sx,0, 0,-sx,cx,0, 0,0,0,1]));
  }
  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); throw new Error('Shader unavailable'); }
    return shader;
  }
  function build() {
    const vertex = compile(gl.VERTEX_SHADER, `
      attribute vec3 aPosition; attribute vec3 aNormal;
      uniform mat4 uModel; uniform mat4 uVP;
      varying vec3 vNormal; varying vec3 vPosition;
      void main(){ vec4 world=uModel*vec4(aPosition,1.0); vPosition=world.xyz; vNormal=mat3(uModel)*aNormal; gl_Position=uVP*world; }
    `);
    const fragment = compile(gl.FRAGMENT_SHADER, `
      precision mediump float;
      varying vec3 vNormal; varying vec3 vPosition;
      uniform vec3 uEye; uniform float uUnlit;
      void main(){
        if(uUnlit>0.5){gl_FragColor=vec4(0.45,0.62,1.0,0.40);return;}
        vec3 N=normalize(vNormal); vec3 V=normalize(uEye-vPosition);
        vec3 L=normalize(vec3(-0.5,0.85,1.1)); vec3 H=normalize(L+V);
        float diffuse=max(dot(N,L),0.0);
        float fill=max(dot(N,normalize(vec3(0.9,-0.6,0.3))),0.0);
        float specular=pow(max(dot(N,H),0.0),72.0);
        float rim=pow(1.0-max(dot(N,V),0.0),3.0);
        vec3 color=vec3(0.075,0.17,0.68)*(0.23+diffuse*0.85+fill*0.25);
        color+=vec3(0.76,0.86,1.0)*specular*0.9+vec3(0.16,0.28,0.7)*rim*0.35;
        gl_FragColor=vec4(pow(color,vec3(0.4545)),1.0);
      }
    `);
    const program = gl.createProgram();
    gl.attachShader(program, vertex); gl.attachShader(program, fragment); gl.linkProgram(program);
    gl.deleteShader(vertex); gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Renderer unavailable');
    const positions = [], normals = [], indices = [], segments = 96, sides = 32;
    for (let i = 0; i <= segments; i++) for (let j = 0; j <= sides; j++) {
      const u = i / segments * Math.PI * 2, v = j / sides * Math.PI * 2;
      const c = Math.cos(v), s = Math.sin(v), cu = Math.cos(u), su = Math.sin(u);
      positions.push((1.02 + 0.34 * c) * cu, (1.02 + 0.34 * c) * su, 0.34 * s);
      normals.push(c * cu, c * su, s);
      if (i < segments && j < sides) { const a = i * (sides + 1) + j, b = a + sides + 1; indices.push(a,b,a+1, b,b+1,a+1); }
    }
    function buffer(target, data) { const result = gl.createBuffer(); gl.bindBuffer(target,result); gl.bufferData(target,data,gl.STATIC_DRAW); return result; }
    const mesh = { position:buffer(gl.ARRAY_BUFFER,new Float32Array(positions)), normal:buffer(gl.ARRAY_BUFFER,new Float32Array(normals)), index:buffer(gl.ELEMENT_ARRAY_BUFFER,new Uint16Array(indices)), count:indices.length };
    const orbit = [], orbitNormals = [];
    for (let i = 0; i < 180; i++) { const a = i / 180 * Math.PI * 2; orbit.push(Math.cos(a)*1.68,Math.sin(a)*1.68,0);orbitNormals.push(0,0,1); }
    const lines = { position:buffer(gl.ARRAY_BUFFER,new Float32Array(orbit)), normal:buffer(gl.ARRAY_BUFFER,new Float32Array(orbitNormals)), count:180 };
    return { program, mesh, lines, position:gl.getAttribLocation(program,'aPosition'), normal:gl.getAttribLocation(program,'aNormal'), model:gl.getUniformLocation(program,'uModel'), vp:gl.getUniformLocation(program,'uVP'), eye:gl.getUniformLocation(program,'uEye'), unlit:gl.getUniformLocation(program,'uUnlit') };
  }
  function fallback() {
    panel.classList.remove('is-3d-ready');
    canvas.tabIndex = -1;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  }
  function ready() {
    try { resources = build(); } catch { fallback(); return false; }
    panel.classList.add('is-3d-ready');
    canvas.tabIndex = 0;
    return true;
  }
  if (!ready()) return;
  function draw() {
    const box = canvas.getBoundingClientRect();
    if (!box.width || !box.height) return;
    const ratio = Math.min(devicePixelRatio || 1, 1.75);
    const width = Math.round(box.width * ratio), height = Math.round(box.height * ratio);
    if (canvas.width !== width || canvas.height !== height) { canvas.width = width; canvas.height = height; }
    gl.viewport(0,0,width,height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
    const aspect = width / height, eyeZ = aspect < 1 ? 6.0 : 4.8, f = 1 / Math.tan(42 * Math.PI / 360);
    const projection = new Float32Array([f/aspect,0,0,0, 0,f,0,0, 0,0,-1.004,-1, 0,0,-0.2004,0]);
    const view = identity(); view[14] = -eyeZ;
    const r = resources; gl.useProgram(r.program);gl.uniformMatrix4fv(r.vp,false,multiply(projection,view));gl.uniform3f(r.eye,0,0,eyeZ);
    function bind(mesh) {
      gl.bindBuffer(gl.ARRAY_BUFFER,mesh.position);gl.enableVertexAttribArray(r.position);gl.vertexAttribPointer(r.position,3,gl.FLOAT,false,0,0);
      gl.bindBuffer(gl.ARRAY_BUFFER,mesh.normal);gl.enableVertexAttribArray(r.normal);gl.vertexAttribPointer(r.normal,3,gl.FLOAT,false,0,0);
    }
    bind(r.mesh);gl.uniformMatrix4fv(r.model,false,rotation(yaw,pitch));gl.uniform1f(r.unlit,0);gl.depthMask(true);gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER,r.mesh.index);gl.drawElements(gl.TRIANGLES,r.mesh.count,gl.UNSIGNED_SHORT,0);
    bind(r.lines);gl.uniform1f(r.unlit,1);gl.depthMask(false);
    gl.uniformMatrix4fv(r.model,false,rotation(yaw*0.3+0.9,pitch*0.3+1.05));gl.drawArrays(gl.LINE_LOOP,0,r.lines.count);
    gl.uniformMatrix4fv(r.model,false,rotation(yaw*0.3-0.9,pitch*0.3-1.05));gl.drawArrays(gl.LINE_LOOP,0,r.lines.count);gl.depthMask(true);
    canvas.dataset.rotation = `${yaw.toFixed(4)},${pitch.toFixed(4)}`;
  }
  function tick(time) {
    frame = 0;
    if (lost || !visible || document.hidden) { previous = 0; return; }
    const delta = previous ? Math.min(time-previous,50) : 0; previous = time;
    if (motion.checked && !dragging) yaw += delta * 0.00012;
    draw();
    if (motion.checked) schedule();
  }
  function schedule() { if (!frame && !lost && visible && !document.hidden) frame = requestAnimationFrame(tick); }
  function reset() { yaw=initial.yaw;pitch=initial.pitch;previous=0;schedule(); }
  canvas.addEventListener('pointerdown', event => {
    if (!event.isPrimary || (event.pointerType === 'mouse' && event.button !== 0)) return;
    dragging = { id:event.pointerId,x:event.clientX,y:event.clientY };
    canvas.classList.add('pointer-focus');
    canvas.setPointerCapture(event.pointerId);canvas.classList.add('is-dragging');canvas.focus({preventScroll:true});
  });
  canvas.addEventListener('pointermove', event => {
    if (!dragging || dragging.id !== event.pointerId) return;
    yaw += (event.clientX-dragging.x)*0.009;
    pitch += (event.clientY-dragging.y)*0.009;
    dragging.x=event.clientX;dragging.y=event.clientY;schedule();
  });
  function release(event) { if (dragging && dragging.id===event.pointerId) { dragging=null;canvas.classList.remove('is-dragging');previous=0;schedule(); } }
  canvas.addEventListener('pointerup',release);canvas.addEventListener('pointercancel',release);canvas.addEventListener('lostpointercapture',release);
  canvas.addEventListener('blur',()=>canvas.classList.remove('pointer-focus'));
  canvas.addEventListener('keydown',event => {
    canvas.classList.remove('pointer-focus');
    if (!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(event.key)) return;
    event.preventDefault();
    if(event.key==='Home'){reset();return;}
    if(event.key==='ArrowLeft')yaw-=0.15;if(event.key==='ArrowRight')yaw+=0.15;if(event.key==='ArrowUp')pitch-=0.15;if(event.key==='ArrowDown')pitch+=0.15;
    schedule();
  });
  document.getElementById('ring-reset').addEventListener('click',reset);
  motion.addEventListener('change',()=>{previous=0;schedule();});
  document.addEventListener('visibilitychange',()=>{previous=0;if(document.hidden){cancelAnimationFrame(frame);frame=0;}else schedule();});
  if ('IntersectionObserver' in window) new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;previous=0;if(visible)schedule();else{cancelAnimationFrame(frame);frame=0;}},{threshold:0}).observe(panel);
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(canvas); else window.addEventListener('resize',schedule);
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();lost=true;fallback();});
  canvas.addEventListener('webglcontextrestored',()=>{lost=false;previous=0;if(ready())schedule();});
  schedule();
})();
