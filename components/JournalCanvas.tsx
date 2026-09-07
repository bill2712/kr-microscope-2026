import React, { useRef, useState, useEffect } from 'react';
import { Translation } from '../types';
import { Button } from './Button';
import { PageHeader } from './PageHeader';
import { Pencil, Eraser, Download, Trash2, Save, Type, Stamp, Circle, RotateCcw, HelpCircle, Hexagon, Star, MousePointer, Image as ImageIcon } from 'lucide-react';
import { exportCanvasAsPdf } from '../utils/exportPdf';

interface JournalCanvasProps {
  image: string;
  lens: string;
  specimenName: string;
  t: Translation;
  onClose: () => void;
  onJournalSaved?: () => void;
  onPdfExported?: () => void;
}

type Tool = 'pen' | 'eraser' | 'text' | 'stamp';
type StampType = 'nucleus' | 'cellWall' | 'pointer' | 'question' | 'star';

interface DrawObject {
  type: 'path' | 'text' | 'stamp';
  // Path
  path?: { x: number, y: number }[];
  color?: string;
  width?: number;
  // Text & Stamp
  x?: number;
  y?: number;
  content?: string; // Text string or StampType
}

export const JournalCanvas: React.FC<JournalCanvasProps> = ({
  image,
  lens,
  specimenName,
  t,
  onClose,
  onJournalSaved,
  onPdfExported,
}) => {
  const isChinese = /[\u3400-\u9fff]/.test(t.journal.labReport.title);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<Tool>('pen');
  const [activeStamp, setActiveStamp] = useState<StampType>('pointer'); // Default stamp
  const [color, setColor] = useState('#ef4444'); 
  const [lineWidth, setLineWidth] = useState(2);
  
  // History Stack for Undo
  const [history, setHistory] = useState<DrawObject[]>([]);
  const [currentPath, setCurrentPath] = useState<{x:number, y:number}[]>([]);
  
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [isMicroscopeView, setIsMicroscopeView] = useState(true); // Default to circular view
  const [showBgImage, setShowBgImage] = useState(true);
  const [scientistName, setScientistName] = useState('');
  const [observationNotes, setObservationNotes] = useState('');
  const [isExporting, setIsExporting] = useState(false);

  // Initialize Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 600;
    canvas.height = 600;
    reDraw();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, isMicroscopeView, showBgImage]);

  const reDraw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw all history items
      history.forEach(obj => {
          if (obj.type === 'path' && obj.path) {
              ctx.beginPath();
              ctx.strokeStyle = obj.color || 'black';
              ctx.lineWidth = obj.width || 2;
              ctx.lineCap = 'round';
              ctx.lineJoin = 'round';
              // If it's an eraser, we use destination-out, BUT this is tricky with layers. 
              // Simple approach: Eraser draws "clear" lines. 
              // Better approach for this simple app: Eraser is just white color if bg is image? No, globalCompositeOperation.
              
              if (obj.color === 'eraser') {
                  ctx.globalCompositeOperation = 'destination-out';
                  ctx.lineWidth = 20;
              } else {
                  ctx.globalCompositeOperation = 'source-over';
              }

              if (obj.path.length > 0) {
                  ctx.moveTo(obj.path[0].x, obj.path[0].y);
                  obj.path.forEach(p => ctx.lineTo(p.x, p.y));
              }
              ctx.stroke();
              ctx.globalCompositeOperation = 'source-over'; // Reset
          } else if (obj.type === 'text' && obj.content) {
              ctx.font = "bold 20px Arial";
              ctx.fillStyle = obj.color || 'black';
              ctx.shadowColor = "rgba(0,0,0,0.5)";
              ctx.shadowBlur = 2;
              ctx.fillText(obj.content, obj.x || 0, obj.y || 0);
              ctx.shadowBlur = 0;
          } else if (obj.type === 'stamp' && obj.content) {
             drawStampOnCanvas(ctx, obj.content as StampType, obj.x || 0, obj.y || 0, obj.color || 'red');
          }
      });
      
      // Draw Microscope Overlay (Visual only, on top)
      if (isMicroscopeView) {
          ctx.save();
          // Create "Inverse Clip" - huge rectangle with hole
          ctx.beginPath();
          ctx.rect(0, 0, canvas.width, canvas.height);
          ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2 - 20, 0, Math.PI * 2, true);
          ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
          ctx.fill();
          
          // Draw border ring
          ctx.beginPath();
          ctx.arc(canvas.width/2, canvas.height/2, canvas.width/2 - 20, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth = 10;
          ctx.stroke();
          ctx.restore();
      }
  };

  const drawStampOnCanvas = (ctx: CanvasRenderingContext2D, type: StampType, x: number, y: number, color: string) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = color;
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      
      // Simple shapes for stamps
      ctx.beginPath();
      switch(type) {
          case 'nucleus': // Circle
              ctx.arc(0, 0, 15, 0, Math.PI * 2);
              ctx.fill();
              ctx.stroke();
              break;
          case 'cellWall': // Hexagon
              for (let i = 0; i < 6; i++) {
                  ctx.lineTo(20 * Math.cos(i * Math.PI / 3), 20 * Math.sin(i * Math.PI / 3));
              }
              ctx.closePath();
              ctx.fill();
              ctx.stroke();
              break;
          case 'star':
              // Star shape
               const spikes = 5, outer = 20, inner = 8;
               let rot = Math.PI / 2 * 3, cx = 0, cy = 0;
               const step = Math.PI / spikes;
               ctx.moveTo(cx, cy - outer);
               for(let i=0; i<spikes; i++){
                   ctx.lineTo(cx + Math.cos(rot) * outer, cy + Math.sin(rot) * outer);
                   rot += step;
                   ctx.lineTo(cx + Math.cos(rot) * inner, cy + Math.sin(rot) * inner);
                   rot += step;
               }
               ctx.closePath();
               ctx.fill();
               ctx.stroke();
               break;
          case 'pointer': // Arrow
              ctx.beginPath();
              ctx.moveTo(0,0);
              ctx.lineTo(-10, 20);
              ctx.lineTo(0, 15);
              ctx.lineTo(10, 20);
              ctx.closePath();
              ctx.fillStyle = color;
              ctx.fill();
              ctx.stroke();
              break;
          case 'question':
              ctx.font = "bold 30px Arial";
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.strokeText("?", 0, 2);
              ctx.fillText("?", 0, 2);
              break;
      }
      ctx.restore();
  };

  // Text Input State
  const [textInput, setTextInput] = useState<{ x: number, y: number, text: string } | null>(null);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    // If text input is open, clicking elsewhere should confirm or close? 
    // Let's close it if empty, or just let user click outside to cancel? 
    // For now, let's allow multiple texts easily.
    
    // BUT if we are 'pen'ing, we don't want to trigger text input logic if we accidentally click.
    // The Tool check handles this.

    const { offsetX, offsetY } = getCoordinates(e);

    if (tool === 'text') {
        // Instead of prompt, show input at this location
        setTextInput({ x: offsetX, y: offsetY, text: "" });
        return;
    }
    
    if (tool === 'stamp') {
        setHistory(prev => [...prev, { type: 'stamp', x: offsetX, y: offsetY, content: activeStamp, color }]);
        return;
    }

    if (textInput) {
        // If we were inputting text and clicked to draw with pen, we should probably commit or cancel the text first?
        // Let's rely on the input's own OK/Cancel buttons for now to keep it simple.
        return; 
    }

    setIsDrawing(true);
    setCurrentPath([{x: offsetX, y: offsetY}]);
    
    // Draw immediately
    // Not strictly needed as reDraw handles history, but for realtime responsiveness we can draw on top temporarily?
    // Actually, let's keep it simple: Realtime drawing directly to context, then commit to history on mouse up.
    const canvas = canvasRef.current;
    if(canvas) {
        const ctx = canvas.getContext('2d');
        if(ctx) {
             ctx.beginPath();
             ctx.moveTo(offsetX, offsetY);
        }
    }
  };

  const handleTextSubmit = () => {
    if (textInput && textInput.text.trim()) {
        setHistory(prev => [...prev, { 
            type: 'text', 
            x: textInput.x, 
            y: textInput.y, 
            content: textInput.text, 
            color 
        }]);
    }
    setTextInput(null);
  };

  const handleTextCancel = () => {
    setTextInput(null);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    
    // Commit path to history
    if (currentPath.length > 0) {
        setHistory(prev => [...prev, { 
            type: 'path', 
            path: currentPath, 
            color: tool === 'eraser' ? 'eraser' : color, 
            width: tool === 'eraser' ? 20 : lineWidth 
        }]);
    }
    setCurrentPath([]);
  };

  const handlDrawMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = getCoordinates(e);
    
    setCurrentPath(prev => [...prev, {x: offsetX, y: offsetY}]);

    // Visual feedback
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) {
         ctx.lineWidth = tool === 'eraser' ? 20 : lineWidth;
         ctx.lineCap = 'round';
         ctx.lineJoin = 'round';
         
         if (tool === 'eraser') {
             ctx.globalCompositeOperation = 'destination-out';
         } else {
             ctx.globalCompositeOperation = 'source-over';
             ctx.strokeStyle = color;
         }

         ctx.lineTo(offsetX, offsetY);
         ctx.stroke();
         ctx.globalCompositeOperation = 'source-over';
         
         // If Microscope View, restore overlay immediately to prevent drawing over it
         if (isMicroscopeView) {
             reDraw(); // This is expensive? Maybe. 
             // Optimization: Use a separate overlay canvas.
             // But for now, just calling reDraw is safe.
         }
    }
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
       return {
           offsetX: ((e as React.MouseEvent).clientX - rect.left) * scaleX,
           offsetY: ((e as React.MouseEvent).clientY - rect.top) * scaleY
       };
  };

  const handleUndo = () => {
      setHistory(prev => prev.slice(0, prev.length - 1));
  };
  
  const handleClear = () => {
      if(window.confirm("Clear all?")) setHistory([]);
  };

  // --- Professional Lab Report Export ---
  const handleSave = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      setIsExporting(true);
      
      reDraw(); // Ensure current state is clean (no overlay for a moment?) 
      // Actually, we want to save WITHOUT the overlay "blackout", but WITH the circle border?
      // Let's create a dedicated Export Canvas.

      const expCanvas = document.createElement('canvas');
      expCanvas.width = 1240;
      expCanvas.height = 1754;
      const eCtx = expCanvas.getContext('2d');
      if (!eCtx) {
        setIsExporting(false);
        return;
      }

      // 1. Draw Lab Report Background (White paper + Grid)
      eCtx.fillStyle = "white";
      eCtx.fillRect(0, 0, expCanvas.width, expCanvas.height);
      
      // Draw Grid
      eCtx.strokeStyle = "#e2e8f0"; // Light slate
      eCtx.lineWidth = 1;
      eCtx.beginPath();
      for (let i = 0; i < expCanvas.width; i+=40) { eCtx.moveTo(i, 0); eCtx.lineTo(i, expCanvas.height); }
      for (let i = 0; i < expCanvas.height; i+=40) { eCtx.moveTo(0, i); eCtx.lineTo(expCanvas.width, i); }
      eCtx.stroke();

      // 2. Header
      eCtx.fillStyle = "#1e293b"; // Slate 800
      eCtx.fillRect(0, 0, expCanvas.width, 150);
      
      eCtx.fillStyle = "white";
      eCtx.font = "bold 54px 'Noto Sans TC', 'Fredoka', sans-serif";
      eCtx.textBaseline = "middle";
      eCtx.fillText(t.journal.labReport.title, 60, 75);
      
      // 3. Metadata Section
      eCtx.fillStyle = "#0f172a";
      eCtx.font = "bold 27px 'Noto Sans TC', Arial";
      eCtx.textAlign = "left";
      
      const metaY = 215;
      const col1 = 60;
      const col2 = 650;
      
      eCtx.fillText(`${t.journal.labReport.date}: ${new Date().toLocaleDateString()}`, col1, metaY);
      eCtx.fillText(`${t.journal.labReport.scientist}: ${scientistName.trim() || '—'}`, col2, metaY);
      
      eCtx.fillText(`${t.journal.labReport.specimen}: ${specimenName}`, col1, metaY + 55);
      eCtx.fillText(`${t.journal.labReport.magnification}: ${lens}`, col2, metaY + 55);

      // 4. Draw The Observation (Circle)
      // Center the circle in the page
      const circleCX = expCanvas.width / 2;
      const circleCY = metaY + 510;
      const circleR = 390;
      
      // Draw Specimen BG Image (if enabled)
      if (showBgImage) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          const loadedImage = await new Promise<HTMLImageElement | null>((resolve) => {
              img.onload = () => resolve(img);
              img.onerror = () => resolve(null);
              img.src = image;
              if (img.complete && img.naturalWidth > 0) resolve(img);
          });
          await drawExportResult(expCanvas, eCtx, loadedImage, canvas, circleCX, circleCY, circleR);
      } else {
          await drawExportResult(expCanvas, eCtx, null, canvas, circleCX, circleCY, circleR);
      }
  };
  
  const drawExportResult = async (
      expCanvas: HTMLCanvasElement, 
      eCtx: CanvasRenderingContext2D, 
      img: HTMLImageElement | null, 
      sourceCanvas: HTMLCanvasElement,
      cx: number, cy: number, r: number
  ) => {
       eCtx.save();
       // Clip circle
       eCtx.beginPath();
       eCtx.arc(cx, cy, r, 0, Math.PI*2);
       eCtx.clip();
       
       // Draw Fill White (base)
       eCtx.fillStyle = "white";
       eCtx.fill();

       // Draw Image
       if (img) {
           eCtx.drawImage(img, cx - r, cy - r, r*2, r*2);
       }
       
       // Draw User Content (Scaled)
       // Source canvas is 600x600. Target is r*2 (500x500).
       eCtx.drawImage(sourceCanvas, cx - r, cy - r, r*2, r*2);
       
       eCtx.restore();

       // Draw Circle Border
       eCtx.beginPath();
       eCtx.arc(cx, cy, r, 0, Math.PI*2);
       eCtx.lineWidth = 15;
       eCtx.strokeStyle = "#334155";
       eCtx.stroke();

       // 5. Notes Section
       const notesY = cy + r + 60;
       eCtx.fillStyle = "#f1f5f9"; // Light bg
       eCtx.fillRect(60, notesY, 1120, 300);
       eCtx.strokeStyle = "#cbd5e1";
       eCtx.strokeRect(60, notesY, 1120, 300);
       
       eCtx.fillStyle = "#94a3b8";
       eCtx.font = "bold 26px 'Noto Sans TC', Arial";
       eCtx.fillText(t.journal.drawHint, 90, notesY + 48);
       eCtx.fillStyle = "#334155";
       eCtx.font = "24px 'Noto Sans TC', Arial";
       const words = Array.from(observationNotes.trim() || '—');
       let line = '';
       let y = notesY + 98;
       for (const word of words) {
           const test = line + word;
           if (eCtx.measureText(test).width > 1040 && line) {
               eCtx.fillText(line, 90, y);
               line = word;
               y += 40;
           } else line = test;
           if (y > notesY + 255) break;
       }
       if (line && y <= notesY + 275) eCtx.fillText(line, 90, y);
       
       // Footer
       eCtx.fillStyle = "#64748b";
       eCtx.font = "16px Arial";
       eCtx.textAlign = "center";
       eCtx.fillText("KidRise Science · STEM Observation Journal", expCanvas.width / 2, expCanvas.height - 34);

       // Download
       try {
          await exportCanvasAsPdf(expCanvas, `KidRise-Microscope-Journal-${Date.now()}.pdf`, t.journal.labReport.title);
          const record = { id: Date.now(), specimenName, lens, scientistName: scientistName.trim(), observationNotes: observationNotes.trim() };
          try {
            const existing = JSON.parse(localStorage.getItem('kr_microscope_journal_records') || '[]');
            localStorage.setItem('kr_microscope_journal_records', JSON.stringify([record, ...(Array.isArray(existing) ? existing : [])].slice(0, 20)));
          } catch { /* The PDF still exports when private storage is unavailable. */ }
          setShowSaveSuccess(true);
          onJournalSaved?.();
          onPdfExported?.();
          setTimeout(() => setShowSaveSuccess(false), 2000);
       } catch (err) {
           console.error(err);
           alert(t.journal.saveSuccess === 'Saved!' ? 'PDF export failed. Please try again.' : 'PDF 匯出失敗，請再試一次。');
       } finally {
           setIsExporting(false);
       }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6">
        <PageHeader title={t.journal.title} subtitle={t.journal.drawHint} />
        
        <div className="relative w-full bg-slate-900 rounded-3xl border border-slate-700 shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[600px]">
            
            {/* Canvas Area */}
            <div className="flex-1 relative bg-slate-950 flex items-center justify-center p-4 overflow-hidden touch-none">
                <div className="relative shadow-2xl rounded-lg overflow-hidden ring-1 ring-slate-800 w-full max-w-[600px] aspect-square bg-white">
                    {/* Background Image (If Enabled) */}
                    {showBgImage && (
                        <img 
                            src={image} 
                            alt="Specimen" 
                            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none opacity-80"
                        />
                    )}
                    
                    {/* Drawing Canvas */}
                    <canvas
                        ref={canvasRef}
                        className={`absolute inset-0 w-full h-full touch-none ${tool === 'text' ? 'cursor-text' : tool === 'stamp' ? 'cursor-crosshair' : 'cursor-crosshair'}`}
                        onMouseDown={startDrawing}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onMouseMove={handlDrawMove}
                        onTouchStart={startDrawing}
                        onTouchEnd={stopDrawing}
                        onTouchMove={handlDrawMove}
                    />

                    {/* Text Input Overlay */}
                    {textInput && (
                        <div 
                            className="absolute z-50 bg-white p-2 rounded shadow-xl flex gap-2 items-center border border-slate-200"
                            style={{ 
                                left: `${(textInput.x / 600) * 100}%`, 
                                top: `${(textInput.y / 600) * 100}%`,
                                transform: 'translate(-50%, -100%)' // Position above the click
                            }}
                        >
                            <input 
                                autoFocus
                                type="text" 
                                value={textInput.text}
                                onChange={(e) => setTextInput({...textInput, text: e.target.value})}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleTextSubmit();
                                    if (e.key === 'Escape') handleTextCancel();
                                }}
                                className="border border-slate-300 rounded px-2 py-1 text-sm outline-none focus:border-indigo-500 w-40 text-black"
                                placeholder="Enter text..."
                            />
                            <button onClick={handleTextSubmit} className="p-1 bg-green-500 text-white rounded hover:bg-green-600">
                                <span className="sr-only">OK</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </button>
                            <button onClick={handleTextCancel} className="p-1 bg-slate-200 text-slate-500 rounded hover:bg-slate-300">
                                <span className="sr-only">Cancel</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                        </div>
                    )}
                </div>
                
                {/* View Controls (Overlay) */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                     <button 
                        onClick={() => setShowBgImage(!showBgImage)}
                        className={`p-3 rounded-full shadow-xl transition-all ${showBgImage ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}
                        title="Toggle Image"
                     >
                        <ImageIcon size={20} />
                     </button>
                      <button 
                        onClick={() => setIsMicroscopeView(!isMicroscopeView)}
                        className={`p-3 rounded-full shadow-xl transition-all ${isMicroscopeView ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-400'}`}
                        title={t.journal.viewToggle}
                     >
                        <Circle size={20} />
                     </button>
                </div>
                
                {/* Undo Fab */}
                <div className="absolute top-4 left-4">
                     <button 
                        onClick={handleUndo}
                        disabled={history.length === 0}
                        className="p-3 rounded-full bg-slate-800 text-white shadow-xl hover:bg-slate-700 disabled:opacity-50 transition-all border border-slate-600"
                        title={t.journal.tools.undo}
                     >
                        <RotateCcw size={20} />
                     </button>
                </div>
            </div>

            {/* Tools Panel (Right Side) */}
            <div className="w-full md:w-80 bg-slate-900 border-l border-slate-800 flex flex-col z-20 shadow-xl h-[40vh] md:h-auto shrink-0">
                
                <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
                    <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                            {t.journal.labReport.scientist}
                            <input
                                type="text"
                                value={scientistName}
                                onChange={(event) => setScientistName(event.target.value)}
                                maxLength={40}
                                placeholder={isChinese ? '輸入小科學家姓名（可選）' : 'Scientist name (optional)'}
                                className="mt-2 min-h-11 w-full rounded-xl border border-white/10 bg-slate-950 px-3 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-cyan-400"
                            />
                        </label>
                        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                            {isChinese ? '觀察筆記' : 'Observation notes'}
                            <textarea
                                value={observationNotes}
                                onChange={(event) => setObservationNotes(event.target.value)}
                                maxLength={260}
                                rows={3}
                                placeholder={isChinese ? '記低形狀、顏色及你的發現…' : 'Record shapes, colours and what you discovered…'}
                                className="mt-2 w-full resize-none rounded-xl border border-white/10 bg-slate-950 p-3 text-sm font-normal normal-case tracking-normal text-white outline-none focus:border-cyan-400"
                            />
                        </label>
                    </div>
                    
                    {/* Tools Grid */}
                    <div className="space-y-3">
                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Tools</label>
                         <div className="grid grid-cols-4 gap-2">
                            {[
                                { id: 'pen', icon: Pencil, label: t.journal.tools.pen },
                                { id: 'eraser', icon: Eraser, label: t.journal.tools.eraser },
                                { id: 'text', icon: Type, label: t.journal.tools.text },
                                { id: 'stamp', icon: Stamp, label: t.journal.stamps.label },
                            ].map(item => (
                                <button
                                    key={item.id}
                                    onClick={() => setTool(item.id as Tool)}
                                    className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all ${
                                        tool === item.id 
                                        ? 'bg-primary/20 border-primary text-primary shadow-[0_0_15px_rgba(99,102,241,0.3)]' 
                                        : 'bg-slate-800/50 border-slate-700 text-slate-400 hover:bg-slate-800'
                                    }`}
                                >
                                    <item.icon size={24} className="mb-1" />
                                    <span className="text-[10px] uppercase font-bold">{item.label}</span>
                                </button>
                            ))}
                         </div>
                    </div>

                    {/* Stamp Tools */}
                    {tool === 'stamp' && (
                        <div className="space-y-3 animate-in slide-in-from-right-4">
                             <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">{t.journal.stamps.label}</label>
                             <div className="grid grid-cols-5 gap-2">
                                 {[
                                     { id: 'nucleus', icon: Circle },
                                     { id: 'cellWall', icon: Hexagon },
                                     { id: 'pointer', icon: MousePointer },
                                     { id: 'question', icon: HelpCircle },
                                     { id: 'star', icon: Star },
                                 ].map(s => (
                                     <button
                                         key={s.id}
                                         onClick={() => setActiveStamp(s.id as StampType)}
                                         className={`p-2 rounded-lg border flex items-center justify-center aspect-square transition-all ${
                                             activeStamp === s.id 
                                             ? 'bg-white/10 border-white ring-1 ring-white' 
                                             : 'bg-slate-800 border-slate-700'
                                         }`}
                                         style={{ color: color }} // Show current color preview on icon
                                     >
                                         <s.icon size={24} />
                                     </button>
                                 ))}
                             </div>
                             <p className="text-xs text-slate-500 text-center mt-2">Tap canvas to place stamp!</p>
                        </div>
                    )}

                    {/* Color & Size (Always show for Pen, Text, and Stamp, but hide for Eraser maybe? Or keep for consistency) */}
                    {tool !== 'eraser' && (
                        <div className="space-y-3 animate-in slide-in-from-right-4">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">{t.journal.tools.colorSize}</label>
                            <div className="flex flex-wrap gap-3">
                                {['#ef4444', '#f97316', '#facc15', '#4ade80', '#22d3ee', '#818cf8', '#ffffff', '#000000'].map(c => (
                                    <button
                                        key={c}
                                        onClick={() => { setColor(c); }}
                                        className={`w-8 h-8 rounded-full border-2 transition-transform ${
                                            color === c ? 'border-white scale-110 ring-2 ring-white/20' : 'border-transparent'
                                        }`}
                                        style={{ backgroundColor: c }}
                                    />
                                ))}
                            </div>
                            <input 
                                type="range" 
                                min="1" max="20" 
                                value={lineWidth} 
                                onChange={(e) => setLineWidth(Number(e.target.value))}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-primary mt-4"
                            />
                        </div>
                    )}

                </div>

                {/* Footer Actions */}
                <div className="p-6 border-t border-slate-800 space-y-3 bg-slate-900/50">
                    <Button 
                        fullWidth
                        onClick={handleSave} 
                        disabled={isExporting}
                        variant="accent"
                        className="shadow-lg shadow-indigo-900/20 py-4 text-lg"
                    >
                        {showSaveSuccess ? <span className="flex items-center justify-center"><Save className="mr-2"/> {t.journal.saveSuccess}</span> : <span className="flex items-center justify-center"><Download className="mr-2"/> {isExporting ? (isChinese ? '正在製作 PDF…' : 'Creating PDF…') : (isChinese ? '匯出 PDF 日記' : 'Export PDF journal')}</span>}
                    </Button>
                    <div className="grid grid-cols-2 gap-3">
                         <Button variant="outline" onClick={handleClear} className="w-full border-red-900/30 text-red-400 hover:bg-red-900/10">
                            <Trash2 size={16} className="mr-2" /> {t.journal.tools.clear}
                         </Button>
                         <Button variant="ghost" onClick={onClose} className="w-full">
                            {t.journal.tools.close}
                         </Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};
