# Pokédex 2.0 — Mobile-first handoff

Nov 9, 2026 · @Rasmus

## Overview

Pokédex mode becomes mobile-first: one no-scroll screen with the Pokémon on top and a swipeable grid tray below; desktop becomes a wider version of the same structure. The source of truth is the Mobile 448 boards on the [Pokédex 2.0 canvas](https://claude.ai/artifact/JGxJSwTajAzqnEhd8Bgcyj).

**Target devices**

| Device | Viewport (CSS px) | Notes |
| --- | --- | --- |
| Mobile (primary) | 448 × 867 | DPR 2.25, so artwork needs ≥ 2× sources |
| Desktop | 1920 × 1080 | Same structure, wider tray, larger hero |

**Feedback driving the change** (primary user: a 4-year-old)

| Feedback | Design answer |
| --- | --- |
| Base stats aren't interesting | Stats collapsed behind a "Stats" toggle, closed by default |
| Pokémon should be swipable | Swipe the hero card left/right for next/previous |
| Grid should be swipable, Next buttons are bad | Grid becomes a horizontal paged tray with dots; no pagination buttons |
| Easy to tap the wrong thing | Targets ≥ 44 px (cards 92 × 100), 12 px gaps, swipe never triggers a tap |
| Annoying to scroll down to the grid | Hero and tray share one viewport; the page never scrolls |

Out of scope here: the "Who's that?" game screens, which keep their current design until reviewed for mobile.

## Layout and structure

The screen is a fixed-height flex column (`h-dvh overflow-hidden`): header and tray take their natural height, the hero takes whatever is left. Nothing on the page scrolls vertically.

| Zone | Height at 448 × 867 | Contents |
| --- | --- | --- |
| Header | \~72 px (12 px padding) | Logo mark 44 px, mode switch (Dex / Game) 44 px tall, search icon button 48 px |
| Hero | flex-1 (\~495 px) | Number, name, type chips, 236 px artwork circle, Swipe hint + Stats toggle pinned to the bottom |
| Tray | \~300 px | "Generation I" + range label, 2 × 4 card page (cards 92 × 100, 12 px gap), page dots |

**Rules**

- Use `dvh`, not `vh`, so mobile browser chrome doesn't push the tray off-screen.
- Side padding 20 px for header and tray, 24 px inside the hero.
- The hero has a 2 px bottom shadow (`#b9b8c6`) separating it from the tray, as on desktop.
- If the viewport is shorter than \~760 px, shrink the artwork circle first (e.g. `size-[min(236px,30dvh)]`), never the tray cards.
- Search opens as an overlay or sheet from the header icon; it never takes permanent vertical space.

## Design tokens

Keep the existing `@theme` in globals.css and add the four tokens below; the type colours stay as they are.

| Token | Value | Use |
| --- | --- | --- |
| `--color-background` | #dcdce0 | Page, header, tray |
| `--color-surface` | #f2f2f2 | Hero, idle buttons |
| `--color-foreground` | #385b73 | Primary text, active mode pill, filled buttons |
| `--color-divider` | #9e9bba | Card and button borders |
| `--color-primary` | #ddb141 | Selected card ring, Surprise me button |
| `--color-muted` | #94a5b1 | Decoration only: fails contrast as text |
| `--color-ink-secondary` (new) | #4c5f6d | Secondary text; passes 4.5:1 on background and surface |
| `--color-card` (new) | #ebebef | Idle tray card |
| `--color-skeleton` (new) | #e1e1e6 | Sprite placeholders, stat-bar track |
| `--color-rule` (new) | #c4c3d3 | Header bottom border, disabled borders |

**Type chips:** background = the type colour; text #1f2d38, except white on Poison, Ghost, Fighting, Dragon and Dark (check each pair for 4.5:1).

**Typography**

| Role | Font | Size |
| --- | --- | --- |
| Pokémon name (hero) | Silkscreen | 32 px mobile / 44 px desktop |
| Empty-state title | Silkscreen | 30 px |
| Buttons, chips, labels | Silkscreen | 12 px (card names 9–10 px) |
| Numbers, ranges, stat values | Geist Mono | 12–14 px |
| Body and hints | Geist | 14–16 px |

Silkscreen is a stand-in for the Figma display font: swap it if the original is known. Load fonts with `next/font/google`.

**Radii:** cards 16 px, buttons 12 px, pills 999 px, artwork circle 50%. **Spacing:** 4 px base; 12 px between tappable things, never less.

## Components

Six components under one `<Dex>` that owns the state (see State and data). Each one is the same on mobile and desktop; only sizes change.

| Component | Props | States | Notes |
| --- | --- | --- | --- |
| `DexHeader` | `mode` | Dex / Game active | Logo mark, mode switch (two links, `aria-current`), search icon button with `aria-label` |
| `HeroCard` | `pokemon \| null`, `onNext`, `onPrev`, `onSurprise` | Empty, loading, filled | Empty: "Pick a Pokémon", dashed "?" circle, Surprise me. Filled: number, name, type chips, artwork, Swipe hint, Stats toggle. Neighbour peeks (88 px grey circles, half off-screen) when prev/next exist |
| `StatsPanel` | `stats`, `open`, `onToggle` | Closed (default), open | Overlay inside the hero above the toggle (16 px from sides, white, 20 px radius, soft shadow). Closes when the Pokémon changes |
| `Tray` | `pokemon[]`, `selectedId`, `page`, `onPage`, `onPick` | Per page | Horizontal pages of 2 × 4 cards (mobile), next page peeks \~32 px at the right edge |
| `TrayCard` | `pokemon`, `selected` | Idle, selected, pressed | 92 × 100, sprite 48 px, name 9 px. Selected: 3 px #ddb141 border, white fill, `aria-pressed` |
| `PageDots` | `count`, `current` | — | Decorative (`aria-hidden`): 8 px dots, the current one stretches to 24 px |

The range label ("#001–#008") sits top-right of the tray and replaces the old "x of 151" counter plus the numbered pagination bar.

## Interactions and gestures

Every gesture has a button or key equivalent, and a swipe never counts as a tap.

| Input | Where | Result |
| --- | --- | --- |
| Swipe left / right (≥ 50 px) | Hero, Pokémon selected | Next / previous Pokémon; tray jumps to the page holding it |
| Swipe left / right (≥ 30 px) | Tray | Next / previous page; selection unchanged |
| Tap | Tray card | Select that Pokémon; closes Stats |
| Tap | Surprise me | Select a random Pokémon |
| Tap | Stats ▾ | Toggle the stats overlay |
| ← / → keys | Hero focused | Same as hero swipe |
| Tab / Enter | Tray | Cards are real buttons; the tray scrolls the focused card into view |

**Tap vs swipe.** Record `clientX` on `pointerdown`. On `pointerup`, a move past the threshold is a swipe: set a `swiped` ref and ignore the click that follows. Put `touch-action: pan-y` on the hero and tray so vertical browser gestures still work but horizontal ones reach your handler.

**Native option for the tray.** `overflow-x-auto snap-x snap-mandatory` with `grid-flow-col grid-rows-2` gives touch swiping for free; read `scrollLeft` to update the dots. Choose one model (native scroll-snap or pointer + transform) for the tray and keep it; don't mix them.

**Edge cases**

- First Pokémon: no left peek, swipe right does nothing (add a small rubber-band bounce).
- Last Pokémon of the loaded set: fetch the next page before allowing the swipe.
- Search result: select it and move the tray to its page, the same as a tap.

## Animation (GSAP)

Motion is a goal of the project, so every state change gets a short, specific animation. The values below are starting points to tune by feel.

| Moment | Motion | Duration / ease |
| --- | --- | --- |
| Hero swipe | Current card follows the finger; on release it slides out and the next slides in from the swipe side | 0.35 s, `power3.out` |
| Hero swipe, no neighbour | Rubber-band: follows at 30% of the drag, springs back | 0.4 s, `elastic.out(1, 0.5)` |
| Empty → selected | "?" scales down and fades; artwork pops in (scale 0.8 → 1), then name, then type chips staggered | 0.5 s total, chips `stagger: 0.06` |
| Stats open | Panel rises 12 px and fades in; bars grow from 0 to value, staggered | 0.3 s, bars `stagger: 0.04` |
| Tray page change | Track slides to the new page | 0.3 s, `power2.out` |
| Card selected | Card lifts 2 px and the gold ring scales in from 0.9 | 0.2 s, `back.out(2)` |
| Surprise me | Short shuffle (3–4 random sprites flicker in the circle) before landing | \~0.6 s |
| Page dots | Active dot width 8 → 24 px | 0.2 s |

**Setup in Next.js**

- Use `useGSAP()` from `@gsap/react` so timelines are scoped to the component and cleaned up on unmount.
- Use `gsap.matchMedia()` where mobile and desktop differ (swipe distances, hero size), plus a `(prefers-reduced-motion: reduce)` branch that swaps slides and pops for plain fades.
- Animate only `transform` and `opacity`; never animate layout properties during a swipe.
- Draggable with InertiaPlugin is an option for the hero card if hand-rolled pointer code feels stiff.

## Responsive: desktop at 1920 × 1080

Desktop keeps the mobile structure (header, hero, tray in one no-scroll viewport), so the difference is breakpoint classes, not a second layout.

| Element | Mobile (< 768 px) | Desktop (≥ 1024 px) |
| --- | --- | --- |
| Hero | Stacked: name block over a 236 px art circle | Two columns: name, types and Stats left; art circle \~420 px right |
| Stats | Overlay toggle | Same toggle, closed by default, opening inline in the left column |
| Tray | 2 rows × 4 per page | 2 rows × 7 per page (cards \~132 px) |
| Tray navigation | Swipe + dots | Swipe/drag + dots, plus ← → keys and optional edge arrows on hover |
| Search | Icon → overlay | Inline field in the header |
| Content width | Full width, 20 px gutters | `max-w-[1200px]` centred |

**Rules**

- Pick breakpoints in CSS (`md:` / `lg:`); don't branch on `window.innerWidth` in render, which causes hydration flashes in Next.js.
- If one piece really differs, render both and hide one (`md:hidden` / `hidden md:flex`); never swap whole page trees.
- At 1080 px tall, check the 420 px artwork plus the tray fit without scrolling; shrink the artwork before the tray.

The current desktop boards (Empty, Main, Pagination) predate this feedback; redraw them at 1920 × 1080 before building desktop.

## State and data

One hook owns selection and paging. Components only read it and call its actions, so mobile and desktop share all logic.

```ts
type UsePokedex = {
  list: PokemonSummary[];       // id, name, sprite
  selected: Pokemon | null;     // null = empty state
  page: number;
  perPage: number;              // 8 mobile, 14 desktop
  select(id: number): void;     // also sets page = floor(index / perPage)
  next(): void; prev(): void;
  surprise(): void;
  setPage(p: number): void;
};
```

Put the selected id in the URL (`?id=6`) so a refresh or shared link opens the same Pokémon; no id = the empty state.

**PokeAPI**

| Need | Endpoint | Fields |
| --- | --- | --- |
| Grid list | `/api/v2/pokemon?limit=151` | `name`, `url` (id from the URL) |
| Tray sprite | sprite URL built from the id | `sprites.front_default` pattern |
| Detail | `/api/v2/pokemon/{id}` | `types`, `stats`, `height`, `weight`, `sprites.other["official-artwork"].front_default` |
| Evolutions (later) | `/api/v2/pokemon-species/{id}` → `evolution_chain.url` | chain |

Cache responses (Next `fetch` cache or React Query); prefetch detail for the neighbours of the selected Pokémon so a swipe never waits.

**States to design and build**

| State | Hero | Tray |
| --- | --- | --- |
| Empty (no id) | "Pick a Pokémon" + Surprise me | Page 1, nothing selected |
| Loading detail | Keep the old card dimmed, or a skeleton circle + name bar | Unchanged |
| Loaded | Full card | Selected card ringed |
| Error | "Couldn't load that one" + Try again button | Unchanged |
| Search with no hits | Unchanged | Message in the tray area: "No Pokémon called …" |

## Accessibility and kid-safety

Small hands are the main constraint: big targets, wide gaps, nothing destructive within reach.

- [ ] Every tappable element is at least 44 × 44 px; tray cards 92 × 100.
- [ ] At least 12 px between neighbouring targets; the Stats toggle sits 16 px or more above the tray.
- [ ] Swipes never fire a tap (swipe flag + thresholds from Interactions).
- [ ] No action in Pokédex mode needs undoing; anything that would (resetting a game, deleting a score) asks for confirmation.
- [ ] The mode switch is the only way out of Pokédex mode, and it sits at the top, away from the thumb zone.
- [ ] Text contrast 4.5:1: secondary text uses #4c5f6d, never `--color-muted`.
- [ ] Interactive elements are real `<button>` / `<a>`; icon-only buttons have `aria-label`; tray cards use `aria-pressed`.
- [ ] The hero is a labelled region; a name change is announced through an `aria-live="polite"` element.
- [ ] Keyboard: ← → on the hero, Tab through the tray, visible focus rings (`--color-primary` outline).
- [ ] `prefers-reduced-motion` swaps slides for fades (see Animation).
- [ ] Text stays legible at 200% zoom (the tray may scroll horizontally, the page may not).
- [ ] Artwork `alt` is the Pokémon's name; decorative peeks and the "?" are `aria-hidden`.

## Open questions and build order

**Open questions**

- [ ] Does the hero swipe through all 151 Pokémon, or only the loaded tray page?
- [ ] Is the evolution chain (on the old desktop design) kept on mobile, and where: inside Stats, or its own toggle?
- [ ] Generation filter: Gen I only, or a switcher later? It affects the tray header and perPage maths.
- [ ] Display font: confirm the Figma font or keep Silkscreen.
- [ ] Does "Who's that?" get the same mobile-first pass, and does a 4-year-old type guesses? Free-text input may need picture choices instead.

**Suggested build order**

1. Tokens and fonts in globals.css and the layout shell (`h-dvh`, three zones).
2. `usePokedex` hook against PokeAPI, with the selected id in the URL.
3. `Tray` + `TrayCard` + `PageDots`, with swipe and tap-vs-swipe handling.
4. `HeroCard` empty and filled states, then the hero swipe.
5. `StatsPanel` toggle.
6. GSAP pass: the moments in the Animation table, then reduced motion.
7. Desktop breakpoint classes, after redrawing the desktop boards at 1920 × 1080.
8. Test with the stakeholder on the real phone.
