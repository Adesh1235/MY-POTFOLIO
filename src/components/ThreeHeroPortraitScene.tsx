import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import {
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Upload
} from 'lucide-react';

export type OrbitObjectTarget = 'about' | 'work' | 'books' | 'contact';

interface ThreeHeroPortraitSceneProps {
  scrollProgress: number; // 0 to 1 across hero scroll journey
  onSelectOrbitTarget: (target: OrbitObjectTarget) => void;
  onCursorLabelChange?: (label: string | null) => void;
}

// Pre-allocated module-scope math helpers (Zero GC in requestAnimationFrame)
const _vec3 = new THREE.Vector3();
const _mat4 = new THREE.Matrix4();
const _quat = new THREE.Quaternion();
const _euler = new THREE.Euler();
const _scale = new THREE.Vector3();

/**
 * Generates a high-resolution procedural CanvasTexture portrait of Tanishq Sharma
 * faithfully matching the uploaded mirror portrait (wavy dark hair, warm studio light,
 * open-collar pink-and-red striped linen shirt, pearl necklace, purple triple-camera phone,
 * pink beaded bracelet), while allowing seamless replacement if a custom image is uploaded.
 */
function createPortraitCutoutTexture(
  maxAnisotropy: number,
  customImage?: HTMLImageElement
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1280;
  const ctx = canvas.getContext('2d')!;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (customImage) {
    // Draw uploaded portrait inside an editorial rounded arch cutout with soft rim glow
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(64, 48, 896, 1184, 48);
    ctx.clip();

    const imgAspect = customImage.width / customImage.height;
    const targetW = 896;
    const targetH = 1184;
    const targetAspect = targetW / targetH;
    let drawW = targetW;
    let drawH = targetH;
    let offsetX = 64;
    let offsetY = 48;

    if (imgAspect > targetAspect) {
      drawW = targetH * imgAspect;
      offsetX = 64 - (drawW - targetW) / 2;
    } else {
      drawH = targetW / imgAspect;
      offsetY = 48 - (drawH - targetH) / 2;
    }

    ctx.drawImage(customImage, offsetX, offsetY, drawW, drawH);

    // Subtle editorial warm vignette & border
    const grad = ctx.createLinearGradient(0, 900, 0, 1232);
    grad.addColorStop(0, 'rgba(23, 22, 20, 0)');
    grad.addColorStop(1, 'rgba(23, 22, 20, 0.55)');
    ctx.fillStyle = grad;
    ctx.fillRect(64, 48, 896, 1184);
    ctx.restore();

    ctx.strokeStyle = 'rgba(166, 139, 106, 0.65)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(64, 48, 896, 1184, 48);
    ctx.stroke();
  } else {
    // Editorial Studio Backdrop Card with Curtain Drapery & Warm Golden Rim Light
    ctx.save();
    ctx.beginPath();
    ctx.roundRect(72, 56, 880, 1168, 44);
    ctx.clip();

    const bgGrad = ctx.createLinearGradient(72, 56, 952, 1224);
    bgGrad.addColorStop(0, '#DFDBD2');
    bgGrad.addColorStop(0.5, '#CFC9BE');
    bgGrad.addColorStop(1, '#B8B0A4');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(72, 56, 880, 1168);

    // Soft left curtain folds (from uploaded photo)
    for (let i = 0; i < 4; i++) {
      const x = 72 + i * 54;
      const curtainGrad = ctx.createLinearGradient(x, 56, x + 54, 56);
      curtainGrad.addColorStop(0, '#B5B0A6');
      curtainGrad.addColorStop(0.5, '#DCD8D0');
      curtainGrad.addColorStop(1, '#9E9990');
      ctx.fillStyle = curtainGrad;
      ctx.fillRect(x, 56, 54, 1168);
    }

    // Dark studio mirror frame vertical accent
    ctx.fillStyle = '#181615';
    ctx.fillRect(288, 56, 26, 780);

    // Warm golden-hour sunlight wash across center
    const sunGrad = ctx.createRadialGradient(480, 460, 40, 480, 460, 520);
    sunGrad.addColorStop(0, 'rgba(255, 220, 175, 0.48)');
    sunGrad.addColorStop(1, 'rgba(255, 220, 175, 0)');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(72, 56, 880, 1168);

    // Neck & Chest (Open collar V-neck with warm skin tone & shadow)
    ctx.fillStyle = '#CFA082';
    ctx.beginPath();
    ctx.moveTo(410, 560);
    ctx.lineTo(545, 560);
    ctx.lineTo(560, 960);
    ctx.lineTo(395, 960);
    ctx.closePath();
    ctx.fill();

    // Subtle collarbone & chest shading
    const chestShadow = ctx.createLinearGradient(415, 620, 535, 920);
    chestShadow.addColorStop(0, 'rgba(135, 85, 60, 0.25)');
    chestShadow.addColorStop(0.5, 'rgba(235, 190, 160, 0.2)');
    chestShadow.addColorStop(1, 'rgba(110, 68, 48, 0.45)');
    ctx.fillStyle = chestShadow;
    ctx.fillRect(400, 560, 155, 380);

    // Pearl / Silver Necklace Chain
    ctx.strokeStyle = '#F7F4EE';
    ctx.lineWidth = 7;
    ctx.setLineDash([8, 6]);
    ctx.beginPath();
    ctx.moveTo(405, 668);
    ctx.quadraticCurveTo(475, 718, 548, 655);
    ctx.stroke();
    ctx.setLineDash([]);

    // Pink & Red Vertical Striped Linen Shirt (Left & Right Torso + Sleeves)
    ctx.fillStyle = '#F3CED3';
    ctx.beginPath();
    // Left shoulder & torso
    ctx.moveTo(85, 1224);
    ctx.lineTo(135, 815);
    ctx.quadraticCurveTo(220, 685, 385, 635);
    ctx.lineTo(435, 985);
    ctx.lineTo(510, 740);
    ctx.lineTo(565, 625);
    // Right shoulder & raised arm
    ctx.quadraticCurveTo(735, 675, 865, 790);
    ctx.lineTo(950, 1224);
    ctx.closePath();
    ctx.fill();

    // Pink/Coral Vertical Stripes on Shirt
    ctx.save();
    ctx.clip();
    ctx.strokeStyle = '#DF959F';
    ctx.lineWidth = 5;
    for (let sx = 95; sx < 940; sx += 28) {
      ctx.beginPath();
      ctx.moveTo(sx, 620);
      ctx.lineTo(sx - 18, 1224);
      ctx.stroke();
    }
    ctx.restore();

    // Shirt Open Collar Lapels
    ctx.fillStyle = '#F7D7DC';
    ctx.strokeStyle = '#DF959F';
    ctx.lineWidth = 3;
    // Left lapel
    ctx.beginPath();
    ctx.moveTo(385, 635);
    ctx.lineTo(315, 720);
    ctx.lineTo(395, 745);
    ctx.lineTo(435, 960);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Right lapel
    ctx.beginPath();
    ctx.moveTo(565, 610);
    ctx.lineTo(645, 705);
    ctx.lineTo(555, 725);
    ctx.lineTo(445, 965);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Head & Facial Structure (Warm sunlit skin with soft cheek blush)
    ctx.save();
    ctx.translate(465, 420);
    ctx.rotate(-0.04);

    // Left Ear
    ctx.fillStyle = '#D99E82';
    ctx.beginPath();
    ctx.ellipse(-128, 22, 22, 44, -0.15, 0, Math.PI * 2);
    ctx.fill();

    // Face contour
    const faceGrad = ctx.createRadialGradient(-20, -10, 20, 0, 10, 165);
    faceGrad.addColorStop(0, '#F0C7AC');
    faceGrad.addColorStop(0.7, '#DFA98B');
    faceGrad.addColorStop(1, '#C58B6D');
    ctx.fillStyle = faceGrad;
    ctx.beginPath();
    ctx.moveTo(-118, -70);
    ctx.quadraticCurveTo(-124, 75, -62, 138);
    ctx.quadraticCurveTo(0, 178, 65, 136);
    ctx.quadraticCurveTo(118, 75, 114, -70);
    ctx.quadraticCurveTo(0, -140, -118, -70);
    ctx.closePath();
    ctx.fill();

    // Subtle sunlit rose cheek warmth
    const cheekGrad = ctx.createRadialGradient(-55, 35, 5, -55, 35, 52);
    cheekGrad.addColorStop(0, 'rgba(218, 118, 112, 0.35)');
    cheekGrad.addColorStop(1, 'rgba(218, 118, 112, 0)');
    ctx.fillStyle = cheekGrad;
    ctx.beginPath();
    ctx.arc(-55, 35, 52, 0, Math.PI * 2);
    ctx.fill();

    // Eyebrows (Expressive dark arches)
    ctx.strokeStyle = '#2B211C';
    ctx.lineWidth = 7;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(-78, -16);
    ctx.quadraticCurveTo(-45, -28, -16, -18);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(22, -19);
    ctx.quadraticCurveTo(54, -30, 82, -16);
    ctx.stroke();

    // Eyes looking thoughtfully toward the right (at phone mirror)
    ctx.fillStyle = '#FAF6F0';
    ctx.beginPath();
    ctx.ellipse(-46, 4, 22, 11, 0, 0, Math.PI * 2);
    ctx.ellipse(52, 2, 21, 11, 0, 0, Math.PI * 2);
    ctx.fill();

    // Irises & Pupils (shifted slightly right)
    ctx.fillStyle = '#261C17';
    ctx.beginPath();
    ctx.arc(-39, 4, 9, 0, Math.PI * 2);
    ctx.arc(59, 2, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(-36, 1, 2.8, 0, Math.PI * 2);
    ctx.arc(62, -1, 2.8, 0, Math.PI * 2);
    ctx.fill();

    // Nose bridge & tip
    ctx.strokeStyle = '#B87D60';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(2, -12);
    ctx.lineTo(8, 48);
    ctx.quadraticCurveTo(2, 60, -10, 54);
    ctx.stroke();

    // Sculpted lips
    ctx.fillStyle = '#C4646C';
    ctx.beginPath();
    ctx.moveTo(-34, 92);
    ctx.quadraticCurveTo(-12, 80, 0, 86);
    ctx.quadraticCurveTo(12, 80, 34, 92);
    ctx.quadraticCurveTo(0, 112, -34, 92);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#8F3E45';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-32, 92);
    ctx.quadraticCurveTo(0, 95, 32, 92);
    ctx.stroke();

    // Voluminous Textured Wavy Dark Hair (characteristic crown curls)
    ctx.fillStyle = '#271E19';
    const curls = [
      [-95, -95, 48],
      [-55, -125, 56],
      [0, -135, 60],
      [58, -122, 54],
      [98, -92, 46],
      [-112, -55, 36],
      [110, -55, 36],
      [-35, -88, 46],
      [35, -88, 46]
    ];
    curls.forEach(([cx, cy, cr]) => {
      ctx.beginPath();
      ctx.arc(cx, cy, cr, 0, Math.PI * 2);
      ctx.fill();
    });

    // Warm golden highlights in hair curls
    ctx.strokeStyle = 'rgba(186, 142, 102, 0.38)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(-42, -110, 28, 0.4, 2.4);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(28, -115, 32, 0.3, 2.2);
    ctx.stroke();

    ctx.restore();

    // Purple Triple-Camera iPhone held horizontally on the right (signature detail from photo)
    ctx.save();
    ctx.translate(615, 425);
    ctx.fillStyle = '#4B3749';
    ctx.strokeStyle = '#2E202C';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(0, 0, 255, 132, 22);
    ctx.fill();
    ctx.stroke();

    // Silver triple-camera bump on left of phone case
    ctx.fillStyle = '#DCD7D8';
    ctx.beginPath();
    ctx.roundRect(12, 12, 74, 74, 16);
    ctx.fill();

    // 3 Camera Lenses
    const lenses = [
      [32, 30],
      [32, 66],
      [64, 48]
    ];
    lenses.forEach(([lx, ly]) => {
      ctx.fillStyle = '#1C181B';
      ctx.beginPath();
      ctx.arc(lx, ly, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#9E9698';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    });

    // Right Hand Fingers & Pink Beaded Bracelet
    ctx.fillStyle = '#E5B89B';
    // Fingers holding phone
    const fingers = [
      [155, -8, 72, 22, 0.25],
      [140, 22, 85, 22, 0.18],
      [145, 54, 82, 22, 0.12],
      [165, 86, 68, 20, 0.08]
    ];
    fingers.forEach(([fx, fy, fw, fh, rot]) => {
      ctx.save();
      ctx.translate(fx, fy);
      ctx.rotate(rot);
      ctx.beginPath();
      ctx.roundRect(0, 0, fw, fh, 11);
      ctx.fill();
      ctx.restore();
    });

    // Forearm & Pink Beaded Bracelet on Right Wrist
    ctx.fillStyle = '#DFB092';
    ctx.beginPath();
    ctx.moveTo(225, 45);
    ctx.lineTo(315, 195);
    ctx.lineTo(295, 440);
    ctx.lineTo(205, 440);
    ctx.lineTo(215, 155);
    ctx.closePath();
    ctx.fill();

    // Pink Beaded Bracelet
    ctx.strokeStyle = '#F2C4CE';
    ctx.lineWidth = 12;
    ctx.setLineDash([10, 5]);
    ctx.beginPath();
    ctx.moveTo(212, 185);
    ctx.quadraticCurveTo(258, 168, 302, 192);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();

    // Subtle Editorial Caption Overlay at Bottom of Portrait Cutout
    const bottomScrim = ctx.createLinearGradient(0, 1000, 0, 1224);
    bottomScrim.addColorStop(0, 'rgba(23, 22, 20, 0)');
    bottomScrim.addColorStop(1, 'rgba(23, 22, 20, 0.72)');
    ctx.fillStyle = bottomScrim;
    ctx.fillRect(72, 1000, 880, 224);

    ctx.fillStyle = '#F4F1EA';
    ctx.font = 'italic 600 42px Georgia, serif';
    ctx.fillText('Tanishq Sharma', 124, 1142);
    ctx.fillStyle = '#D6C3AC';
    ctx.font = '500 20px monospace';
    ctx.fillText('THE WRITER BEHIND THE WORDS · PORTRAIT EDITION', 124, 1180);

    ctx.restore();

    // Crisp outer border
    ctx.strokeStyle = 'rgba(166, 139, 106, 0.55)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(72, 56, 880, 1168, 44);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = maxAnisotropy;
  texture.needsUpdate = true;
  return texture;
}

function createLabelTexture(
  title: string,
  subtitle: string,
  bgHex: string,
  textHex: string,
  maxAnisotropy: number
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = bgHex;
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = '#A68B6A';
  ctx.lineWidth = 8;
  ctx.strokeRect(24, 24, 464, 464);

  ctx.fillStyle = '#A68B6A';
  ctx.font = '600 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(subtitle.toUpperCase(), 256, 150);

  ctx.fillStyle = textHex;
  ctx.font = 'bold 48px Georgia, serif';
  ctx.fillText(title, 256, 256);

  ctx.fillStyle = '#A68B6A';
  ctx.font = 'italic 28px Georgia, serif';
  ctx.fillText('Tanishq Sharma', 256, 360);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export const ThreeHeroPortraitScene: React.FC<ThreeHeroPortraitSceneProps> = ({
  scrollProgress,
  onSelectOrbitTarget,
  onCursorLabelChange
}) => {
  const canvasMountRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [hoveredHotspot, setHoveredHotspot] = useState<OrbitObjectTarget | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dockCollapsed, setDockCollapsed] = useState(false);
  const [depthMultiplier, setDepthMultiplier] = useState(1.0);
  const [lightingMood, setLightingMood] = useState<'studio' | 'golden' | 'cinema'>('studio');

  // Mutable refs for 60fps loop access without tearing down WebGL
  const stateRef = useRef({
    scrollProgress: 0,
    mouseX: 0,
    mouseY: 0,
    hoveredTarget: null as OrbitObjectTarget | null,
    depthMultiplier: 1.0,
    lightingMood: 'studio' as 'studio' | 'golden' | 'cinema'
  });

  const portraitMeshRef = useRef<THREE.Mesh | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    stateRef.current.scrollProgress = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    stateRef.current.hoveredTarget = hoveredHotspot;
  }, [hoveredHotspot]);

  useEffect(() => {
    stateRef.current.depthMultiplier = depthMultiplier;
  }, [depthMultiplier]);

  useEffect(() => {
    stateRef.current.lightingMood = lightingMood;
  }, [lightingMood]);

  // Keyboard shortcut 'H' to toggle bottom control dock
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key.toLowerCase() === 'h' &&
        document.activeElement?.tagName !== 'INPUT' &&
        document.activeElement?.tagName !== 'TEXTAREA'
      ) {
        setDockCollapsed((prev) => !prev);
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isFullscreen]);

  useEffect(() => {
    const container = canvasMountRef.current;
    if (!container) return;

    const isHeadless =
      navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xf4f1ea, 0.045);

    const width = container.clientWidth || 640;
    const height = container.clientHeight || 640;

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 6.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isHeadless;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Studio Environment Map (RoomEnvironment + PMREMGenerator)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    const maxAniso = renderer.capabilities.getMaxAnisotropy();

    // 3-Point Balanced Studio Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xfff8ed, 0xc7bba8, 0.85);
    hemiLight.position.set(0, 8, 0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffe7c4, 1.8);
    keyLight.position.set(4.5, 6.0, 5.0);
    keyLight.castShadow = !isHeadless;
    const d = 5;
    keyLight.shadow.camera.left = -d;
    keyLight.shadow.camera.right = d;
    keyLight.shadow.camera.top = d;
    keyLight.shadow.camera.bottom = -d;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.mapSize.set(1024, 1024);
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xd6a676, 1.25);
    rimLight.position.set(-4.0, 3.5, -3.5);
    scene.add(rimLight);

    // Soft Radial Contact Shadow Plane at Ground Level
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const sGrad = sCtx.createRadialGradient(128, 128, 12, 128, 128, 120);
    sGrad.addColorStop(0, 'rgba(23, 22, 20, 0.36)');
    sGrad.addColorStop(1, 'rgba(23, 22, 20, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 256, 256);
    const contactShadowTex = new THREE.CanvasTexture(shadowCanvas);

    const contactShadowMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(5.5, 3.2),
      new THREE.MeshBasicMaterial({
        map: contactShadowTex,
        transparent: true,
        depthWrite: false,
        opacity: 0.65
      })
    );
    contactShadowMesh.rotation.x = -Math.PI / 2;
    contactShadowMesh.position.set(0, -2.25, 0);
    scene.add(contactShadowMesh);

    // Root Composition Group
    const compositionRoot = new THREE.Group();
    scene.add(compositionRoot);

    // =========================================================================
    // 1. LAYERED 3D CHARACTER PORTRAIT ASSEMBLY (6-Part THREE.Group)
    // =========================================================================
    const portraitGroup = new THREE.Group();
    compositionRoot.add(portraitGroup);

    // Part 1: Architectural Brass Frame Backing Plate
    const backFrameGeo = new THREE.BoxGeometry(2.68, 3.46, 0.08);
    const brassMat = new THREE.MeshPhysicalMaterial({
      color: 0xa68b6a,
      metalness: 0.88,
      roughness: 0.22,
      clearcoat: 0.6
    });
    const backFrameMesh = new THREE.Mesh(backFrameGeo, brassMat);
    backFrameMesh.position.set(0, 0, -0.18);
    backFrameMesh.castShadow = true;
    backFrameMesh.receiveShadow = true;
    portraitGroup.add(backFrameMesh);

    // Part 2: Warm Archival Paper Mat Layer
    const paperMatGeo = new THREE.BoxGeometry(2.54, 3.32, 0.05);
    const paperMatMaterial = new THREE.MeshStandardMaterial({
      color: 0xf4f1ea,
      roughness: 0.85,
      metalness: 0.02
    });
    const paperMatMesh = new THREE.Mesh(paperMatGeo, paperMatMaterial);
    paperMatMesh.position.set(0, 0, -0.09);
    portraitGroup.add(paperMatMesh);

    // Part 3: Foreground Portrait Cutout Plane
    const portraitTex = createPortraitCutoutTexture(maxAniso);
    const portraitGeo = new THREE.PlaneGeometry(2.42, 3.12);
    const portraitMat = new THREE.MeshStandardMaterial({
      map: portraitTex,
      transparent: true,
      roughness: 0.38,
      metalness: 0.05
    });
    const portraitMesh = new THREE.Mesh(portraitGeo, portraitMat);
    portraitMesh.position.set(0, 0.02, 0.02);
    portraitMesh.castShadow = true;
    portraitMeshRef.current = portraitMesh;
    portraitGroup.add(portraitMesh);

    // Part 4: Translucent Optical Glass Frame Overlay (offset in Z for depth)
    const glassOverlayGeo = new THREE.BoxGeometry(2.58, 3.36, 0.02);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.92,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.5,
      thickness: 0.3,
      depthWrite: false
    });
    const glassOverlayMesh = new THREE.Mesh(glassOverlayGeo, glassMat);
    glassOverlayMesh.position.set(0, 0, 0.14);
    glassOverlayMesh.renderOrder = 2;
    portraitGroup.add(glassOverlayMesh);

    // Part 5 & 6: Top & Bottom Sculpted Brass Corner Clamps
    const clampGeo = new THREE.BoxGeometry(0.42, 0.09, 0.22);
    const topClamp = new THREE.Mesh(clampGeo, brassMat);
    topClamp.position.set(-1.1, 1.68, 0.0);
    portraitGroup.add(topClamp);

    const bottomClamp = new THREE.Mesh(clampGeo, brassMat);
    bottomClamp.position.set(1.1, -1.68, 0.0);
    portraitGroup.add(bottomClamp);

    // =========================================================================
    // 2. ORBITING 3D OBJECT 1: NOTEBOOK ("About") — 6-Part THREE.Group
    // =========================================================================
    const notebookGroup = new THREE.Group();
    notebookGroup.position.set(-2.05, 1.15, 0.85);
    compositionRoot.add(notebookGroup);

    const leatherMat = new THREE.MeshStandardMaterial({
      color: 0x241d18,
      roughness: 0.65,
      metalness: 0.08
    });
    const creamPagesMat = new THREE.MeshStandardMaterial({
      color: 0xf7f2e7,
      roughness: 0.85,
      metalness: 0.0
    });

    const nbBack = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.96, 0.03), leatherMat);
    nbBack.position.z = -0.06;
    notebookGroup.add(nbBack);

    const nbPages = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.92, 0.09), creamPagesMat);
    notebookGroup.add(nbPages);

    const nbCoverTex = createLabelTexture('IDEAS.', '01 · ABOUT', '#241D18', '#F4F1EA', maxAniso);
    const nbFront = new THREE.Mesh(
      new THREE.BoxGeometry(0.72, 0.96, 0.03),
      new THREE.MeshStandardMaterial({ map: nbCoverTex, roughness: 0.55 })
    );
    nbFront.position.z = 0.06;
    notebookGroup.add(nbFront);

    const nbSpine = new THREE.Mesh(
      new THREE.CylinderGeometry(0.075, 0.075, 0.96, 16, 1, false, 0, Math.PI),
      leatherMat
    );
    nbSpine.rotation.y = -Math.PI / 2;
    nbSpine.position.x = -0.36;
    notebookGroup.add(nbSpine);

    // Gold Elastic Strap & Bookmark Ribbon
    const nbStrap = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.98, 0.16), brassMat);
    nbStrap.position.x = 0.22;
    notebookGroup.add(nbStrap);

    // =========================================================================
    // 3. ORBITING 3D OBJECT 2: CAMPAIGN CARD & FLACON ("Work") — 6-Part THREE.Group
    // =========================================================================
    const campaignGroup = new THREE.Group();
    campaignGroup.position.set(2.1, 1.05, 0.95);
    compositionRoot.add(campaignGroup);

    const cardTex = createLabelTexture('CAMPAIGNS', '02 · WORK', '#171614', '#F4F1EA', maxAniso);
    const cardBoard = new THREE.Mesh(
      new THREE.BoxGeometry(0.88, 1.08, 0.04),
      new THREE.MeshStandardMaterial({ map: cardTex, roughness: 0.4 })
    );
    campaignGroup.add(cardBoard);

    const cardRim = new THREE.Mesh(new THREE.BoxGeometry(0.92, 1.12, 0.02), brassMat);
    cardRim.position.z = -0.02;
    campaignGroup.add(cardRim);

    // Miniature Sculpted Amber Perfume Bottle in front of Campaign Card
    const amberGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0xd98a3c,
      transmission: 0.88,
      roughness: 0.1,
      ior: 1.54,
      thickness: 0.8,
      clearcoat: 1.0
    });
    const flaconBody = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.36, 8), amberGlassMat);
    flaconBody.position.set(0.24, -0.24, 0.18);
    campaignGroup.add(flaconBody);

    const flaconNeck = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.09, 16), brassMat);
    flaconNeck.position.set(0.24, -0.02, 0.18);
    campaignGroup.add(flaconNeck);

    const flaconCap = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.1, 0.14), leatherMat);
    flaconCap.position.set(0.24, 0.06, 0.18);
    campaignGroup.add(flaconCap);

    // =========================================================================
    // 4. ORBITING 3D OBJECT 3: HARDCOVER BOOK ("Books") — 6-Part THREE.Group
    // =========================================================================
    const bookGroup = new THREE.Group();
    bookGroup.position.set(-1.95, -1.15, 1.05);
    compositionRoot.add(bookGroup);

    const bookCoverTex = createLabelTexture('BOOKS', '03 · AUTHOR', '#F2DDD8', '#171614', maxAniso);
    const bookFront = new THREE.Mesh(
      new THREE.BoxGeometry(0.78, 1.04, 0.035),
      new THREE.MeshStandardMaterial({ map: bookCoverTex, roughness: 0.6 })
    );
    bookFront.position.z = 0.07;
    bookGroup.add(bookFront);

    const bookBack = new THREE.Mesh(
      new THREE.BoxGeometry(0.78, 1.04, 0.035),
      new THREE.MeshStandardMaterial({ color: 0xe6c8c0, roughness: 0.65 })
    );
    bookBack.position.z = -0.07;
    bookGroup.add(bookBack);

    const bookPages = new THREE.Mesh(new THREE.BoxGeometry(0.74, 1.0, 0.11), creamPagesMat);
    bookGroup.add(bookPages);

    const bookSpine = new THREE.Mesh(new THREE.BoxGeometry(0.04, 1.04, 0.175), brassMat);
    bookSpine.position.x = -0.38;
    bookGroup.add(bookSpine);

    // =========================================================================
    // 5. ORBITING 3D OBJECT 4: STUDIO LAPTOP ("Contact") — 6-Part THREE.Group
    // =========================================================================
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(2.0, -1.1, 0.9);
    compositionRoot.add(laptopGroup);

    const aluminumMat = new THREE.MeshPhysicalMaterial({
      color: 0xd8d3c8,
      metalness: 0.82,
      roughness: 0.24,
      clearcoat: 0.3
    });

    // Base Deck
    const laptopBase = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.04, 0.66), aluminumMat);
    laptopBase.position.y = -0.22;
    laptopGroup.add(laptopBase);

    // Dark Keyboard Well
    const kbWell = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.045, 0.42), leatherMat);
    kbWell.position.set(0, -0.215, -0.04);
    laptopGroup.add(kbWell);

    // Display Lid & Glowing Screen
    const lidPivot = new THREE.Group();
    lidPivot.position.set(0, -0.2, -0.32);
    lidPivot.rotation.x = -0.28;
    laptopGroup.add(lidPivot);

    const laptopLid = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.64, 0.03), aluminumMat);
    laptopLid.position.y = 0.32;
    lidPivot.add(laptopLid);

    const screenTex = createLabelTexture("LET'S TALK", '04 · CONTACT', '#171614', '#F4F1EA', maxAniso);
    const laptopScreen = new THREE.Mesh(
      new THREE.PlaneGeometry(0.88, 0.56),
      new THREE.MeshBasicMaterial({ map: screenTex })
    );
    laptopScreen.position.set(0, 0.32, 0.018);
    lidPivot.add(laptopScreen);

    // =========================================================================
    // 6. ABSTRACT TRANSLUCENT 3D SHAPES & INSTANCED GOLDEN PARTICLES (32 Items)
    // =========================================================================
    const particleCount = 32;
    const particleGeo = new THREE.OctahedronGeometry(0.045, 0);
    const particleMat = new THREE.MeshPhysicalMaterial({
      color: 0xc8a47e,
      metalness: 0.75,
      roughness: 0.2,
      transmission: 0.4,
      transparent: true,
      opacity: 0.85
    });
    const particlesInstanced = new THREE.InstancedMesh(
      particleGeo,
      particleMat,
      particleCount
    );

    const particleSeeds: { radius: number; angle: number; y: number; speed: number; scale: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 1.65 + (i % 5) * 0.32;
      const y = ((i % 7) - 3) * 0.52;
      const scale = 0.65 + (i % 4) * 0.25;
      particleSeeds.push({
        radius,
        angle,
        y,
        speed: 0.15 + (i % 3) * 0.08,
        scale
      });

      _vec3.set(Math.cos(angle) * radius, y, Math.sin(angle) * 0.8 - 0.3);
      _euler.set(i * 0.3, i * 0.5, 0);
      _quat.setFromEuler(_euler);
      _scale.setScalar(scale);
      _mat4.compose(_vec3, _quat, _scale);
      particlesInstanced.setMatrixAt(i, _mat4);
    }
    particlesInstanced.instanceMatrix.needsUpdate = true;
    particlesInstanced.computeBoundingSphere();
    compositionRoot.add(particlesInstanced);

    // Pre-warm shaders
    renderer.compile(scene, camera);

    // Animation Loop with Smooth Exponential Damping
    const clock = new THREE.Clock();
    let animFrameId = 0;

    const animate = () => {
      animFrameId = requestAnimationFrame(animate);
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.getElapsedTime();

      const {
        scrollProgress: sp,
        mouseX,
        mouseY,
        hoveredTarget,
        depthMultiplier: dm,
        lightingMood: mood
      } = stateRef.current;

      // Update Lighting Mood smoothly
      const targetExposure = mood === 'golden' ? 1.25 : mood === 'cinema' ? 0.92 : 1.1;
      renderer.toneMappingExposure = THREE.MathUtils.damp(
        renderer.toneMappingExposure,
        targetExposure,
        4,
        dt
      );

      // 5-Stage Scroll & Cursor Camera Journey
      // Stage 1: Portrait slowly moves toward viewer as user scrolls
      const targetCamZ = 6.6 - sp * 1.15;
      const targetCamX = mouseX * 0.45 + Math.sin(sp * Math.PI) * 0.35;
      const targetCamY = 0.15 + mouseY * 0.3 - sp * 0.25;

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 5, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 5, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 5, dt);
      camera.lookAt(0, 0, 0);

      // Portrait subtle counter-movement against cursor + gentle scroll rotation
      const targetPortraitRotY = -mouseX * 0.18 + sp * 0.22;
      const targetPortraitRotX = mouseY * 0.12;
      portraitGroup.rotation.y = THREE.MathUtils.damp(
        portraitGroup.rotation.y,
        targetPortraitRotY,
        6,
        dt
      );
      portraitGroup.rotation.x = THREE.MathUtils.damp(
        portraitGroup.rotation.x,
        targetPortraitRotX,
        6,
        dt
      );
      portraitGroup.position.y = Math.sin(elapsed * 1.2) * 0.04;

      // Separate glass overlay in Z-depth based on depthMultiplier & scroll
      glassOverlayMesh.position.z = THREE.MathUtils.damp(
        glassOverlayMesh.position.z,
        0.14 * dm + sp * 0.18,
        6,
        dt
      );
      backFrameMesh.position.z = THREE.MathUtils.damp(
        backFrameMesh.position.z,
        -0.18 * dm - sp * 0.15,
        6,
        dt
      );

      // Orbiting 4 Interactive 3D Objects with Hover Depth Expansion
      // 1. Notebook (About)
      const nbHover = hoveredTarget === 'about' ? 1.22 : 1.0;
      notebookGroup.scale.setScalar(
        THREE.MathUtils.damp(notebookGroup.scale.x, nbHover, 8, dt)
      );
      notebookGroup.position.x = THREE.MathUtils.damp(
        notebookGroup.position.x,
        -2.05 + mouseX * 0.22 - sp * 0.3,
        5,
        dt
      );
      notebookGroup.position.y = 1.1 + Math.sin(elapsed * 1.5) * 0.08;
      notebookGroup.position.z = THREE.MathUtils.damp(
        notebookGroup.position.z,
        (hoveredTarget === 'about' ? 1.25 : 0.85) * dm,
        6,
        dt
      );
      notebookGroup.rotation.y = 0.35 + Math.sin(elapsed * 0.9) * 0.15;
      notebookGroup.rotation.z = 0.12;

      // 2. Campaign Card (Work)
      const workHover = hoveredTarget === 'work' ? 1.22 : 1.0;
      campaignGroup.scale.setScalar(
        THREE.MathUtils.damp(campaignGroup.scale.x, workHover, 8, dt)
      );
      campaignGroup.position.x = THREE.MathUtils.damp(
        campaignGroup.position.x,
        2.08 + mouseX * 0.25 + sp * 0.35,
        5,
        dt
      );
      campaignGroup.position.y = 1.02 + Math.cos(elapsed * 1.4) * 0.08;
      campaignGroup.position.z = THREE.MathUtils.damp(
        campaignGroup.position.z,
        (hoveredTarget === 'work' ? 1.35 : 0.95) * dm,
        6,
        dt
      );
      campaignGroup.rotation.y = -0.38 + Math.cos(elapsed * 0.8) * 0.14;
      campaignGroup.rotation.z = -0.08;

      // 3. Hardcover Book (Books)
      const bookHover = hoveredTarget === 'books' ? 1.22 : 1.0;
      bookGroup.scale.setScalar(
        THREE.MathUtils.damp(bookGroup.scale.x, bookHover, 8, dt)
      );
      bookGroup.position.x = THREE.MathUtils.damp(
        bookGroup.position.x,
        -1.95 - mouseX * 0.2 - sp * 0.25,
        5,
        dt
      );
      bookGroup.position.y = -1.12 + Math.sin(elapsed * 1.3 + 1.2) * 0.07;
      bookGroup.position.z = THREE.MathUtils.damp(
        bookGroup.position.z,
        (hoveredTarget === 'books' ? 1.4 : 1.05) * dm,
        6,
        dt
      );
      bookGroup.rotation.y = 0.42 + Math.sin(elapsed * 0.7) * 0.16;
      bookGroup.rotation.z = -0.1;

      // 4. Laptop (Contact)
      const contactHover = hoveredTarget === 'contact' ? 1.22 : 1.0;
      laptopGroup.scale.setScalar(
        THREE.MathUtils.damp(laptopGroup.scale.x, contactHover, 8, dt)
      );
      laptopGroup.position.x = THREE.MathUtils.damp(
        laptopGroup.position.x,
        2.0 - mouseX * 0.18 + sp * 0.25,
        5,
        dt
      );
      laptopGroup.position.y = -1.08 + Math.cos(elapsed * 1.6 + 0.5) * 0.07;
      laptopGroup.position.z = THREE.MathUtils.damp(
        laptopGroup.position.z,
        (hoveredTarget === 'contact' ? 1.3 : 0.9) * dm,
        6,
        dt
      );
      laptopGroup.rotation.y = -0.45 + Math.sin(elapsed * 0.85) * 0.12;

      // Update Instanced Particles without allocating memory
      for (let i = 0; i < particleCount; i++) {
        const seed = particleSeeds[i];
        const a = seed.angle + elapsed * seed.speed;
        _vec3.set(
          Math.cos(a) * seed.radius,
          seed.y + Math.sin(elapsed + i) * 0.08,
          Math.sin(a) * 0.75 - 0.25
        );
        _euler.set(elapsed * 0.4 + i, elapsed * 0.6 + i, 0);
        _quat.setFromEuler(_euler);
        _scale.setScalar(seed.scale);
        _mat4.compose(_vec3, _quat, _scale);
        particlesInstanced.setMatrixAt(i, _mat4);
      }
      particlesInstanced.instanceMatrix.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || 640;
      const h = container.clientHeight || 640;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animFrameId);
      envTexture.dispose();
      contactShadowTex.dispose();
      portraitTex.dispose();
      nbCoverTex.dispose();
      cardTex.dispose();
      bookCoverTex.dispose();
      screenTex.dispose();
      renderer.dispose();
    };
  }, [isFullscreen]);

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    stateRef.current.mouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    stateRef.current.mouseY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  const handlePointerLeave = () => {
    stateRef.current.mouseX = 0;
    stateRef.current.mouseY = 0;
  };

  const handleCustomPortraitUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !portraitMeshRef.current || !rendererRef.current) return;

    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        if (!portraitMeshRef.current || !rendererRef.current) return;
        const maxAniso = rendererRef.current.capabilities.getMaxAnisotropy();
        const newTex = createPortraitCutoutTexture(maxAniso, img);
        const mat = portraitMeshRef.current.material as THREE.MeshStandardMaterial;
        if (mat.map) mat.map.dispose();
        mat.map = newTex;
        mat.needsUpdate = true;
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const HOTSPOTS: {
    id: OrbitObjectTarget;
    name: string;
    purpose: string;
    positionClass: string;
  }[] = [
    {
      id: 'about',
      name: 'Notebook',
      purpose: '01 · About',
      positionClass: 'top-[12%] left-[4%] sm:left-[6%]'
    },
    {
      id: 'work',
      name: 'Campaign Card',
      purpose: '02 · Work',
      positionClass: 'top-[12%] right-[4%] sm:right-[6%]'
    },
    {
      id: 'books',
      name: 'Book',
      purpose: '03 · Books',
      positionClass: 'bottom-[18%] left-[4%] sm:left-[6%]'
    },
    {
      id: 'contact',
      name: 'Laptop',
      purpose: '04 · Contact',
      positionClass: 'bottom-[18%] right-[4%] sm:right-[6%]'
    }
  ];

  return (
    <div
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      className={
        isFullscreen
          ? 'fixed inset-0 z-50 w-screen h-screen bg-[#F4F1EA]'
          : 'relative w-full h-[500px] sm:h-[580px] lg:h-[640px] select-none'
      }
    >
      {/* Hidden input if user wants to swap custom portrait image */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleCustomPortraitUpload}
        className="hidden"
      />

      {/* Dedicated Isolated WebGL Canvas Container (Outside sibling HUD overlays) */}
      <div ref={canvasMountRef} className="w-full h-full" />

      {/* 4 Interactive Orbiting Object Hotspot Buttons */}
      <div className="absolute inset-0 pointer-events-none z-10">
        {HOTSPOTS.map((spot) => {
          const isHovered = hoveredHotspot === spot.id;
          return (
            <button
              key={spot.id}
              type="button"
              onMouseEnter={() => {
                setHoveredHotspot(spot.id);
                onCursorLabelChange?.(spot.purpose);
              }}
              onMouseLeave={() => {
                setHoveredHotspot(null);
                onCursorLabelChange?.(null);
              }}
              onClick={() => {
                if (isFullscreen) setIsFullscreen(false);
                onSelectOrbitTarget(spot.id);
              }}
              className={`pointer-events-auto absolute ${spot.positionClass} group px-3.5 py-2 rounded-full transition-all duration-200 cursor-pointer flex items-center gap-2 border ${
                isHovered
                  ? 'bg-[#171614] text-[#F4F1EA] border-[#A68B6A] scale-105 shadow-lg'
                  : 'bg-[#FFFFFF]/92 text-[#171614] border-[#E2DDD2] hover:border-[#A68B6A] shadow-sm'
              }`}
            >
              <span className="font-mono-tabular text-[10px] tracking-wider uppercase text-[#A68B6A]">
                {spot.purpose}
              </span>
              <span className="text-xs font-semibold whitespace-nowrap">
                {spot.name}
              </span>
              <span className="text-xs text-[#A68B6A] transition-transform duration-150 group-hover:translate-x-0.5">
                ↗
              </span>
            </button>
          );
        })}
      </div>

      {/* Collapsible Unified Bottom Control Dock (Solid rgba surface over WebGL — zero backdrop-filter) */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center max-w-[94vw]">
        <button
          type="button"
          onClick={() => setDockCollapsed((prev) => !prev)}
          className="px-3 py-1 rounded-t-lg bg-[#171614]/90 text-[#F4F1EA] text-[10px] font-mono-tabular tracking-widest uppercase flex items-center gap-1.5 cursor-pointer border-t border-x border-[#3A352F]"
        >
          {dockCollapsed ? (
            <>
              <ChevronUp className="w-3 h-3 text-[#A68B6A]" />
              <span>Show 3D Controls</span>
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 text-[#A68B6A]" />
              <span>Hide Controls</span>
            </>
          )}
        </button>

        {!dockCollapsed && (
          <div className="px-4 py-2.5 rounded-xl bg-[#171614]/95 text-[#F4F1EA] border border-[#3A352F] shadow-xl flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs">
            {/* Z-Depth Separation Slider */}
            <label className="flex items-center gap-2 text-[11px] font-mono-tabular text-[#D6C8B8]">
              <span>Z-Depth</span>
              <input
                type="range"
                min="0.5"
                max="1.8"
                step="0.1"
                value={depthMultiplier}
                onChange={(e) => setDepthMultiplier(parseFloat(e.target.value))}
                className="w-16 sm:w-20 accent-[#A68B6A] cursor-pointer"
              />
            </label>

            {/* Lighting Mood Switcher */}
            <div className="flex items-center gap-1 bg-[#26231F] p-0.5 rounded-lg">
              {(['studio', 'golden', 'cinema'] as const).map((mood) => (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setLightingMood(mood)}
                  className={`px-2 py-1 rounded-md text-[10px] font-mono-tabular uppercase transition-colors cursor-pointer ${
                    lightingMood === mood
                      ? 'bg-[#A68B6A] text-[#171614] font-semibold'
                      : 'text-[#C7B9AA] hover:text-white'
                  }`}
                >
                  {mood}
                </button>
              ))}
            </div>

            {/* Custom Portrait Photo Swap */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Upload your portrait photo onto the 3D frame"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#26231F] hover:bg-[#36312B] text-[11px] text-[#F4F1EA] transition-colors cursor-pointer"
            >
              <Upload className="w-3 h-3 text-[#A68B6A]" />
              <span>Swap Portrait</span>
            </button>

            {/* Full-Viewport 3D Toggle */}
            <button
              type="button"
              onClick={() => setIsFullscreen((prev) => !prev)}
              aria-label={isFullscreen ? 'Exit Fullscreen 3D' : 'Expand 3D Scene'}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#26231F] hover:bg-[#36312B] text-[11px] text-[#A68B6A] transition-colors cursor-pointer"
            >
              {isFullscreen ? (
                <>
                  <Minimize2 className="w-3 h-3" />
                  <span>Exit 3D</span>
                </>
              ) : (
                <>
                  <Maximize2 className="w-3 h-3" />
                  <span>Full 3D</span>
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
