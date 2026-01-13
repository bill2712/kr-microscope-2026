import React, { useRef, useState, useEffect } from 'react';
import { Translation } from '../types';
import { Button } from './Button';
import { X, Pencil, Eraser, Download, Trash2, Save } from 'lucide-react';

interface JournalCanvasProps {
  image: string;
  lens: string;
  specimenName: string;
  t: Translation;
  onClose: () => void;
}

export const JournalCanvas: React.FC<JournalCanvasProps> = ({
  image,
  lens,
  specimenName,
  t,
  onClose
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<'pen' | 'eraser'>('pen');
  const [color, setColor] = useState('#ef4444'); // Default red
  const [lineWidth, setLineWidth] = useState(2);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load image onto canvas for background
    // We actually want to keep the image separate so we can clear drawing without clearing image,
    // BUT for saving, we need them together.
    // Enhanced approach: Two layers? Or just draw image once.
    // Let's use CSS for the visual background and only draw it to canvas when saving, OR just transparent canvas on top.
    // To enable "Download with drawing", drawing image to canvas first is easier, or compositing at save time.
    // Let's composite at save time to allow clearing drawing easily.
    
    // Set canvas size to match display size
    // For simplicity in this constrained app, let's fix size or adapt
    // Container is 800x800 max usually.
    canvas.width = 600;
    canvas.height = 600;

    // We rely on CSS 'pointer-events-none' on a background image element, 
    // BUT the user wants to "draw on the view". 
    // Let's make the canvas transparent and user sees the image behind it.
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const { offsetX, offsetY } = getCoordinates(e);
    draw(offsetX, offsetY, false);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath(); // Start new path to avoid connecting lines
    }
  };

  const draw = (x: number, y: number, isDragging: boolean) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Coordinate adjustment if scaling happens
    // Simple verification: assume exact match for now
    
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = tool === 'eraser' ? 'rgba(0,0,0,1)' : color;
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';

    if (!isDragging) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } // else continue path

    ctx.lineTo(x, y);
    ctx.stroke();
    
    // For smoother lines, we'd use quadraticCurveTo, but simple lineTo is okay for MVP
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    draw(offsetX, offsetY, true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
      // Touch logic is trickier with offsets, skipping for MVP/Browser specific
      // Assuming Mouse support primarily for this task, but adding basic touch
      if (!isDrawing) return;
      const { offsetX, offsetY } = getCoordinates(e);
      draw(offsetX, offsetY, true);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
      // Helper to get coords relative to canvas
       const canvas = canvasRef.current;
       if (!canvas) return { offsetX: 0, offsetY: 0 };
       
       if ('touches' in e) {
           const rect = canvas.getBoundingClientRect();
           return {
               offsetX: e.touches[0].clientX - rect.left,
               offsetY: e.touches[0].clientY - rect.top
           };
       }
       return {
           offsetX: (e as React.MouseEvent).nativeEvent.offsetX,
           offsetY: (e as React.MouseEvent).nativeEvent.offsetY
       };
  };
  
  const clearCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
  };

  const handleSave = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Create a temporary canvas to composite image + drawing
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tCtx = tempCanvas.getContext('2d');
      if (!tCtx) return;

      // 1. Draw Image
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = image;
      img.onload = () => {
          // Draw image to fit/cover
          // Basic aspect ratio handling: Draw center crop or stretch
          tCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

          // 2. Draw existing canvas (drawings) on top
          tCtx.drawImage(canvas, 0, 0);

          // 3. Add Metadata text (optional but nice)
          tCtx.font = "bold 20px Arial";
          tCtx.fillStyle = "white";
          tCtx.shadowColor = "black";
          tCtx.shadowBlur = 4;
          tCtx.fillText(`${specimenName} @ ${lens}`, 20, 40);

          // 4. Download
          const link = document.createElement('a');
          link.download = `kidrise-journal-${Date.now()}.png`;
          link.href = tempCanvas.toDataURL('image/png');
          link.click();
          
          setShowSaveSuccess(true);
          setTimeout(() => setShowSaveSuccess(false), 2000);
      };
      
      // Handle cached images that load instantly
      if (img.complete) {
          img.onload!(new Event('load'));
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col md:flex-row">
            
            {/* Header / Tools - Mobile: Top, Desktop: Side */}
            <div className="p-6 bg-slate-800 border-b md:border-b-0 md:border-r border-slate-700 flex flex-col gap-6 md:w-64 z-10">
                <div>
                    <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-400">
                        {t.journal.title}
                    </h2>
                    <p className="text-slate-400 text-sm mt-2">{t.journal.drawHint}</p>
                </div>

                <div className="space-y-4 flex-1">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.journal.tools.pen}</label>
                        <div className="flex gap-2">
                            {['#ef4444', '#22d3ee', '#facc15', '#ffffff'].map(c => (
                                <button
                                    key={c}
                                    onClick={() => { setColor(c); setTool('pen'); }}
                                    className={`w-10 h-10 rounded-full border-2 transition-transform hover:scale-110 ${
                                        tool === 'pen' && color === c ? 'border-white scale-110 ring-2 ring-white/20' : 'border-transparent'
                                    }`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.journal.tools.eraser}</label>
                         <Button 
                            variant={tool === 'eraser' ? 'primary' : 'outline'}
                            onClick={() => setTool('eraser')}
                            fullWidth
                            className="justify-start"
                        >
                            <Eraser size={18} className="mr-2"/> {t.journal.tools.eraser}
                        </Button>
                    </div>

                     <div className="space-y-2">
                       <Button 
                            variant="ghost"
                            onClick={clearCanvas}
                            fullWidth
                            className="justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        >
                            <Trash2 size={18} className="mr-2"/> {t.journal.tools.clear}
                        </Button>
                    </div>
                </div>

                 <div className="mt-auto space-y-3 pt-6 border-t border-slate-700">
                    <Button 
                        variant="accent" 
                        size="lg" 
                        fullWidth 
                        onClick={handleSave}
                        className="shadow-lg shadow-green-900/20"
                    >
                        {showSaveSuccess ? <span className="flex items-center"><Save className="mr-2"/> {t.journal.saveSuccess}</span> : <span className="flex items-center"><Download className="mr-2"/> {t.journal.tools.save}</span>}
                    </Button>
                    <Button variant="ghost" fullWidth onClick={onClose}>
                        {t.journal.tools.close}
                    </Button>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 relative bg-black flex items-center justify-center p-4 md:p-8 overflow-hidden">
                <div className="relative shadow-2xl rounded-lg overflow-hidden ring-1 ring-slate-800" style={{ width: 600, height: 600 }}>
                    {/* Background Image - Not part of canvas interaction directly, just visual underlay */}
                    <img 
                        src={image} 
                        alt="Specimen" 
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                    />
                    
                    {/* Drawing Canvas */}
                    <canvas
                        ref={canvasRef}
                        className="absolute inset-0 w-full h-full cursor-crosshair touch-none"
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onMouseMove={handleMouseMove}
                        onTouchStart={startDrawing}
                        onTouchEnd={stopDrawing}
                        onTouchMove={handleTouchMove}
                    />
                </div>
            </div>
        </div>
    </div>
  );
};
