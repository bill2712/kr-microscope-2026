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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
        <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col md:flex-row">
            
            {/* Header / Tools */}
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
                                        tool !== 'eraser' && color === c ? 'border-white scale-110 ring-2 ring-white/20' : 'border-transparent'
                                    }`}
                                    style={{ backgroundColor: c }}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">{t.journal.tools.pen} / Text</label>
                         <div className="flex flex-col gap-2">
                             <Button 
                                variant={tool === 'eraser' ? 'primary' : 'outline'}
                                onClick={() => setTool('eraser')}
                                fullWidth
                                className="justify-start"
                            >
                                <Eraser size={18} className="mr-2"/> {t.journal.tools.eraser}
                            </Button>
                            
                            <Button 
                                variant={tool === 'text' ? 'primary' : 'outline'}
                                onClick={() => setTool('text')}
                                fullWidth
                                className="justify-start"
                            >
                                <Type size={18} className="mr-2"/> {t.journal.tools.text}
                            </Button>
                         </div>
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
        </div>
    </div>
  );
};
