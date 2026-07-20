'use client';

import { useEffect, useRef, useState } from 'react';

interface Hotspot {
  text: string;
  x: number; // 3D coordinates of target
  y: number;
  z: number;
  labelX: number; // 2D offset for label placement
  labelY: number;
  angleRange: [number, number]; // Rotation angles in degrees where this hotspot is visible
}

interface Product3DViewerProps {
  subcategory: string;
  productName: string;
  videoUrl?: string;
}

export function Product3DViewer({ subcategory, productName, videoUrl }: Product3DViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [rotation, setRotation] = useState(0); // in degrees (0 - 360)
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [autoRotate, setAutoRotate] = useState(true);
  const [viewMode, setViewMode] = useState<'canvas' | 'video'>(videoUrl ? 'video' : 'canvas');

  const isTable = subcategory.includes('table');

  // Define interactive hotspots for the product
  const hotspots: Hotspot[] = isTable
    ? [
        {
          text: 'Solid Walnut Wood Top',
          x: 0, y: -20, z: 0,
          labelX: -120, labelY: -40,
          angleRange: [0, 360]
        },
        {
          text: 'Dual-Motor Power Lift',
          x: -30, y: 15, z: 0,
          labelX: -140, labelY: 20,
          angleRange: [40, 220]
        },
        {
          text: 'Digital LED Control Pad',
          x: 35, y: -15, z: 20,
          labelX: 100, labelY: -30,
          angleRange: [280, 80]
        },
        {
          text: 'Heavy Duty Steel Feet',
          x: 0, y: 60, z: 0,
          labelX: 120, labelY: 30,
          angleRange: [0, 360]
        }
      ]
    : [
        {
          text: '3D Adjustable Headrest',
          x: 0, y: -70, z: 0,
          labelX: -140, labelY: -30,
          angleRange: [300, 60]
        },
        {
          text: 'Ergonomic Mesh Support',
          x: 0, y: -20, z: -5,
          labelX: 140, labelY: -20,
          angleRange: [120, 240]
        },
        {
          text: '3D Polyurethane Armrests',
          x: 28, y: 15, z: 10,
          labelX: 120, labelY: 10,
          angleRange: [260, 100]
        },
        {
          text: 'Plush Memory Foam Seat',
          x: 0, y: 25, z: 5,
          labelX: -150, labelY: 15,
          angleRange: [0, 360]
        },
        {
          text: 'Polished Aluminium Base',
          x: 0, y: 70, z: 0,
          labelX: 130, labelY: 40,
          angleRange: [0, 360]
        }
      ];

  // Auto-rotation logic when not dragging
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.3) % 360);
    }, 16);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Canvas drawing loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas resolution with high DPI support
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    const width = rect.width;
    const height = rect.height;
    const centerX = width / 2;
    const centerY = height / 2 - 10;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Convert rotation to radians
    const rad = (rotation * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    // 3D Point projection helper
    const project = (x: number, y: number, z: number) => {
      // Rotate around Y axis
      const rx = x * cos - z * sin;
      const rz = x * sin + z * cos;
      const ry = y;

      // Perspective projection
      const focalLength = 220;
      const distance = 250;
      const scale = focalLength / (focalLength + rz + distance);
      
      return {
        x: centerX + rx * scale * 260,
        y: centerY + ry * scale * 260,
        visible: rz + distance > 0,
        rz: rz // keep track of depth
      };
    };

    // Draw grid floor (SuperErgo luxury vibe)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
    ctx.lineWidth = 1;
    for (let i = -5; i <= 5; i++) {
      const p1 = project(i * 15, 80, -75);
      const p2 = project(i * 15, 80, 75);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      const p3 = project(-75, 80, i * 15);
      const p4 = project(75, 80, i * 15);
      ctx.beginPath();
      ctx.moveTo(p3.x, p3.y);
      ctx.lineTo(p4.x, p4.y);
      ctx.stroke();
    }

    // DRAW MODELS
    if (isTable) {
      // ─── DRAW DESK (TABLE) ───
      // Desktop Corners
      const w = 45; // desktop width
      const d = 25; // desktop depth
      const t = 3;  // desktop thickness
      const h = -15; // desktop height level

      const topCorners = [
        project(-w, h, -d),
        project(w, h, -d),
        project(w, h, d),
        project(-w, h, d),
      ];

      const bottomCorners = [
        project(-w, h + t, -d),
        project(w, h + t, -d),
        project(w, h + t, d),
        project(-w, h + t, d),
      ];

      // Draw desktop panels
      ctx.fillStyle = 'rgba(163, 230, 53, 0.05)';
      ctx.beginPath();
      ctx.moveTo(topCorners[0].x, topCorners[0].y);
      for (let i = 1; i < 4; i++) ctx.lineTo(topCorners[i].x, topCorners[i].y);
      ctx.closePath();
      ctx.fill();

      // Desktop outer wireframe
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(topCorners[0].x, topCorners[0].y);
      for (let i = 1; i < 4; i++) ctx.lineTo(topCorners[i].x, topCorners[i].y);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(bottomCorners[0].x, bottomCorners[0].y);
      for (let i = 1; i < 4; i++) ctx.lineTo(bottomCorners[i].x, bottomCorners[i].y);
      ctx.closePath();
      ctx.stroke();

      // Connecting edges of desktop thickness
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(topCorners[i].x, topCorners[i].y);
        ctx.lineTo(bottomCorners[i].x, bottomCorners[i].y);
        ctx.stroke();
      }

      // Draw Desk Legs (Steel Frame)
      const legOffset = 30;
      const legYStart = h + t;
      const legYEnd = 65;

      const legs = [
        // Left Leg
        { top: project(-legOffset, legYStart, 0), bottom: project(-legOffset, legYEnd, 0) },
        // Right Leg
        { top: project(legOffset, legYStart, 0), bottom: project(legOffset, legYEnd, 0) },
      ];

      ctx.strokeStyle = '#a3e635'; // BESO Lime
      ctx.lineWidth = 3;
      legs.forEach(leg => {
        ctx.beginPath();
        ctx.moveTo(leg.top.x, leg.top.y);
        ctx.lineTo(leg.bottom.x, leg.bottom.y);
        ctx.stroke();
      });

      // Desk feet (Horizontal beams)
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      const leftFootStart = project(-legOffset, legYEnd, -15);
      const leftFootEnd = project(-legOffset, legYEnd, 15);
      ctx.beginPath();
      ctx.moveTo(leftFootStart.x, leftFootStart.y);
      ctx.lineTo(leftFootEnd.x, leftFootEnd.y);
      ctx.stroke();

      const rightFootStart = project(legOffset, legYEnd, -15);
      const rightFootEnd = project(legOffset, legYEnd, 15);
      ctx.beginPath();
      ctx.moveTo(rightFootStart.x, rightFootStart.y);
      ctx.lineTo(rightFootEnd.x, rightFootEnd.y);
      ctx.stroke();

    } else {
      // ─── DRAW CHAIR ───
      // 1. Headrest
      ctx.strokeStyle = '#a3e635';
      ctx.lineWidth = 2.5;
      const hrLeft = project(-12, -75, 0);
      const hrRight = project(12, -75, 0);
      const hrTop = project(0, -82, 0);
      const hrBottom = project(0, -68, 0);
      
      ctx.beginPath();
      ctx.ellipse(
        (hrLeft.x + hrRight.x) / 2,
        (hrTop.y + hrBottom.y) / 2,
        Math.abs(hrRight.x - hrLeft.x) / 2 || 12,
        Math.abs(hrBottom.y - hrTop.y) / 2 || 6,
        0, 0, 2 * Math.PI
      );
      ctx.stroke();

      // Headrest mount stem
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      const hrStemTop = project(0, -68, -2);
      const hrStemBot = project(0, -56, -4);
      ctx.beginPath();
      ctx.moveTo(hrStemTop.x, hrStemTop.y);
      ctx.lineTo(hrStemBot.x, hrStemBot.y);
      ctx.stroke();

      // 2. Backrest (Contoured Mesh Grid)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
      ctx.lineWidth = 1;
      
      const backSegmentsY = 10;
      const backSegmentsX = 6;
      const backPoints: any[][] = [];

      for (let i = 0; i <= backSegmentsY; i++) {
        const yPct = i / backSegmentsY;
        const cy = -55 + yPct * 65; // from y = -55 (top of backrest) to y = 10 (bottom)
        const maxWidth = 20 - Math.pow(yPct - 0.4, 2) * 15; // curved profile
        
        // Z contour (curved back support)
        const cz = -10 + Math.sin(yPct * Math.PI) * 8;

        const row: any[] = [];
        for (let j = 0; j <= backSegmentsX; j++) {
          const xPct = j / backSegmentsX;
          const cx = -maxWidth + xPct * maxWidth * 2;
          row.push(project(cx, cy, cz));
        }
        backPoints.push(row);
      }

      // Draw horizontal spline curves of mesh backrest
      backPoints.forEach(row => {
        ctx.beginPath();
        ctx.moveTo(row[0].x, row[0].y);
        for (let j = 1; j < row.length; j++) {
          ctx.lineTo(row[j].x, row[j].y);
        }
        ctx.stroke();
      });

      // Draw vertical spline curves
      for (let j = 0; j <= backSegmentsX; j++) {
        ctx.beginPath();
        ctx.moveTo(backPoints[0][j].x, backPoints[0][j].y);
        for (let i = 1; i <= backSegmentsY; i++) {
          ctx.lineTo(backPoints[i][j].x, backPoints[i][j].y);
        }
        ctx.stroke();
      }

      // Backrest outer frame
      ctx.strokeStyle = '#a3e635';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(backPoints[0][0].x, backPoints[0][0].y);
      // top edge
      for (let j = 1; j <= backSegmentsX; j++) ctx.lineTo(backPoints[0][j].x, backPoints[0][j].y);
      // right edge
      for (let i = 1; i <= backSegmentsY; i++) ctx.lineTo(backPoints[i][backSegmentsX].x, backPoints[i][backSegmentsX].y);
      // bottom edge
      for (let j = backSegmentsX - 1; j >= 0; j--) ctx.lineTo(backPoints[backSegmentsY][j].x, backPoints[backSegmentsY][j].y);
      // left edge
      for (let i = backSegmentsY - 1; i >= 0; i--) ctx.lineTo(backPoints[i][0].x, backPoints[i][0].y);
      ctx.closePath();
      ctx.stroke();

      // Spine spine frame (thick back brace)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 3;
      const spineTop = project(0, -56, -6);
      const spineMid = project(0, -20, -11);
      const spineBot = project(0, 10, -7);
      ctx.beginPath();
      ctx.moveTo(spineTop.x, spineTop.y);
      ctx.quadraticCurveTo(spineMid.x, spineMid.y, spineBot.x, spineBot.y);
      ctx.stroke();

      // 3. Seat Cushion
      const seatY = 22;
      const seatW = 22;
      const seatD = 22;
      const seatThickness = 5;

      const seatTopCorners = [
        project(-seatW, seatY, -seatD),
        project(seatW, seatY, -seatD),
        project(seatW, seatY, seatD),
        project(-seatW, seatY, seatD),
      ];

      const seatBotCorners = [
        project(-seatW, seatY + seatThickness, -seatD),
        project(seatW, seatY + seatThickness, -seatD),
        project(seatW, seatY + seatThickness, seatD),
        project(-seatW, seatY + seatThickness, seatD),
      ];

      // Draw seat cushion wireframe
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 1.5;
      ctx.fillStyle = 'rgba(28, 28, 28, 0.6)';
      
      // Top face
      ctx.beginPath();
      ctx.moveTo(seatTopCorners[0].x, seatTopCorners[0].y);
      for (let i = 1; i < 4; i++) ctx.lineTo(seatTopCorners[i].x, seatTopCorners[i].y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Side segments
      ctx.beginPath();
      ctx.moveTo(seatBotCorners[0].x, seatBotCorners[0].y);
      for (let i = 1; i < 4; i++) ctx.lineTo(seatBotCorners[i].x, seatBotCorners[i].y);
      ctx.closePath();
      ctx.stroke();

      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(seatTopCorners[i].x, seatTopCorners[i].y);
        ctx.lineTo(seatBotCorners[i].x, seatBotCorners[i].y);
        ctx.stroke();
      }

      // 4. Armrests
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2.5;

      // Left Armrest
      const laSupportStart = project(-seatW - 1, seatY + 3, 0);
      const laSupportEnd = project(-seatW - 2, seatY - 10, 2);
      const laPadStart = project(-seatW - 4, seatY - 10, -8);
      const laPadEnd = project(-seatW, seatY - 10, 8);

      ctx.beginPath();
      ctx.moveTo(laSupportStart.x, laSupportStart.y);
      ctx.lineTo(laSupportEnd.x, laSupportEnd.y);
      ctx.stroke();

      ctx.strokeStyle = '#a3e635';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(laPadStart.x, laPadStart.y);
      ctx.lineTo(laPadEnd.x, laPadEnd.y);
      ctx.stroke();

      // Right Armrest
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2.5;
      const raSupportStart = project(seatW + 1, seatY + 3, 0);
      const raSupportEnd = project(seatW + 2, seatY - 10, 2);
      const raPadStart = project(seatW, seatY - 10, -8);
      const raPadEnd = project(seatW + 4, seatY - 10, 8);

      ctx.beginPath();
      ctx.moveTo(raSupportStart.x, raSupportStart.y);
      ctx.lineTo(raSupportEnd.x, raSupportEnd.y);
      ctx.stroke();

      ctx.strokeStyle = '#a3e635';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(raPadStart.x, raPadStart.y);
      ctx.lineTo(raPadEnd.x, raPadEnd.y);
      ctx.stroke();

      // 5. Gas Lift Cylinder / Column
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 3.5;
      const cylTop = project(0, seatY + seatThickness, 0);
      const cylBot = project(0, 50, 0);
      ctx.beginPath();
      ctx.moveTo(cylTop.x, cylTop.y);
      ctx.lineTo(cylBot.x, cylBot.y);
      ctx.stroke();

      // 6. Five-star Base Spokes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.35)';
      ctx.lineWidth = 2.5;
      const baseCenter = project(0, 52, 0);
      
      const baseRadius = 24;
      const angles = [0, 72, 144, 216, 288];
      
      angles.forEach((ang) => {
        const radAng = (ang * Math.PI) / 180;
        // spokes radiate outward
        const spokeEnd = project(
          baseRadius * Math.cos(radAng),
          60,
          baseRadius * Math.sin(radAng)
        );
        ctx.beginPath();
        ctx.moveTo(baseCenter.x, baseCenter.y);
        ctx.lineTo(spokeEnd.x, spokeEnd.y);
        ctx.stroke();

        // Castors (wheels)
        ctx.fillStyle = '#a3e635';
        ctx.beginPath();
        ctx.arc(spokeEnd.x, spokeEnd.y + 3, 3, 0, 2 * Math.PI);
        ctx.fill();
      });
    }

    // DRAW ACTIVE HOTSPOTS (Volumetric labels pointing to features)
    hotspots.forEach((hs) => {
      // Check if visible at current angle
      const [start, end] = hs.angleRange;
      let isVisible = false;
      if (start <= end) {
        isVisible = rotation >= start && rotation <= end;
      } else {
        isVisible = rotation >= start || rotation <= end; // wraps around 360
      }

      if (!isVisible) return;

      const pt = project(hs.x, hs.y, hs.z);
      if (!pt.visible) return;

      // Draw Pulse Dot on the chair point
      ctx.fillStyle = '#a3e635';
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, 2 * Math.PI);
      ctx.fill();

      // Ripple effect
      const rippleSize = 4 + (Date.now() % 1000) / 125;
      ctx.strokeStyle = 'rgba(163, 230, 53, 0.3)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, rippleSize, 0, 2 * Math.PI);
      ctx.stroke();

      // Lead line to text box
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.setLineDash([2, 2]);
      ctx.beginPath();
      ctx.moveTo(pt.x, pt.y);
      
      const textX = pt.x + hs.labelX;
      const textY = pt.y + hs.labelY;
      ctx.lineTo(textX, textY);
      ctx.stroke();
      ctx.setLineDash([]); // reset

      // Text box border and backing
      ctx.fillStyle = 'rgba(16, 16, 16, 0.8)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 1;

      const paddingX = 12;
      const paddingY = 6;
      ctx.font = '500 11px Inter, sans-serif';
      const textWidth = ctx.measureText(hs.text).width;
      const boxW = textWidth + paddingX * 2;
      const boxH = 22;
      const boxX = textX - boxW / 2;
      const boxY = textY - boxH / 2;

      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxW, boxH, 4);
      ctx.fill();
      ctx.stroke();

      // Text inside box
      ctx.fillStyle = '#ffffff';
      ctx.fillText(hs.text, boxX + paddingX, boxY + 15);
    });

  }, [rotation, isTable, hotspots]);

  // ─── 3D Video Ping-Pong (Back-and-Forth) & Drag Engine ──────────────────────
  const [videoDirection, setVideoDirection] = useState<'forward' | 'backward'>('forward');
  const [isVideoInteracting, setIsVideoInteracting] = useState(false);
  const videoDragStartRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (viewMode !== 'video' || !videoRef.current) return;
    const video = videoRef.current;
    let lastTime = performance.now();

    const updateVideoLoop = (now: number) => {
      if (!video || isVideoInteracting) {
        animationFrameRef.current = requestAnimationFrame(updateVideoLoop);
        return;
      }

      const delta = (now - lastTime) / 1000;
      lastTime = now;

      const duration = video.duration || 8;

      if (videoDirection === 'forward') {
        if (video.paused) {
          video.play().catch(() => {});
        }
        if (video.currentTime >= duration - 0.15) {
          setVideoDirection('backward');
          video.pause();
        }
      } else {
        // Reverse playback by stepping currentTime backwards
        if (!video.paused) {
          video.pause();
        }
        let nextTime = video.currentTime - delta * 0.9;
        if (nextTime <= 0.15) {
          nextTime = 0.15;
          setVideoDirection('forward');
        }
        try {
          video.currentTime = nextTime;
        } catch (_) {}
      }

      animationFrameRef.current = requestAnimationFrame(updateVideoLoop);
    };

    animationFrameRef.current = requestAnimationFrame(updateVideoLoop);

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [viewMode, videoDirection, isVideoInteracting]);

  // Handle Video Drag / Scrubbing
  const handleVideoMouseDown = (e: React.MouseEvent) => {
    if (!videoRef.current) return;
    setIsVideoInteracting(true);
    videoDragStartRef.current = e.clientX;
    videoRef.current.pause();
  };

  const handleVideoMouseMove = (e: React.MouseEvent) => {
    if (!isVideoInteracting || !videoRef.current) return;
    const video = videoRef.current;
    const duration = video.duration || 8;
    const delta = e.clientX - videoDragStartRef.current;
    videoDragStartRef.current = e.clientX;

    // Dragging right moves forward, dragging left moves backward
    let nextTime = video.currentTime + (delta / 300) * (duration / 2);
    if (nextTime < 0) nextTime = 0;
    if (nextTime > duration) nextTime = duration;
    try {
      video.currentTime = nextTime;
    } catch (_) {}
  };

  const handleVideoMouseUp = () => {
    setIsVideoInteracting(false);
  };

  const handleVideoTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1 || !videoRef.current) return;
    setIsVideoInteracting(true);
    videoDragStartRef.current = e.touches[0].clientX;
    videoRef.current.pause();
  };

  const handleVideoTouchMove = (e: React.TouchEvent) => {
    if (!isVideoInteracting || !videoRef.current || e.touches.length !== 1) return;
    const video = videoRef.current;
    const duration = video.duration || 8;
    const delta = e.touches[0].clientX - videoDragStartRef.current;
    videoDragStartRef.current = e.touches[0].clientX;

    let nextTime = video.currentTime + (delta / 300) * (duration / 2);
    if (nextTime < 0) nextTime = 0;
    if (nextTime > duration) nextTime = duration;
    try {
      video.currentTime = nextTime;
    } catch (_) {}
  };

  // Touch and drag event handlers for canvas mouse rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setAutoRotate(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStart;
    setRotation((prev) => {
      let next = prev - delta * 0.5;
      if (next < 0) next += 360;
      return next % 360;
    });
    setDragStart(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setAutoRotate(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const delta = e.touches[0].clientX - dragStart;
    setRotation((prev) => {
      let next = prev - delta * 0.6;
      if (next < 0) next += 360;
      return next % 360;
    });
    setDragStart(e.touches[0].clientX);
  };

  // Re-enable auto-rotate when mouse leaves
  const handleMouseEnter = () => {
    setAutoRotate(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setIsVideoInteracting(false);
    setAutoRotate(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-square md:aspect-[4/3] bg-black/40 border border-white/[0.04] rounded-3xl overflow-hidden flex items-center justify-center cursor-grab active:cursor-grabbing select-none group"
      onMouseDown={viewMode === 'canvas' ? handleMouseDown : handleVideoMouseDown}
      onMouseMove={viewMode === 'canvas' ? handleMouseMove : handleVideoMouseMove}
      onMouseUp={viewMode === 'canvas' ? handleMouseUp : handleVideoMouseUp}
      onTouchStart={viewMode === 'canvas' ? handleTouchStart : handleVideoTouchStart}
      onTouchMove={viewMode === 'canvas' ? handleTouchMove : handleVideoTouchMove}
      onTouchEnd={viewMode === 'canvas' ? handleMouseUp : handleVideoMouseUp}
      onMouseEnter={viewMode === 'canvas' ? handleMouseEnter : undefined}
      onMouseLeave={viewMode === 'canvas' ? handleMouseLeave : handleVideoMouseUp}
    >
      {/* Visual background details */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-beso-lime/5 rounded-full blur-[80px] pointer-events-none group-hover:bg-beso-lime/10 transition-all duration-500" />
      
      {viewMode === 'video' && videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover z-10 rounded-3xl pointer-events-none"
        />
      ) : (
        /* 3D Canvas element */
        <canvas
          ref={canvasRef}
          className="w-full h-full block z-10"
          style={{ touchAction: 'none' }}
        />
      )}

      {/* Guide text */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-[10px] text-white/40 tracking-widest uppercase flex items-center gap-2 pointer-events-none bg-black/50 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-beso-lime animate-pulse">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
        {viewMode === 'video' ? 'Interactive 3D Video (Drag or let auto-bounce)' : 'Drag or swipe to rotate 360°'}
      </div>

      {/* Mode Switcher Buttons */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 bg-black/60 border border-white/10 p-1 rounded-full backdrop-blur-md">
        {videoUrl && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewMode('video');
            }}
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
              viewMode === 'video'
                ? 'bg-beso-lime text-black shadow-md'
                : 'text-white/60 hover:text-white'
            }`}
          >
            Veo 3D Video
          </button>
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setViewMode('canvas');
          }}
          className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
            viewMode === 'canvas'
              ? 'bg-beso-lime text-black shadow-md'
              : 'text-white/60 hover:text-white'
          }`}
        >
          Interactive 3D
        </button>
      </div>

      {/* Floating Tag */}
      <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-white/70 tracking-wider backdrop-blur-sm pointer-events-none font-medium flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-beso-lime animate-ping" />
        {productName} 3D Engine
      </div>
    </div>
  );
}
