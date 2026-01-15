import React, { useRef, useState, useEffect } from 'react';
import { Translation } from '../types';
import { Button } from './Button';
import { X, Pencil, Eraser, Download, Trash2, Save, Type } from 'lucide-react';

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
  const [tool, setTool] = useState<'pen' | 'eraser' | 'text'>('pen');
  const [color, setColor] = useState('#ef4444'); // Default red
  const [lineWidth, setLineWidth] = useState(2);
  const [texts, setTexts] = useState<Array<{x: number, y: number, text: string, color: string}>>([]);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 600;
    canvas.height = 600;
  }, []);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    if (tool === 'text') {
        // Handle Text Input
        const { offsetX, offsetY } = getCoordinates(e);
        const text = prompt("Enter text / 輸入文字:");
        if (text) {
            setTexts(prev => [...prev, { x: offsetX, y: offsetY, text, color }]);
        }
        return;
    }

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

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = tool === 'eraser' ? 'rgba(0,0,0,1)' : color;
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';

    if (!isDragging) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = e.nativeEvent;
    draw(offsetX, offsetY, true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
      if (!isDrawing) return;
      const { offsetX, offsetY } = getCoordinates(e);
      draw(offsetX, offsetY, true);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
       const canvas = canvasRef.current;
       if (!canvas) return { offsetX: 0, offsetY: 0 };
       
       const rect = canvas.getBoundingClientRect();
       const scaleX = canvas.width / rect.width;
       const scaleY = canvas.height / rect.height;

       if ('touches' in e) {
           return {
               offsetX: (e.touches[0].clientX - rect.left) * scaleX,
               offsetY: (e.touches[0].clientY - rect.top) * scaleY
           };
       }
       
       // For mouse, we can also use clientX/clientY to be consistent with scaling
       return {
           offsetX: ((e as React.MouseEvent).clientX - rect.left) * scaleX,
           offsetY: ((e as React.MouseEvent).clientY - rect.top) * scaleY
       };
  };
  
  const clearCanvas = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (canvas && ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      setTexts([]); // Clear texts too
  };

  const handleSave = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      const tCtx = tempCanvas.getContext('2d');
      if (!tCtx) return;

      const img = new Image();
      img.crossOrigin = "anonymous"; 
      img.src = image;
      
      const doSave = () => {
           // 1. Draw Image
          tCtx.drawImage(img, 0, 0, tempCanvas.width, tempCanvas.height);

          // 2. Draw Drawings
          tCtx.drawImage(canvas, 0, 0);
          
          // 3. Draw Texts
          tCtx.font = "bold 20px Arial";
          tCtx.textBaseline = "middle";
          texts.forEach(t => {
              tCtx.fillStyle = t.color;
              tCtx.shadowColor = "black";
              tCtx.shadowBlur = 2;
              tCtx.fillText(t.text, t.x, t.y);
          });

          // 4. Metadata
          tCtx.fillStyle = "white";
          tCtx.shadowColor = "black";
          tCtx.shadowBlur = 4;
          tCtx.fillText(`${specimenName} @ ${lens}`, 20, 40);

          // 5. Download
          try {
              const link = document.createElement('a');
              link.download = `kidrise-journal-${Date.now()}.png`;
              link.href = tempCanvas.toDataURL('image/png');
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              setShowSaveSuccess(true);
              setTimeout(() => setShowSaveSuccess(false), 2000);
          } catch (err) {
              console.error("Save failed", err);
              alert("Save failed. Try taking a screenshot!");
          }
      };

      if (img.complete) {
          doSave();
      } else {
          img.onload = doSave;
          img.onerror = () => {
              // Fallback if image fails (CORS etc) -> Just save drawing
              alert("Background image failed to load for save. Saving drawing only.");
              tCtx.fillStyle = "black";
              tCtx.fillRect(0,0, tempCanvas.width, tempCanvas.height);
              tCtx.drawImage(canvas, 0, 0);
               texts.forEach(t => {
                  tCtx.fillStyle = t.color;
                  tCtx.fillText(t.text, t.x, t.y);
              });
              const link = document.createElement('a');
              link.download = `kidrise-journal-drawing-${Date.now()}.png`;
              link.href = tempCanvas.toDataURL('image/png');
              link.click();
          };
      }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-0 md:p-4 animate-in fade-in duration-200">
        <div className="relative w-full h-full md:h-auto md:max-h-[90vh] max-w-4xl bg-slate-900 md:rounded-3xl border-none md:border border-slate-700 shadow-2xl overflow-hidden flex flex-col md:flex-row">
            
            {/* Mobile Header (Only visible on mobile) */}
            <div className="md:hidden p-4 bg-slate-800 border-b border-slate-700 flex justify-between items-center shrink-0">
                <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-400">
                    {t.journal.title}
                </h2>
                <Button variant="ghost" size="sm" onClick={onClose}>
                    <X size={24} />
                </Button>
            </div>

            {/* Canvas Area - Takes available space */}
            <div className="flex-1 relative bg-black flex items-center justify-center p-4 overflow-hidden touch-none">
                <div className="relative shadow-2xl rounded-lg overflow-hidden ring-1 ring-slate-800 w-full max-w-[600px] aspect-square">
                    {/* Background Image */}
                    <img 
                        src={image} 
                        alt="Specimen" 
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
                    />
                    
                    {/* Text Layer (Visual Only) */}
                    {texts.map((t, i) => (
                        <div 
                            key={i} 
                            className="absolute pointer-events-none font-bold text-xl drop-shadow-md select-none"
                            style={{ left: t.x, top: t.y, color: t.color, transform: 'translate(0, -50%)' }}
                        >
                            {t.text}
                        </div>
                    ))}

                    {/* Drawing Canvas */}
                    <canvas
                        ref={canvasRef}
                        className={`absolute inset-0 w-full h-full touch-none ${tool === 'text' ? 'cursor-text' : 'cursor-crosshair'}`}
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

            {/* Tools Panel - Bottom on Mobile, Left on Desktop */}
            <div className="p-4 md:p-6 bg-slate-800 border-t md:border-t-0 md:border-r border-slate-700 flex flex-row md:flex-col gap-3 md:gap-6 md:w-64 z-10 shrink-0 overflow-x-auto md:overflow-x-visible md:overflow-y-auto order-last md:order-first">
                <div className="hidden md:block">
                    <h2 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-amber-400">
                        {t.journal.title}
                    </h2>
                    <p className="text-slate-400 text-xs md:text-sm mt-1 md:mt-2">{t.journal.drawHint}</p>
                </div>

                {/* Color Picker */}
                <div className="flex items-center md:items-start flex-col gap-1 md:gap-2 shrink-0">
                    <label className="text-[10px] md:text-xs font-bold text-slate-500 uppercase tracking-wider hidden md:block">{t.journal.tools.pen}</label>
                    <div className="flex gap-2">
                        {['#ef4444', '#22d3ee', '#facc15', '#ffffff'].map(c => (
                            <button
                                key={c}
                                onClick={() => { setColor(c); setTool('pen'); }}
                                className={`w-8 h-8 rounded-full border-2 transition-transform ${
                                    tool !== 'eraser' && color === c ? 'border-white scale-110 ring-2 ring-white/20' : 'border-transparent'
                                }`}
                                style={{ backgroundColor: c }}
                            />
                        ))}
                    </div>
                </div>

                {/* Tool Buttons */}
                <div className="flex md:flex-col gap-2 shrink-0">
                     <button 
                        onClick={() => setTool('eraser')}
                        className={`p-2 rounded-lg border ${tool === 'eraser' ? 'bg-primary border-primary text-white' : 'bg-transparent border-slate-600 text-slate-400'}`}
                    >
                        <Eraser size={20} />
                    </button>
                    <button 
                        onClick={() => setTool('text')}
                        className={`p-2 rounded-lg border ${tool === 'text' ? 'bg-primary border-primary text-white' : 'bg-transparent border-slate-600 text-slate-400'}`}
                    >
                        <Type size={20} />
                    </button>
                     <button 
                        onClick={clearCanvas}
                        className="p-2 rounded-lg border border-red-900/50 text-red-400 hover:bg-red-900/20"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>

                 <div className="md:mt-auto md:space-y-3 md:pt-6 md:border-t md:border-slate-700 flex md:flex-col gap-2 ml-auto md:ml-0">
                    <Button 
                        variant="accent" 
                        size={window.innerWidth < 768 ? 'md' : 'lg'} 
                        onClick={handleSave}
                        className="shadow-lg shadow-green-900/20 text-sm md:text-base whitespace-nowrap"
                    >
                        {showSaveSuccess ? <span className="flex items-center"><Save className="mr-2"/> <span className="hidden md:inline">{t.journal.saveSuccess}</span></span> : <span className="flex items-center"><Download className="mr-2"/> <span className="hidden md:inline">{t.journal.tools.save}</span><span className="md:hidden">Save</span></span>}
                    </Button>
                    <Button variant="ghost" onClick={onClose} className="hidden md:flex text-sm md:text-base py-2">
                        {t.journal.tools.close}
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
};
