# Focus Simulation Enhancement Plan

## Goal

Enhance the existing "Focus Simulator" to provide a premium, immersive experience as requested ("core xperience", "low cost but good effect"). We will add audio feedback, lens-dependent difficulty, and visual polish.

## User Review Required

> [!NOTE]
> I found that `FocusSimulator.tsx` already exists, but it lacks audio feedback and is not integrated with the lens selection (magnification doesn't affect difficulty). I will upgrade this component.

## Proposed Changes

### Components

#### [MODIFY] [FocusSimulator.tsx](file:///Users/billtsang/Downloads/kr-amazing-telescope/kr-microscope-2026/components/FocusSimulator.tsx)

- **Audio Feedback**: Implement Web Audio API (or simple Audio elements) to play clicking sounds when knobs are turned, and a "ding" or "success" sound when focus is achieved.
- **Lens Integration**: Accept `lens` prop (e.g., '100x', '400x', '1200x').
  - **100x**: Easiest. Wide acceptance range for focus.
  - **400x**: Normal.
  - **1200x**: Hardest. Very narrow acceptance range. Coarse knob changes value too fast, requiring Fine knob.
- **Visual Polish**:
  - Add "chromatic aberration" or slight distortion at edges when out of focus? (Optional, maybe too complex for simple css, but standard blur is fine).
  - Ensure knobs have smooth feeling.

#### [MODIFY] [Planner.tsx](file:///Users/billtsang/Downloads/kr-amazing-telescope/kr-microscope-2026/components/Planner.tsx)

- Pass the selected `lens` to `FocusSimulator`.
- Ensure the layout handles the simulator well on different screen sizes.

### Assets

- We need sound assets. I can generate them or use synthesized sounds via Web Audio API to avoid external assets. _Decision: Use Web Audio API for simple clicks/beeps to keep it self-contained._

## Verification Plan

### Manual Verification

1.  **Launch App**: `npm run dev` and open in browser.
2.  **Navigate directly to "Planner" (Lab)**.
3.  **Select Specimen & Lens**:
    - Test "Onion" + "100x".
    - Verify Coarse knob works and image unblurs.
    - Verify "Click" sounds on rotation.
    - Verify "Success" state.
4.  **Test Difficulty**:
    - Select "1200x".
    - Verify that Coarse knob creates large jumps, making it hard to find perfect focus.
    - Verify Fine knob is needed.
5.  **Responsiveness**: Check on mobile/desktop view.
