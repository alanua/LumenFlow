# Run on Linux Mint

LumenFlow Stage 0 runs as a local browser page.

## Simple run

Open `src/visual.html` from the file manager, or run `xdg-open src/visual.html` from the repository folder.

Use Firefox or Chromium. Press `F` after the page opens to request fullscreen.

## First test procedure

1. Test on a normal monitor or TV first.
2. Set display output to 1920x1080.
3. Open `src/visual.html`.
4. Press `H` to see controls.
5. Start with preset `1`.
6. Use `ArrowDown` if animation is not smooth.
7. Connect the projector after the browser test is stable.

## Performance tips

- Use 1920x1080, not 4K.
- Close other browser tabs and heavy apps.
- Reduce particle count with `ArrowDown`.
- Use preset `1` for the calmest and lightest mode.
- Avoid screen scaling effects if the GPU is weak.
- Stable 30 FPS is enough for ambient projection.

## Projector notes

For used projectors, native Full HD and stable HDMI input matter more than 4K support. Test focus, brightness, fan noise, lamp hours, and whether 1920x1080 input is accepted before relying on it for installation work.

## Autostart and kiosk status

Autostart and kiosk setup are not implemented in Stage 0. Add them later as a separate reviewed task after the visual prototype is tested on the real media PC.
