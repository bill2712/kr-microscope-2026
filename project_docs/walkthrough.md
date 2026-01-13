# Focus Simulation Walkthrough

I have enhanced the **Focus Simulation** experience to be more immersive and realistic, as per your request for a "core experience".

## Changes

### 1. Audio Feedback 🎵

- Added **Click Sounds** when turning the knobs.
  - _Deep click_ for the Coarse knob.
  - _High click_ for the Fine knob.
- Added **Success Arpeggio** ("Ding!") when perfect focus is achieved.
- _Note: Sounds are generated in real-time using the Web Audio API, so no external files are needed._

### 2. Lens-Dependent Difficulty 🔬

The difficulty now changes based on the selected lens:

- **100x**: Easy mode. Coarse knob is precise enough.
- **400x**: Balanced.
- **1200x**: Hard mode. The Coarse knob moves the focus too fast, making it nearly impossible to focus perfectly without switching to the **Fine Knob**.

### 3. Visual Enhancements ✨

- **Realistic Viewfinder**: Added a vignette and lens artifacts.
- **Knob Controls**: Improved the visual design of the knobs with gradients and better grip textures.
- **Animations**: Smooth transitions when focusing.

## Verification

### How to Test

1.  Go to the **Lab (Planner)** section.
2.  Select a Specimen (e.g., Onion) and **100x Lens**. click "Launch".
3.  Turn the **Coarse Knob**. Notice the sound and how the image becomes clear.
4.  Finish and try again with **1200x Lens**.
5.  Try to focus using only the Coarse knob - it should be very difficult!
6.  Use the **Fine Knob** to achieve perfect focus.

### Success Criteria

- [x] Audio plays on interaction.
- [x] Image unblurs correctly.
- [x] 1200x is noticeably harder than 100x.
