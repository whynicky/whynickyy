# whynicky® — AFTERIMAGE

An interactive digital artwork. A photographic print splits into sixteen deforming surfaces; the camera enters the layers, circles a helicoidal chamber and returns to an image. The visitor can change tension, perspective, lighting and photographic polarity.

This is Portfolio 2. It links to the existing professional portfolio at https://whynicky19.github.io/Portfolio/ and does not replace it.

## Run

Node 22.12+:

```sh
npm ci
npm run dev
```

Production validation:

```sh
npm run build
npm run check
npm run preview
```

Only `dist/` is deployable. Relative asset paths support subdirectory hosting. Publish it to a **separate repository/site** if desired. No deployment workflow is included: the original repository remote is retained only for provenance, and nothing has been pushed or published.

## Restore the rejected direction

The previous implementation is committed as `ce3265a` and tagged `checkpoint-before-experiment`. The new work lives on `experiment/afterimage`. For a non-destructive comparison, create a separate checkout from that tag. The old screen recording remains `whynicky-site-recording.mp4`; it shows the rejected direction, not this experiment.

## Edit the experience

- `index.html`: minimal identity, scene navigation, accessible controls and original-portfolio exit.
- `src/experiment/surface.js`: sampled geometry, GPU deformation, photographic material, matching shadow deformation and print lettering.
- `src/experiment/choreography.js`: camera trajectory and continuous transformations.
- `src/experiment/scene.js`: lighting, materials, pointer input, rendering quality and lifecycle.
- `src/experiment/main.js`: scroll coordination, accessibility, motion preferences and fallback.
- `src/experiment/style.css`: frame, kinetic typography and mobile layout.

The three-dimensional topology has 8,544 vertices and 14,080 triangles; it is generated in code, not imported as a primitive or external model. The portrait version changes the physical proportions, photographic crop and printed lettering. A native range control and negative toggle duplicate the pointer interactions for keyboard users. Normal scrolling is retained.

## Art and verification

Concept, reference observations, asset provenance and generation prompt are in `docs/DIRECTION.md`. The generated photographic master is `docs/assets/membrane-source.png`; production WebP textures are in `public/art/`. These assets were created using the built-in ImageGen tool. No supplied reference image was incorporated. Inter is covered by the included SIL OFL.

Still mode presents a composed photographic artwork with the portfolio link. It is also used for reduced-motion preferences, missing WebGL, rendering-context loss or a failed texture load. The camera and pointer have damping; rendering stops in settled scenes and when the document is hidden. The exploration scene continues its slow material motion. Mobile texture and pixel-density limits reduce GPU load.

## Verified locally

The actual browser was used to inspect the opening, intermediate camera positions, separated layers, the coiled scene, positive/negative material and the exit. Viewports checked: 320 × 740, 390 × 844, 768 × 1024, 1280 × 800 and 1440 × 900. All five act anchors were checked at 320 px without horizontal overflow. Keyboard range controls, negative toggle, motion preference and hash restoration were exercised.

Separate local fixtures checked disabled JavaScript, unavailable WebGL, simulated system reduced motion and actual WebGL context loss. They are excluded from the build. The production build was served under `/Portfolio/`; its browser console was clear. Safari/Firefox and physical touch devices were not separately tested.

`afterimage-preview.mp4` is a 56-second browser capture of the new experience. `qa/afterimage-opening.png` and `qa/afterimage-film-review.jpg` are visual review artifacts. The recording's capture cadence is not a runtime performance benchmark. Three.js is loaded on demand (about 131 KB gzipped); Vite reports the uncompressed module as a large-chunk warning.
