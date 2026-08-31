# DA block library: registering the Hero block

Reference for setting up the [DA (da.live) block library](https://docs.da.live/administrators/guides/setup-library)
for this site (`ramuvaram/eds-training`), so authors can insert the Hero
block from the Library panel instead of hand-typing the block table.

No library exists for this site yet — the steps below are a from-scratch
setup, using Hero as the first registered block. Everything here is
authored content in da.live, not files in this repo; there's nothing to
run or publish from the codebase itself.

`blocks/hero/hero.js` is intentionally empty — only `hero.css` exists,
targeting plain descendant selectors (`.hero picture`, `.hero h1`). An
image + heading dropped in from the library renders correctly with zero
JS, so no code change is needed for Hero to work here.

## 1. Author the Hero example block document

Create a new doc at:

```
https://da.live/edit#/ramuvaram/eds-training/library/blocks/hero
```

(one doc per block, under a `library/blocks/` folder, per the DA guide)
containing two tables:

**Table 1 — the block itself** (image, then heading):

| Hero |
| --- |
| *(an image, e.g. a wide landscape/hero photo)* |
| Discover Edge Delivery Services |

**Table 2 — Library Metadata**, placed immediately after Table 1, so the
library panel shows an info icon with a description:

| Library Metadata |
| --- |
| Description |
| Full-bleed hero banner with a background image and heading. Use it once, at the top of a page. |

Publish the doc so it resolves at:

```
https://content.da.live/ramuvaram/eds-training/library/blocks/hero
```

## 2. Create the Blocks sheet and register Hero

Create a sheet at:

```
https://da.live/sheet#/ramuvaram/eds-training/library/blocks
```

with a `blocks` tab and one row:

| name | path | features |
| --- | --- | --- |
| Hero | `https://content.da.live/ramuvaram/eds-training/library/blocks/hero` | focal-point |

`focal-point` is recommended because Hero's image is full-bleed
(`object-fit: cover`) — the focal-point control lets authors pick what
part of the photo stays visible on crop. It needs no code change: it just
sets `object-position` on the `<img>`, which nothing in `hero.css`
currently overrides.

Publish the sheet so it resolves at:

```
https://content.da.live/ramuvaram/eds-training/library/blocks.json
```

## 3. Register the library in site config

Open:

```
https://da.live/sheet#/ramuvaram/eds-training/.da/config
```

Add (or create) a `library` tab with one row:

| title | path | format | ref | icon | experience |
| --- | --- | --- | --- | --- | --- |
| Blocks | `https://content.da.live/ramuvaram/eds-training/library/blocks.json` | | | | |

Leave `format`/`ref`/`icon`/`experience` blank — those only apply to the
Templates/Icons/Placeholders sheet types, not Blocks.

## 4. Validate

- Open any document in da.live, expand the **Library** panel, confirm
  **Blocks → Hero** appears with the description icon and inserts the
  image + heading pair into the doc.
- Run `npx -y @adobe/aem-cli up`, preview the doc the Hero block was
  inserted into, and confirm it renders per `hero.css` (image full-bleed
  behind a white, centered `h1`) with no console errors.

## Adding more blocks later

Repeat step 1 for each additional block (its own doc under
`library/blocks/`, e.g. `library/blocks/banner`), then add one row per
block to the same Blocks sheet from step 2. The `.da/config` library
registration from step 3 only needs to be done once.
