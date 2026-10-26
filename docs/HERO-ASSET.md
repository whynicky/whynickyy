# Faceless hero portrait

Asset: `public/images/presence-faceless-v2.png` (1536 × 1024, RGBA).

Created with the built-in ImageGen tool from the user's supplied faceless silhouette reference. The image retains an erased face, vertical streaks, dark hair and a black shirt. It is not a likeness claim about the portfolio owner. The earlier generated portrait with visible facial features is not used.

## Generation prompt

Use case: background-extraction. Edit target: the attached image of a dark faceless man. Make a precise transparent cutout of THIS EXACT SILHOUETTE. Preserve the erased black face and its vertical smeared streaks exactly in spirit, with NO visible eyes, NO nose, NO mouth, NO recognizable facial features. Preserve the dark messy hair, ears, neck, black shirt, pose, proportions and 3:2 framing. Remove ALL gray background, white halo and vignette around the man. Output true transparent alpha outside the person, including around hair and shoulders. The subject stays dark, photographic, monochrome, with only faint gray vertical streaks across the empty face. Do NOT restore or reconstruct the face. Do NOT add blue yet. No backdrop, no halo, no shadow outside silhouette, no text. The shirt must reach the bottom of the canvas.

## Rendering

`studio-scene.js` composites the alpha cutout over procedural monochrome grain. An invariant face mask confines the animated blue vertical texture. The same texture supplies the silhouette and face: there is no separate anatomical portrait and no animated head geometry. The cutout alpha is tightened at rendering time to suppress the faint extraction halo.

The scene is sized from its container using ResizeObserver. Reduced motion renders the same composition at time zero. When WebGL is unavailable, the CSS fallback uses the same cutout and a static blue surface. CSS framing in `presence-hero.css` matches the shader's desktop/mobile cutout placement.
