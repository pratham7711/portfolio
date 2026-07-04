# Higgsfield Hero Video — Brief & Prompts

A short looping hero/intro video for `prathamsharma.in`. The clip should feel like the **on-site GSAP blowup transition** captured in motion — same palette, same cinematics, designed to drop into the hero behind the wireframe icosahedron (or replace it for splash/social).

The aim: **5 seconds, seamlessly loopable, 1920×1080 or 1080×1920**, that reads as part of the UI — not a stock AI cinematic.

---

## Core visual DNA (this MUST match the site)

| element | spec |
|---|---|
| Background | Off-black, slight charcoal vignette. Hex `#0a0a0a` center, `#111113` edges. NOT pure black. |
| Accent | Single cyan — `#00E5D1` only. No purple, no blue, no rainbow gradients, no AI mauve. |
| Mood | Cinematic, restrained, technical. Awwwards / studio-reel energy, not crypto landing page. |
| Texture | Subtle film grain overlay (matches the existing `body::before` grain at 3% opacity). |
| Motion easing | Heavy `power3.out` / `back.out(1.4)` style — natural overshoot, not linear. |
| Typography (if any) | `Space Grotesk` 700, tight tracking, white #ffffff. |

If the generated video does **any** of these, regenerate:

- Purple→blue gradient ("AI gradient")
- Lens flares from the sun
- Generic data-center / circuit-board background
- "Holographic" rainbow text
- Cliche neon city
- HUD overlays with random Japanese characters

---

## Concept A — "The Implosion" (primary, matches the card transition)

**Story beat:** A glowing cyan wireframe icosahedron rotates slowly in a dark void. At 2.0s, it pulses, then violently shatters outward into ~120 angular shards that fan radially toward camera. As shards reach peak distance, they reverse and collapse inward, re-forming the icosahedron with a soft cyan shockwave ring expanding past camera. The shape locks back into its slow rotation. Loop seamless.

Beat-by-beat timing (5.0s loop):

- **0.0–1.8s** — slow handheld-stable orbit around the wireframe icosahedron. Faint grain. Subtle inhale.
- **1.8–2.0s** — energy pulse: edges brighten from 60% to 100% opacity, scale by 1.04, deep low-frequency hum builds.
- **2.0–2.5s** — shatter: ~120 thin cyan shards (10px × 2px each) fan outward at 360°, motion-blurred, with radial cyan glow trail. Shockwave ring crosses frame.
- **2.5–3.2s** — shards reverse and collapse to center, slight rotation, lensing.
- **3.2–3.8s** — re-formation: shape rebuilds with `back.out` overshoot (scale 1.06 → 1.0).
- **3.8–5.0s** — same slow orbit as opening (this is what makes the loop seamless).

### Higgsfield prompt — primary

```
A cinematic 5-second seamless loop of a glowing cyan wireframe icosahedron
floating in an off-black void (#0a0a0a). The icosahedron rotates slowly,
then pulses brighter, then violently shatters into 120 thin cyan shards that
fly outward in all directions with motion-blur trails. The shards pause at
peak distance, then collapse back inward and re-form the icosahedron with a
soft elastic overshoot. A single cyan shockwave ring (#00E5D1) expands past
the camera at the moment of detonation. Subtle film grain throughout.
Camera holds steady, slight handheld breathing. No text. No logos. Single
cyan accent — no purple, no rainbow, no lens flares. Mood: technical,
restrained, studio-reel. Inspired by Awwwards SOTD intros and Locomotive
studio reels. 1920x1080, 24fps, h.264, seamless loop.
```

### Higgsfield prompt — vertical / social cut

Same as above, but replace last line with: `1080x1920 vertical, 24fps, optimized for Instagram Reels / portfolio share card.`

---

## Concept B — "Type Shatter" (alternate, for a future hero swap)

**Story beat:** The name "PRATHAM SHARMA" assembles letter-by-letter from a cloud of drifting cyan particles. After holding for 1.5s, the letters disintegrate back into the particle cloud, which then re-converges and the cycle repeats.

Use case: dropped behind the existing Hero `<h1>` at low opacity (~25%) as a moving texture instead of the static `bgText "PS"`.

### Higgsfield prompt — type shatter

```
A 5-second seamless loop. Thousands of tiny cyan particles (#00E5D1) drift
in a pure off-black void (#0a0a0a). At 1.0s they converge with magnetic
attraction and assemble into the bold sans-serif text "PRATHAM SHARMA" in
Space Grotesk Bold, tight letter-spacing -2%, brilliant white #ffffff with
a soft cyan edge-glow. Hold sharp for 1.5 seconds. At 2.5s the letters
disintegrate — every particle flies outward, motion-blurred, then drifts.
At 4.5s they begin converging again. Subtle film grain. No camera motion.
Single cyan accent only — no purple, no rainbow, no other colors. Mood:
cinematic, technical, premium portfolio. 1920x1080, 24fps, seamless loop.
```

---

## Concept D — "Straw Hat Run" (anime-stylized, One Piece-vibe)

**Use case:** This is the user-requested anime concept. A 4-second loop of a stylized straw-hat-wearing silhouette running across rooftops at sunset, captured in a vertical strip that drops behind the hero text. Pairs with the on-page volleyball that drops as the user scrolls — the video sets the anime tone, the ball is the playful counterpart.

**Important IP note:** Higgsfield will refuse prompts that name "Luffy" / "One Piece" outright (and even if it allowed, shipping copyrighted character likenesses on a portfolio invites takedowns + DMCA risk). The prompt below is engineered to capture *the vibe* — straw hat, red vest, rope belt, sun-soaked frame, that energetic forward-leaning run cycle — without naming or replicating the character.

**Story beat:** Camera tracks parallel to a male silhouette running left-to-right across red-tiled rooftops at golden hour. Loose-fitting open red vest, simple white shirt under, dark cargo shorts, a yellow straw hat with a red ribbon flying behind, arms windmilling in determined sprint. Light streaks behind him. Behind: distant pirate-town skyline + ocean horizon, gulls. Frame at the moment he jumps a gap between roofs (slow-mo airborne pose, 24fps + frame-blend), then resumes running. Seamless loop.

### Higgsfield prompt — straw hat run

```
Cinematic 4-second seamless loop, anime-stylized, painterly Studio
Ghibli-meets-modern-anime aesthetic. Side-tracking shot of a young man's
silhouette running left-to-right across red-tiled rooftops at golden
hour sunset. Outfit: open loose red vest, white shirt underneath, dark
cargo shorts, rope-belt, yellow straw hat with a red ribbon trailing
behind him in the wind. He runs with determined forward-leaning energy,
arms windmilling. At 2 seconds he leaps across a gap between rooftops
in slow motion, then lands and keeps running. Background: distant
pirate-town skyline with weathered buildings, ocean horizon visible
between rooftops, two seagulls in flight. Color palette: warm orange-red
sunset, deep teal ocean, cream-yellow straw hat. Subtle anime speed
lines streak behind him. Subtle film grain. Loose hand-drawn cel-shaded
animation feel, NOT photorealistic, NOT 3D-CGI. No text. No logos.
1920x1080 OR 1080x1920 vertical, 24fps with frame-blend on the leap,
seamless loop.

Negative prompt: photorealistic, 3D render, CGI, hyperrealistic skin,
cluttered urban background, generic anime AI faces, distorted hands,
text, watermarks, low resolution, glitch, pixelated, vhs.
```

### Optional alt — "Volleyball Spike" (matches the on-site dropping ball)

If the dropping volleyball is the headline gesture, render a counterpart video where an anime-stylized hand spikes a volleyball downward in slow motion, ball flies toward camera, frame freezes on contact with the "floor". Loops back to the wind-up.

```
Cinematic 3-second loop, anime-stylized cel-shading. Low-angle shot
looking up at a young athlete mid-air spiking a white volleyball
downward, sunset gym lighting streaming through high windows. Captured
at the moment of impact — palm flat on the ball, body twisted, speed
lines radiating outward, single dramatic sweat droplet flicking off.
Ball flies toward camera in slow motion at the end of the loop.
Painterly anime aesthetic, Haikyuu-meets-modern-Ghibli energy. Warm
amber backlight, cool teal court below. Subtle film grain. No text.
1920x1080, 24fps, seamless loop.
```

---

## Concept C — "Card Burst" (mirrors the on-site transition)

**Story beat:** A glass-morphism browser-window card (matching the Featured Project visual) holds in frame, then explodes into 10 cyan shards that fan radially as a shockwave ring crosses past camera. A second card materializes behind from a centered point of light, scaling up with overshoot.

This is literally the on-site transition rendered as video — useful as a social teaser or showreel section. The video and the in-product motion become the same beat.

### Higgsfield prompt — card burst

```
Cinematic 4-second loop, off-black studio void (#0a0a0a). A floating
glass-morphism dark browser-window card hovers in frame (1px white border
at 8% opacity, rounded corners, subtle inner shadow). At 1.5s the card
implodes — slight scale-down, rotation -1.5 degrees, then explodes into
10 thin cyan shards (#00E5D1) that fan radially outward with motion
blur. A single cyan shockwave ring expands past the camera at the same
moment, with soft drop-shadow glow. At 2.2s a new identical card
materializes from a centered point of light, scaling up with elastic
overshoot (back.out 1.4), then settles. Subtle film grain. Camera locked.
Single cyan accent only — no purple, no rainbow, no other colors. Mood:
technical, restrained, awwwards. 1920x1080, 24fps, seamless loop.
```

---

## Generation settings (Higgsfield)

| field | value |
|---|---|
| Model | Higgsfield "Soul" or "Lite" (Soul preferred for cinematic feel) |
| Aspect | 16:9 for hero embed · 9:16 for social cut |
| Duration | 5s (Higgsfield default) |
| Motion intensity | Medium-high (3 of 5) — needs the shatter to read, not a slow drift |
| Style | Cinematic / Studio Reel — NOT "AI Art", NOT "Anime" |
| Negative prompt | `purple, blue gradient, rainbow, neon city, lens flare, holographic text, generic AI background, lens dirt, watermarks, text overlays, logos, sun, sky, clouds, japanese characters, glitch, pixelation, vhs, low resolution` |
| Seed | Lock the seed once a good take lands so re-renders stay consistent |

---

## Post-processing checklist before shipping

1. Export at 24fps h.264, CRF 20 — small file, premium feel.
2. Run through `ffmpeg -vf "loop=1:1:0,boomerang"` or use Premiere "Reverse" overlay to guarantee seamless loop endpoints if Higgsfield's loop is rough.
3. Re-grade in DaVinci Resolve / Premiere if cyan drifts: target HSL hue ≈ `175°`, sat `100%`, val `90%`.
4. Compress to <2MB for hero embed. <8MB for full showreel.
5. Provide a **poster frame** (first frame export as PNG) for `<video poster=...>` fallback.

---

## How to integrate into the site once rendered

### Option 1 — Hero background loop

Replace `Hero.tsx` `bgTextRef` `<div>PS</div>` with:

```tsx
<video
  ref={bgTextRef}
  className={styles.bgVideo}
  src="/hero-loop.mp4"
  poster="/hero-loop-poster.jpg"
  autoPlay muted loop playsInline preload="metadata"
/>
```

CSS: `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: 0.35; mix-blend-mode: screen; pointer-events: none;`

Add `prefers-reduced-motion` rule that sets `display: none` on the video and falls back to the existing static layer.

### Option 2 — Social share / Instagram Reel

Use the 9:16 cut as a portfolio teaser. Drop the URL `prathamsharma.in` in the last 1.5s.

### Option 3 — OG video preview

Most platforms (Twitter/X, LinkedIn) auto-play short MP4s embedded via `<meta property="og:video">`. Add:

```html
<meta property="og:video" content="https://prathamsharma.in/hero-loop.mp4" />
<meta property="og:video:type" content="video/mp4" />
<meta property="og:video:width" content="1920" />
<meta property="og:video:height" content="1080" />
```

---

## Open questions for you

1. Hero embed or social-only? (Affects which aspect to generate first.)
2. Should the video replace the existing 3D wireframe icosahedron or sit *behind* it (low-opacity texture)? Replacing it removes the live mouse-parallax interaction — keeping both means more bandwidth but more "alive" feel.
3. Want me to also draft a short voiceover/caption script if this goes on LinkedIn?
