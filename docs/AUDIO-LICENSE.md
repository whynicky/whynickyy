# Portfolio sound

Procedural button/link clicks, button-only hover cues, and a soft rounded tick when scrolling or dragging between projects are active (`src/sound.js`). There is no background music or route-transition cue. Sound starts disabled on each page load and can be enabled with the sound switch. The choice lasts for the current page session, including route changes. Hover cues are quieter than clicks, limited to buttons (not links), throttled, and skipped for touch input and disabled controls. Gallery ticks are tied to active-project changes, throttled, and silent during initial layout and grid view. Recordings documented below are retained as unused assets; none are loaded during playback.



The MP3 below is retained as an unused legacy asset; it is no longer loaded by the site.

## Legacy recording

Verified and downloaded on 2026-10-26.

## Selected recording

- **Title:** Chill lofi inspired
- **Artist/uploader:** omfgdude
- **Author's track page:** https://opengameart.org/node/74097
- **Artist profile:** https://opengameart.org/users/omfgdude
- **Original MP3:** https://opengameart.org/sites/default/files/ChillLofiR_0.mp3
- **Local file:** `public/audio/lofi.mp3`

The specific track page labels its license **CC0** and links directly to the CC0 1.0 Universal deed. This was checked on the track itself, not inferred from a collection or the artist's other work. The page identifies the author and describes a lo-fi hip-hop recording made in one take on a Yamaha CVP-701, with piano, drums and jazz tags. The upload is dated 29 May 2017.

## License and credit

- **License:** CC0 1.0 Universal (public-domain dedication)
- **Official deed:** https://creativecommons.org/publicdomain/zero/1.0/
- **Legal code:** https://creativecommons.org/publicdomain/zero/1.0/legalcode

The CC0 deed permits copying, modification, distribution and performance, including commercial use, without asking permission. Attribution is not required under CC0. Do not imply the artist endorses this portfolio.

Optional courtesy credit for the site's credits or sound control:

> Music: “Chill lofi inspired” by omfgdude — CC0 1.0, via OpenGameArt.

Link the title to the author's track page and the license name to the official deed.

## Download verification

- Original file downloaded directly from the track's MP3 link; no login or purchase required.
- File is unchanged from the download.
- Format: MP3, stereo, 44.1 kHz, variable bitrate (approximately 176 kb/s average).
- Duration: 123.167 seconds (2:03).
- Size: 2,717,205 bytes.
- SHA-256: `1796a480e3db0c02d5e58059b2ae7cfbeab344f95e0443496790da022cbe91b5`
- Fully decoded with FFmpeg without reported decode errors.

The recording has approximately 3.9 seconds of near-silence at its end (after 119.293 seconds). It is a complete recorded song, not a guaranteed seamless loop. Playback may restart near 119 seconds if a continuous background loop is wanted. Keep playback user-controlled and quiet by default.

The recording is no longer used in playback.

## Interface timbres

Hover: a 75 ms filtered air sweep. Press: a 70 ms low pitched impact with a short attack layer. Gallery scrolling: a quiet 45 ms sine pulse falling from 520 to 310 Hz, with an 8 ms attack. These are synthesized locally without external recordings, using distinct sources and envelopes. Existing mute, hover targeting and rate limits remain in effect.
