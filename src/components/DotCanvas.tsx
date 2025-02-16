import React, { useEffect, useRef } from "react";

interface DotCanvasProps {
  array: number[];
}

const DotCanvas: React.FC<DotCanvasProps> = ({ array }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas dimensions
    const width = canvas.width;
    const height = canvas.height;
    const dotSize = 6;
    const spacing = width / array.length;

    ctx.clearRect(0, 0, width, height); // Clear the previous frame

    array.forEach((value, index) => {
      const x = index * spacing + spacing / 2;
      const y = height - (value / 100) * height;

      ctx.beginPath();
      ctx.arc(x, y, dotSize, 0, 2 * Math.PI);
      ctx.fillStyle = "white";
      ctx.fill();
    });
  }, [array]); // Redraw every time the array updates

  return <canvas ref={canvasRef} width={600} height={300} className="border" />;
};

export default DotCanvas;
