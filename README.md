# LumenFlow

Local-first generative ambient projection visuals for Linux Mint media PCs and home projectors.

LumenFlow is a small browser-based visual player for endless particle-flow scenes: dust-like particles, laminar movement, waves, vortices, trails, and soft glow. Stage 0 is intentionally simple: plain HTML, CSS, and JavaScript Canvas 2D. It does not require npm, a build step, paid APIs, or an internet connection at runtime.

## Current stage

Stage 0 browser prototype.

Target:

- 1920x1080 / Full HD output
- older Linux Mint media mini-PCs
- used home projectors or TV/monitor testing
- stable 30 FPS first, visual complexity second
- public-safe code only

## Quick start

```bash
git clone https://github.com/alanua/LumenFlow.git
cd LumenFlow
xdg-open src/visual.html
```

Then press `F` in the browser to request fullscreen.

You can also open `src/visual.html` directly from the file manager in Firefox or Chromium.

## Controls

| Key | Action |
| --- | --- |
| `1` | Calm / laminar preset |
| `2` | Vortex preset |
| `3` | Bright / neon preset |
| `Space` | Cycle color palette |
| `ArrowUp` | Increase particle count safely |
| `ArrowDown` | Decrease particle count safely |
| `F` | Request fullscreen |
| `H` | Show or hide help overlay |
| `R` | Reset particles |

## Linux Mint notes

Start with normal browser fullscreen. Test on a monitor or TV before connecting a projector.

Optional kiosk-style browser commands are documented in [`docs/RUN_LINUX_MINT.md`](docs/RUN_LINUX_MINT.md). They are documentation only; the project does not change system startup or browser settings by itself.

## Public-safe boundary

This repository is for public-safe code and documentation. Keep these out of the repo:

- private home photos or videos
- local IP addresses and device identifiers
- Home Assistant tokens, MQTT credentials, Wi-Fi data, SSH keys, API keys, or secrets
- projector purchase negotiation details
- private household inventory

## Stage 0 non-goals

Not implemented in stage 0:

- Home Assistant integration
- MQTT control
- ESP32 remote input
- audio reactivity
- WebGL renderer
- projector buying guide
- private media assets
- paid APIs

## Project direction

Future stages may add a WebGL renderer, named scene presets, audio reactivity, kiosk autostart, Home Assistant/MQTT control, and ESP32 remote input. Those integrations are not active yet.
