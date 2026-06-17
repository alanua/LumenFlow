# LumenFlow Project Scope

LumenFlow is a generative visual player, not a video-file library.

The project creates real-time ambient visuals in the browser: particle streams, flow fields, laminar movement, slow vortices, wave-like drift, trails, and soft glow. The first practical target is a Linux Mint media PC connected to a Full HD projector, TV, or monitor.

## Stage 0: browser prototype

Stage 0 is deliberately minimal and local-first:

- static HTML/CSS/JavaScript
- Canvas 2D renderer
- no build step
- no npm dependency
- no CDN dependency
- no network dependency at runtime
- keyboard controls for presets and basic performance tuning
- target output: 1920x1080
- target performance: stable 30 FPS before visual complexity

## Included in Stage 0

- `src/visual.html` as the local entrypoint
- `src/main.js` with the particle-flow renderer
- `src/styles.css` for full-screen display and help overlay
- Linux Mint run notes
- public-safe project documentation

## Out of scope for Stage 0

- Home Assistant integration
- MQTT integration
- ESP32 remote control
- audio input
- WebGL renderer
- projector selection or buying guide
- system autostart changes
- private media, local IPs, device serials, secrets, credentials, or account data

## Future stages

Possible later stages:

- WebGL renderer for higher particle counts
- scene preset files
- better palettes and transitions
- audio-reactive motion
- kiosk/autostart helper scripts
- Home Assistant/MQTT control
- ESP32 hardware remote input
- projector-specific calibration notes

Future integrations must be added as separate reviewed tasks. They are not implied by Stage 0.
