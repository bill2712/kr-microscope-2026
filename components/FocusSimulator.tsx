import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "./Button";
import { CheckCircle, RotateCw } from "lucide-react";

interface FocusSimulatorProps {
  image: string;
  lens: string; // "100x ...", "400x ...", "1200x ..."
  onSuccess: () => void;
  t: any;
}

export const FocusSimulator: React.FC<FocusSimulatorProps> = ({
  image,
  lens,
  onSuccess,
  t,
}) => {
  // --- Difficulty Settings based on Lens ---
  // 100x: Easy. Coarse moves slow, wide tolerance.
  // 400x: Medium.
  // 1200x: Hard. Coarse moves fast (easy to overshoot), narrow tolerance, Fine is essential.
  const getDifficulty = (lensStr: string) => {
    if (lensStr.includes("100x"))
      return { coarseStep: 3, fineStep: 0.5, tolerance: 5, drift: 0 };
    if (lensStr.includes("400x"))
      return { coarseStep: 5, fineStep: 0.5, tolerance: 2.5, drift: 0.2 };
    if (lensStr.includes("1200x"))
      return { coarseStep: 15, fineStep: 0.5, tolerance: 1.5, drift: 0.5 }; // High coarse step = jumpy
    return { coarseStep: 5, fineStep: 0.5, tolerance: 3, drift: 0 };
  };

  const difficulty = getDifficulty(lens);

  // Focus logic: 0 to 100. Target is semi-random.
  const [targetFocus, setTargetFocus] = useState(50);
  const [coarseValue, setCoarseValue] = useState(0);
  const [fineValue, setFineValue] = useState(0);

  const [showSuccess, setShowSuccess] = useState(false);

  // Audio Context
  const audioCtx = useRef<AudioContext | null>(null);

  useEffect(() => {
    // Initialize Random Target
    const randomTarget = Math.floor(Math.random() * 40) + 30; // 30-70
    setTargetFocus(randomTarget);
    // Start far away
    setCoarseValue(randomTarget < 50 ? 80 : 20);
    setFineValue(0);

    // Init Audio Context on first interaction usually, but let's try to init
    if (!audioCtx.current) {
      audioCtx.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
    }
  }, [lens]); // Reset on lens change

  // Calculate current focus state
  const totalValue = coarseValue + fineValue;
  const rawDiff = Math.abs(totalValue - targetFocus);

  // Blur logic: non-linear
  // If diff within tolerance, blur is 0.
  // Otherwise, blur scales up.
  const isFocused = rawDiff <= difficulty.tolerance;
  const blurAmount = isFocused
    ? 0
    : Math.min(
        20,
        Math.pow(Math.max(0, rawDiff - difficulty.tolerance * 0.5), 1.2) * 0.8 +
          0.5
      );

  useEffect(() => {
    if (isFocused && !showSuccess) {
      playSuccessSound();
      setShowSuccess(true);
      setTimeout(onSuccess, 1500);
    }
  }, [isFocused, showSuccess, onSuccess]);

  // Audio Helpers
  const playClickSound = useCallback((pitch: number = 1) => {
    if (!audioCtx.current) return;
    if (audioCtx.current.state === "suspended") audioCtx.current.resume();

    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(200 * pitch, audioCtx.current.currentTime);
    osc.frequency.exponentialRampToValueAtTime(
      50 * pitch,
      audioCtx.current.currentTime + 0.1
    );

    gain.gain.setValueAtTime(0.1, audioCtx.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(
      0.01,
      audioCtx.current.currentTime + 0.1
    );

    osc.connect(gain);
    gain.connect(audioCtx.current.destination);

    osc.start();
    osc.stop(audioCtx.current.currentTime + 0.1);
  }, []);

  const playSuccessSound = useCallback(() => {
    if (!audioCtx.current) return;
    const now = audioCtx.current.currentTime;

    // Cheerful Arpeggio
    [440, 554, 659, 880].forEach((freq, i) => {
      const osc = audioCtx.current!.createOscillator();
      const gain = audioCtx.current!.createGain();

      osc.type = "sine";
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0, now + i * 0.1);
      gain.gain.linearRampToValueAtTime(0.3, now + i * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.current!.destination);

      osc.start(now + i * 0.1);
      osc.stop(now + i * 0.1 + 0.5);
    });
  }, []);

  const adjustCoarse = (direction: number) => {
    // Coarse knob: large steps, clamps to 0-100
    const delta = direction * difficulty.coarseStep;
    let newVal = coarseValue + delta;
    if (newVal < 0) newVal = 0;
    if (newVal > 100) newVal = 100;

    setCoarseValue(newVal);
    playClickSound(0.8); // Lower pitch for coarse
  };

  const adjustFine = (direction: number) => {
    // Fine knob: small steps, additive, clamped locally to +/- 10 from current base?
    // Actually, just let it float but it's small value.
    const delta = direction * difficulty.fineStep;
    let newVal = fineValue + delta;

    // Limit fine range to prevent cheating fully with fine knob
    if (newVal < -15) newVal = -15;
    if (newVal > 15) newVal = 15;

    setFineValue(newVal);
    playClickSound(1.5); // Higher pitch for fine
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-6 w-full max-w-2xl mx-auto">
      {/* Viewfinder */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full border-[16px] border-slate-800 bg-black overflow-hidden shadow-2xl ring-4 ring-slate-900/50">
        {/* Specimen View */}
        <img
          src={image}
          alt="Specimen"
          className="w-full h-full object-cover transition-all duration-100"
          style={{
            filter: `blur(${blurAmount}px) contrast(${
              1.2 - blurAmount / 40
            }) brightness(${isFocused ? 1.1 : 0.8})`,
            transform: `scale(${1 + blurAmount / 100})`, // Slight zoom breath when blurry
          }}
        />

        {/* Lens Artifacts / Vignette */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.9)] rounded-full"></div>

        {/* Focus Reticle / Crosshair - Only visible when trying to focus */}
        <div
          className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500 ${
            isFocused ? "opacity-0" : "opacity-30"
          }`}
        >
          <div className="w-full h-[1px] bg-red-500/50"></div>
          <div className="h-full w-[1px] bg-red-500/50 absolute"></div>
          <div className="w-12 h-12 rounded-full border border-red-500/50"></div>
        </div>

        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-500/30 animate-in fade-in duration-300">
            <CheckCircle
              size={80}
              className="text-white drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] animate-bounce"
            />
          </div>
        )}
      </div>

      {/* Controls Panel */}
      <div className="w-full glass-panel p-6 rounded-3xl border border-white/10 shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <h3 className="text-lg font-bold text-secondary">
            {t.planner.focusTitle}
          </h3>
          <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400 border border-slate-700">
            LENS: {lens.split(" ")[0]}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-8 relative">
          {/* Connecting lines graphic */}
          <div className="absolute left-1/2 top-10 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2 hidden md:block"></div>

          {/* Coarse Knob */}
          <div className="flex flex-col items-center space-y-4">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-bold flex items-center gap-2">
              {t.planner.coarseKnob}
            </span>

            <div className="relative group touch-none">
              <div className="w-28 h-28 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 border-b-4 border-r-4 border-slate-950 shadow-[5px_5px_15px_rgba(0,0,0,0.5),inset_2px_2px_10px_rgba(255,255,255,0.1)] flex items-center justify-center">
                {/* Knob Grip Texture */}
                <div className="absolute inset-0 rounded-full border-[10px] border-dashed border-slate-800/50 opacity-50"></div>

                {/* Indicator */}
                <div
                  className="w-full h-full rounded-full transition-transform duration-200 ease-out"
                  style={{ transform: `rotate(${coarseValue * 3.6}deg)` }}
                >
                  <div className="w-2 h-2 rounded-full bg-yellow-500/80 shadow-[0_0_10px_rgba(234,179,8,0.8)] absolute top-3 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>

              {/* Interaction Buttons Overlay */}
              <div className="absolute -inset-4 flex">
                <button
                  className="w-1/2 h-full cursor-pointer focus:outline-none focus:bg-white/5 rounded-l-full"
                  onClick={() => adjustCoarse(-1)}
                  aria-label="Rotate Left"
                />
                <button
                  className="w-1/2 h-full cursor-pointer focus:outline-none focus:bg-white/5 rounded-r-full"
                  onClick={() => adjustCoarse(1)}
                  aria-label="Rotate Right"
                />
              </div>
            </div>

            <div className="flex gap-2 w-full justify-center">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => adjustCoarse(-1)}
                className="rounded-full w-10 h-10 hover:bg-white/10"
              >
                <RotateCw className="scale-x-[-1]" size={20} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => adjustCoarse(1)}
                className="rounded-full w-10 h-10 hover:bg-white/10"
              >
                <RotateCw size={20} />
              </Button>
            </div>
          </div>

          {/* Fine Knob */}
          <div className="flex flex-col items-center space-y-4">
            <span className="text-xs text-cyan-400 uppercase tracking-widest font-bold">
              {t.planner.fineKnob}
            </span>

            <div className="relative group touch-none">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-900 to-slate-900 border-b-4 border-r-4 border-slate-950 shadow-[5px_5px_15px_rgba(0,0,0,0.5),inset_2px_2px_8px_rgba(255,255,255,0.1)] flex items-center justify-center ring-1 ring-blue-500/30">
                {/* Knob Grip Texture */}
                <div className="absolute inset-0 rounded-full border-[6px] border-dotted border-blue-500/20"></div>

                {/* Indicator */}
                <div
                  className="w-full h-full rounded-full transition-transform duration-200 ease-out"
                  style={{ transform: `rotate(${fineValue * 15}deg)` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)] absolute top-2 left-1/2 -translate-x-1/2"></div>
                </div>
              </div>

              {/* Interaction Buttons Overlay */}
              <div className="absolute -inset-4 flex">
                <button
                  className="w-1/2 h-full cursor-pointer focus:outline-none focus:bg-white/5 rounded-l-full"
                  onClick={() => adjustFine(-1)}
                />
                <button
                  className="w-1/2 h-full cursor-pointer focus:outline-none focus:bg-white/5 rounded-r-full"
                  onClick={() => adjustFine(1)}
                />
              </div>
            </div>

            <div className="flex gap-2 w-full justify-center">
              <Button
                size="icon"
                variant="ghost"
                onClick={() => adjustFine(-1)}
                className="rounded-full w-8 h-8 hover:bg-white/10"
              >
                <RotateCw className="scale-x-[-1]" size={16} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => adjustFine(1)}
                className="rounded-full w-8 h-8 hover:bg-white/10"
              >
                <RotateCw size={16} />
              </Button>
            </div>
          </div>
        </div>

        <div className="text-center bg-slate-900/50 p-3 rounded-xl border border-white/5">
          <p className="text-xs text-slate-400">{t.planner.focusInstruction}</p>
        </div>
      </div>
    </div>
  );
};
