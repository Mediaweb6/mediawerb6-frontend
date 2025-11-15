import React, { useEffect, useRef, useCallback } from 'react';

// --- Configuration Object (from your JS) ---
const config = {
    TEXTURE_DOWNSAMPLE: 1,
    DENSITY_DISSIPATION: 0.98,
    VELOCITY_DISSIPATION: 0.99,
    PRESSURE_DISSIPATION: 0.8,
    PRESSURE_ITERATIONS: 25,
    CURL: 30,
    SPLAT_RADIUS: 0.005,
};

// Simplified Pointer Prototype for TypeScript/Modern JS
class Pointer {
    id: number = -1;
    x: number = 0;
    y: number = 0;
    dx: number = 0;
    dy: number = 0;
    down: boolean = false;
    moved: boolean = false;
    color: number[] = [30, 0, 300];
}

// Global variables for WebGL state (managed within the component's effect)
let gl: WebGLRenderingContext | WebGL2RenderingContext | null = null;
let ext: any = null;
let support_linear_float: any = null;
let textureWidth = 0;
let textureHeight = 0;
let density: any = null;
let velocity: any = null;
let divergence: any = null;
let curl: any = null;
let pressure: any = null;
let lastTime = Date.now();
const pointers: Pointer[] = [new Pointer()];
const splatStack: number[] = [];

// Helper structure for Double Framebuffer Objects (FBOs)
type FBO = [WebGLTexture, WebGLFramebuffer, number];
interface DoubleFBO {
    first: FBO;
    second: FBO;
    swap: () => void;
}

// Simplified GL Program Class
class GLProgram {
    uniforms: { [key: string]: WebGLUniformLocation | null } = {};
    program: WebGLProgram;

    constructor(vertexShader: WebGLShader, fragmentShader: WebGLShader) {
        if (!gl) throw new Error("WebGL context not available.");
        this.program = gl.createProgram()!;

        gl.attachShader(this.program, vertexShader);
        gl.attachShader(this.program, fragmentShader);
        gl.linkProgram(this.program);

        if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
            throw gl.getProgramInfoLog(this.program);
        }

        const uniformCount = gl.getProgramParameter(this.program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++) {
            const uniformName = gl.getActiveUniform(this.program, i)!.name;
            this.uniforms[uniformName] = gl.getUniformLocation(this.program, uniformName);
        }
    }

    bind() {
        if (gl) gl.useProgram(this.program);
    }
}

// Function to get the GL context (from your JS)
function getWebGLContext(canvas: HTMLCanvasElement) {
    const params = { alpha: false, depth: false, stencil: false, antialias: false };
    let context: WebGLRenderingContext | WebGL2RenderingContext | null = canvas.getContext('webgl2', params);
    const isWebGL2 = !!context;

    if (!isWebGL2) {
        context = canvas.getContext('webgl', params) || canvas.getContext('experimental-webgl', params);
    }

    if (!context) throw new Error("WebGL not supported");

    gl = context;
    let halfFloat: any = null;
    let supportLinearFloat: any = null;

    if (!isWebGL2) {
        halfFloat = gl.getExtension('OES_texture_half_float');
        supportLinearFloat = gl.getExtension('OES_texture_half_float_linear');
    } else {
        gl.getExtension('EXT_color_buffer_float');
        supportLinearFloat = gl.getExtension('OES_texture_float_linear');
    }

    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    const internalFormat = isWebGL2 ? gl.RGBA16F : gl.RGBA;
    const internalFormatRG = isWebGL2 ? gl.RG16F : gl.RGBA;
    const formatRG = isWebGL2 ? gl.RG : gl.RGBA;
    const texType = isWebGL2 ? gl.HALF_FLOAT : (halfFloat as any)?.HALF_FLOAT_OES;

    return {
        gl: gl,
        ext: {
            internalFormat,
            internalFormatRG,
            formatRG,
            texType
        },
        support_linear_float: supportLinearFloat
    };
}

// Function to compile Shaders (from your JS)
function compileShader(type: number, source: string): WebGLShader {
    if (!gl) throw new Error("WebGL context not available.");
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw gl.getShaderInfoLog(shader);
    }
    return shader;
}

// Simplified blit function (using only global 'gl')
const blit = (function () {
    let initialized = false;
    let buffer: WebGLBuffer | null = null;
    let elementBuffer: WebGLBuffer | null = null;

    return function (destination: WebGLFramebuffer | null) {
        if (!gl) return;

        if (!initialized) {
            buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
            elementBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementBuffer);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
            gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(0);
            initialized = true;
        }

        gl.bindFramebuffer(gl.FRAMEBUFFER, destination);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };
})();

// Function to create an FBO (from your JS)
function createFBO(texId: number, w: number, h: number, internalFormat: number, format: number, type: number, param: number): FBO {
    if (!gl) throw new Error("WebGL context not available.");
    gl.activeTexture(gl.TEXTURE0 + texId);
    const texture = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

    const fbo = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    gl.viewport(0, 0, w, h);
    gl.clear(gl.COLOR_BUFFER_BIT);

    return [texture, fbo, texId];
}

// Function to create a Double FBO (from your JS)
function createDoubleFBO(texId: number, w: number, h: number, internalFormat: number, format: number, type: number, param: number): DoubleFBO {
    let fbo1 = createFBO(texId, w, h, internalFormat, format, type, param);
    let fbo2 = createFBO(texId + 1, w, h, internalFormat, format, type, param);

    return {
        get first() { return fbo1; },
        get second() { return fbo2; },
        swap: function () {
            const temp = fbo1;
            fbo1 = fbo2;
            fbo2 = temp;
        }
    };
}

// Function to initialize Framebuffers (from your JS)
function initFramebuffers(canvas: HTMLCanvasElement) {
    if (!gl || !ext) return;

    textureWidth = gl.drawingBufferWidth >> config.TEXTURE_DOWNSAMPLE;
    textureHeight = gl.drawingBufferHeight >> config.TEXTURE_DOWNSAMPLE;

    const iFormat = ext.internalFormat;
    const iFormatRG = ext.internalFormatRG;
    const formatRG = ext.formatRG;
    const texType = ext.texType;

    density = createDoubleFBO(0, textureWidth, textureHeight, iFormat, gl.RGBA, texType, support_linear_float ? gl.LINEAR : gl.NEAREST);
    velocity = createDoubleFBO(2, textureWidth, textureHeight, iFormatRG, formatRG, texType, support_linear_float ? gl.LINEAR : gl.NEAREST);
    divergence = createFBO(4, textureWidth, textureHeight, iFormatRG, formatRG, texType, gl.NEAREST);
    curl = createFBO(5, textureWidth, textureHeight, iFormatRG, formatRG, texType, gl.NEAREST);
    pressure = createDoubleFBO(6, textureWidth, textureHeight, iFormatRG, formatRG, texType, gl.NEAREST);

    // Initial clear
    clearProgram.bind();
    gl.uniform1i(clearProgram.uniforms.uTexture, pressure.first[2]);
    gl.uniform1f(clearProgram.uniforms.value, 0);
    blit(pressure.second[1]);
    pressure.swap();
}

// Shader Programs (initialized later)
let clearProgram: GLProgram;
let displayProgram: GLProgram;
let splatProgram: GLProgram;
let advectionProgram: GLProgram;
let divergenceProgram: GLProgram;
let curlProgram: GLProgram;
let vorticityProgram: GLProgram;
let pressureProgram: GLProgram;
let gradienSubtractProgram: GLProgram;


// Main Splat function (from your JS)
function splat(x: number, y: number, dx: number, dy: number, color: number[], canvas: HTMLCanvasElement) {
    if (!gl || !velocity || !density) return;

    splatProgram.bind();
    gl.uniform1i(splatProgram.uniforms.uTarget, velocity.first[2]);
    gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height);
    gl.uniform2f(splatProgram.uniforms.point, x / canvas.width, 1.0 - y / canvas.height);
    gl.uniform3f(splatProgram.uniforms.color, dx, -dy, 1.0);
    gl.uniform1f(splatProgram.uniforms.radius, config.SPLAT_RADIUS);
    blit(velocity.second[1]);
    velocity.swap();

    gl.uniform1i(splatProgram.uniforms.uTarget, density.first[2]);
    gl.uniform3f(splatProgram.uniforms.color, color[0] * 0.3, color[1] * 0.3, color[2] * 0.3);
    blit(density.second[1]);
    density.swap();
}


// --- React Component ---

const SmokeBackground: React.FC = () => {
     const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number>();

    // Shader compilation and program setup
    const initializePrograms = useCallback(() => {
        if (!gl) return;

        const baseVertexShader = compileShader(gl.VERTEX_SHADER, 'precision highp float; precision mediump sampler2D; attribute vec2 aPosition; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform vec2 texelSize; void main () { vUv = aPosition * 0.5 + 0.5; vL = vUv - vec2(texelSize.x, 0.0); vR = vUv + vec2(texelSize.x, 0.0); vT = vUv + vec2(0.0, texelSize.y); vB = vUv - vec2(0.0, texelSize.y); gl_Position = vec4(aPosition, 0.0, 1.0); }');
        const clearShader = compileShader(gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; uniform sampler2D uTexture; uniform float value; void main () { gl_FragColor = value * texture2D(uTexture, vUv); }');
        const displayShader = compileShader(gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; uniform sampler2D uTexture; void main () { gl_FragColor = texture2D(uTexture, vUv); }');
        const splatShader = compileShader(gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; uniform sampler2D uTarget; uniform float aspectRatio; uniform vec3 color; uniform vec2 point; uniform float radius; void main () { vec2 p = vUv - point.xy; p.x *= aspectRatio; vec3 splat = exp(-dot(p, p) / radius) * color; vec3 base = texture2D(uTarget, vUv).xyz; gl_FragColor = vec4(base + splat, 1.0); }');
        const advectionManualFilteringShader = compileShader(gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform float dt; uniform float dissipation; vec4 bilerp (in sampler2D sam, in vec2 p) { vec4 st; st.xy = floor(p - 0.5) + 0.5; st.zw = st.xy + 1.0; vec4 uv = st * texelSize.xyxy; vec4 a = texture2D(sam, uv.xy); vec4 b = texture2D(sam, uv.zy); vec4 c = texture2D(sam, uv.xw); vec4 d = texture2D(sam, uv.zw); vec2 f = p - st.xy; return mix(mix(a, b, f.x), mix(c, d, f.x), f.y); } void main () { vec2 coord = gl_FragCoord.xy - dt * texture2D(uVelocity, vUv).xy; gl_FragColor = dissipation * bilerp(uSource, coord); gl_FragColor.a = 1.0; }');
        const advectionShader = compileShader(gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; uniform sampler2D uVelocity; uniform sampler2D uSource; uniform vec2 texelSize; uniform float dt; uniform float dissipation; void main () { vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize; gl_FragColor = dissipation * texture2D(uSource, coord); }');
        const divergenceShader = compileShader(gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uVelocity; vec2 sampleVelocity (in vec2 uv) { vec2 multiplier = vec2(1.0, 1.0); if (uv.x < 0.0) { uv.x = 0.0; multiplier.x = -1.0; } if (uv.x > 1.0) { uv.x = 1.0; multiplier.x = -1.0; } if (uv.y < 0.0) { uv.y = 0.0; multiplier.y = -1.0; } if (uv.y > 1.0) { uv.y = 1.0; multiplier.y = -1.0; } return multiplier * texture2D(uVelocity, uv).xy; } void main () { float L = sampleVelocity(vL).x; float R = sampleVelocity(vR).x; float T = sampleVelocity(vT).y; float B = sampleVelocity(vB).y; float div = 0.5 * (R - L + T - B); gl_FragColor = vec4(div, 0.0, 0.0, 1.0); }');
        const curlShader = compileShader(gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uVelocity; void main () { float L = texture2D(uVelocity, vL).y; float R = texture2D(uVelocity, vR).y; float T = texture2D(uVelocity, vT).x; float B = texture2D(uVelocity, vB).x; float vorticity = R - L - T + B; gl_FragColor = vec4(vorticity, 0.0, 0.0, 1.0); }');
        const vorticityShader = compileShader(gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uVelocity; uniform sampler2D uCurl; uniform float curl; uniform float dt; void main () { float L = texture2D(uCurl, vL).y; float R = texture2D(uCurl, vR).y; float T = texture2D(uCurl, vT).x; float B = texture2D(uCurl, vB).x; float C = texture2D(uCurl, vUv).x; vec2 force = vec2(abs(T) - abs(B), abs(R) - abs(L)); force *= 1.0 / length(force + 0.00001) * curl * C; vec2 vel = texture2D(uVelocity, vUv).xy; gl_FragColor = vec4(vel + force * dt, 0.0, 1.0); }');
        const pressureShader = compileShader(gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uPressure; uniform sampler2D uDivergence; vec2 boundary (in vec2 uv) { uv = min(max(uv, 0.0), 1.0); return uv; } void main () { float L = texture2D(uPressure, boundary(vL)).x; float R = texture2D(uPressure, boundary(vR)).x; float T = texture2D(uPressure, boundary(vT)).x; float B = texture2D(uPressure, boundary(vB)).x; float C = texture2D(uPressure, vUv).x; float divergence = texture2D(uDivergence, vUv).x; float pressure = (L + R + B + T - divergence) * 0.25; gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0); }');
        const gradientSubtractShader = compileShader(gl.FRAGMENT_SHADER, 'precision highp float; precision mediump sampler2D; varying vec2 vUv; varying vec2 vL; varying vec2 vR; varying vec2 vT; varying vec2 vB; uniform sampler2D uPressure; uniform sampler2D uVelocity; vec2 boundary (in vec2 uv) { uv = min(max(uv, 0.0), 1.0); return uv; } void main () { float L = texture2D(uPressure, boundary(vL)).x; float R = texture2D(uPressure, boundary(vR)).x; float T = texture2D(uPressure, boundary(vT)).x; float B = texture2D(uPressure, boundary(vB)).x; vec2 velocity = texture2D(uVelocity, vUv).xy; velocity.xy -= vec2(R - L, T - B); gl_FragColor = vec4(velocity, 0.0, 1.0); }');

        clearProgram = new GLProgram(baseVertexShader, clearShader);
        displayProgram = new GLProgram(baseVertexShader, displayShader);
        splatProgram = new GLProgram(baseVertexShader, splatShader);
        advectionProgram = new GLProgram(baseVertexShader, support_linear_float ? advectionShader : advectionManualFilteringShader);
        divergenceProgram = new GLProgram(baseVertexShader, divergenceShader);
        curlProgram = new GLProgram(baseVertexShader, curlShader);
        vorticityProgram = new GLProgram(baseVertexShader, vorticityShader);
        pressureProgram = new GLProgram(baseVertexShader, pressureShader);
        gradienSubtractProgram = new GLProgram(baseVertexShader, gradientSubtractShader);
    }, []);

    // Main update loop
    const update = useCallback(() => {
        if (!gl || !velocity || !density || !curl || !divergence || !pressure || !canvasRef.current) return;
        
        // Handle resizing
        const canvas = canvasRef.current;
        if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;
            initFramebuffers(canvas);
        }

        const dt = Math.min((Date.now() - lastTime) / 1000, 0.016);
        lastTime = Date.now();

        gl.viewport(0, 0, textureWidth, textureHeight);

        // Advection Step (Velocity)
        advectionProgram.bind();
        gl.uniform2f(advectionProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
        gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.first[2]);
        gl.uniform1i(advectionProgram.uniforms.uSource, velocity.first[2]);
        gl.uniform1f(advectionProgram.uniforms.dt, dt);
        gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION);
        blit(velocity.second[1]);
        velocity.swap();

        // Advection Step (Density/Color)
        gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.first[2]);
        gl.uniform1i(advectionProgram.uniforms.uSource, density.first[2]);
        gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION);
        blit(density.second[1]);
        density.swap();

        // Splat (Mouse/Touch Input)
        for (const pointer of pointers) {
            if (pointer.moved) {
                splat(pointer.x, pointer.y, pointer.dx, pointer.dy, pointer.color, canvas);
                pointer.moved = false;
            }
        }

        // Curl (Vorticity Confinement)
        curlProgram.bind();
        gl.uniform2f(curlProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
        gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.first[2]);
        blit(curl[1]);

        // Vorticity Confinement
        vorticityProgram.bind();
        gl.uniform2f(vorticityProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
        gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.first[2]);
        gl.uniform1i(vorticityProgram.uniforms.uCurl, curl[2]);
        gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL);
        gl.uniform1f(vorticityProgram.uniforms.dt, dt);
        blit(velocity.second[1]);
        velocity.swap();

        // Divergence
        divergenceProgram.bind();
        gl.uniform2f(divergenceProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
        gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.first[2]);
        blit(divergence[1]);

        // Clear (Pressure Dissipation)
        clearProgram.bind();
        let pressureTexId = pressure.first[2];
        gl.activeTexture(gl.TEXTURE0 + pressureTexId);
        gl.bindTexture(gl.TEXTURE_2D, pressure.first[0]);
        gl.uniform1i(clearProgram.uniforms.uTexture, pressureTexId);
        gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE_DISSIPATION);
        blit(pressure.second[1]);
        pressure.swap();

        // Pressure Iterations (Jacobi)
        pressureProgram.bind();
        gl.uniform2f(pressureProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
        gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence[2]);
        pressureTexId = pressure.first[2];
        gl.activeTexture(gl.TEXTURE0 + pressureTexId);

        for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
            gl.bindTexture(gl.TEXTURE_2D, pressure.first[0]);
            gl.uniform1i(pressureProgram.uniforms.uPressure, pressureTexId);
            blit(pressure.second[1]);
            pressure.swap();
        }

        // Gradient Subtract
        gradienSubtractProgram.bind();
        gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, 1.0 / textureWidth, 1.0 / textureHeight);
        gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.first[2]);
        gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.first[2]);
        blit(velocity.second[1]);
        velocity.swap();

        // Display (Final Render)
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        displayProgram.bind();
        gl.uniform1i(displayProgram.uniforms.uTexture, density.first[2]);
        blit(null);

        animationFrameRef.current = requestAnimationFrame(update);
    }, []); // Dependencies are mostly global state, so minimal dependencies

    // Effect for setup and teardown
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        try {
            const context = getWebGLContext(canvas);
            gl = context.gl;
            ext = context.ext;
            support_linear_float = context.support_linear_float;
            
            // Set initial canvas size
            canvas.width = canvas.clientWidth;
            canvas.height = canvas.clientHeight;

            initializePrograms();
            initFramebuffers(canvas);

            animationFrameRef.current = requestAnimationFrame(update);
        } catch (error) {
            console.error("WebGL initialization failed:", error);
            // Optionally render a fallback UI here
            return;
        }

        // --- Event Handlers (Mouse Input) ---
        let count = 0;
        let colorArr = [Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.2];

        const onMouseMove = (e: MouseEvent) => {
            count++;
            if (count > 25) {
                colorArr = [Math.random() + 0.2, Math.random() + 0.2, Math.random() + 0.2];
                count = 0;
            }

            pointers[0].down = true;
            pointers[0].color = colorArr;
            pointers[0].moved = pointers[0].down;
            pointers[0].dx = (e.offsetX - pointers[0].x) * 10.0;
            pointers[0].dy = (e.offsetY - pointers[0].y) * 10.0;
            pointers[0].x = e.offsetX;
            pointers[0].y = e.offsetY;
        };

        const onTouchMove = (e: TouchEvent) => {
            e.preventDefault();
            // Your touch logic can be re-added here if needed
        };

        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('touchmove', onTouchMove, { passive: false });


        // Cleanup function
        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            canvas.removeEventListener('mousemove', onMouseMove);
            canvas.removeEventListener('touchmove', onTouchMove);

            // TODO: Proper WebGL resource cleanup if desired
        };
    }, [update, initializePrograms]); // Re-run effect if update/initializePrograms change (shouldn't if useCallback is used correctly)

    // In SmokeBackground component
return (
    <div className="fixed inset-0 -z-50 pointer-events-none"> {/* Increased negative z-index */}
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ 
                zIndex: -50,
            }}
        />
    </div>
);
};

export default SmokeBackground;