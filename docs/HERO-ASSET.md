# Faceless hero portrait

Asset: `public/images/presence-faceless-v2.png` (1536 × 1024, RGBA).

Created with the built-in ImageGen tool from the user's supplied faceless silhouette reference. The image retains an erased face, vertical streaks, dark hair and a black shirt. It is not a likeness claim about the portfolio owner. The earlier generated portrait with visible facial features is not used.

## Generation prompt

Use case: background-extraction. Edit target: the attached image of a dark faceless man. Make a precise transparent cutout of THIS EXACT SILHOUETTE. Preserve the erased black face and its vertical smeared streaks exactly in spirit, with NO visible eyes, NO nose, NO mouth, NO recognizable facial features. Preserve the dark messy hair, ears, neck, black shirt, pose, proportions and 3:2 framing. Remove ALL gray background, white halo and vignette around the man. Output true transparent alpha outside the person, including around hair and shoulders. The subject stays dark, photographic, monochrome, with only faint gray vertical streaks across the empty face. Do NOT restore or reconstruct the face. Do NOT add blue yet. No backdrop, no halo, no shadow outside silhouette, no text. The shirt must reach the bottom of the canvas.

## Rendering

`studio-scene.js` composites the alpha cutout over a procedural monochrome halo. The existing local `presence-portrait.jpg` supplies light and shadow inside the blue face; it is needed for the distortion to retain volume. The cutout alpha is tightened at rendering time to suppress the faint extraction halo.

The live reference is [Ravi Klaassens](https://www.raviklaassens.com/), inspected on 2026-10-26. Its published UnicornStudio scene combines depth parallax, an eight-octave anisotropic noise displacement and stochastic tonal quantization. The important distinction is that displacement samples the whole portrait, including its edges, rather than drawing moving stripes inside a fixed mask. This creates irregular fragments and gaps that reveal the backdrop. The reference colors ears and neck as well as the face.

Our shader implements those mechanics independently: nested fractal noise moves the sampling coordinates, a circular falloff limits distortion around the head, damped pointer movement gives a shallow depth response, and animated 0.08-step dithering treats the entire composition. Rendering is capped at 24 fps and one canvas pixel per CSS pixel. Noise scale and displacement strength are adjusted for our portrait framing. The reference photograph, depth map and runtime are not included. This is not a pixel-identical reproduction: the portrait, blue coloring, noise field and approximate depth response differ.

The scene is sized from its container using ResizeObserver. Reduced motion renders the same composition at time zero. When WebGL is unavailable, the CSS fallback uses the same cutout and a static blue surface. CSS framing in `presence-hero.css` matches the shader's desktop/mobile cutout placement.

The noise uses row-vector octave rotation and a 1:0.25 axis ratio, matching the reference field. The reference runtime advances shader time at 60 × 0.12 per second, giving our 0.18 phase and 0.036 drift rates. Displacement strength is 0.40 (previously 0.62) to keep our narrower silhouette connected while retaining small fragmented edges.

The existing logo-and-expanding-window entrance in `main.js` is preserved. The logo has no clipping mask: on mobile the downward travel exceeds the former font-relative mask. Mobile letter spacing is bounded by the available viewport width and fades only after the descent. Verified during descent at 390 × 844 and 320 × 568.
