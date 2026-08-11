# Suncrest Studios — Website

This folder contains the complete Suncrest Studios marketing site.

## Files
- **index.html** — the entire website (HTML + CSS + JavaScript, all in one file). This is the homepage. All photos are embedded directly in the file as base64, so it's fully self-contained — copy it anywhere (including a fresh computer) and it still works.
- **suncrest-logo.svg** — the vector version of the circular logo (scales to any size, transparent background). Not used by the page directly; it's here as an asset for print/other uses.

## Requires an internet connection
Unlike a fully offline site, this page loads a few things live:
- Google Fonts (Baskervville / Libre Baskerville, Bodoni Moda) for headings.
- The hero background video, service-tile slideshows' click-to-play videos, testimonial videos, and the "Examples of our work" / site-showcase videos — all embedded YouTube players, loaded on click (or, for the hero, autoplaying/looping via the YouTube IFrame API).
- Thumbnail images for those videos, pulled live from `img.youtube.com`.

Everything else (text, layout, the services photos, the site-showcase screenshots) is embedded and works fully offline.

## Preview it on your computer
Double-click **index.html** to open it in your browser.

## Edit it
Open **index.html** in a code editor (VS Code is free and recommended: https://code.visualstudio.com).
- All the text/copy lives in the HTML, roughly in the second half of the file.
- All the styling lives in the `<style>` block near the top.
- Tip: in VS Code, use "Fold" (or the arrows in the gutter) to collapse the long embedded-image lines so they're easy to scroll past.

## Page structure (top to bottom)
1. **Hero** — "Solve the content problem." Looping YouTube video background.
2. **How we work** — single feature video with a custom photo thumbnail.
3. **Services** — 3 tiles (Consulting/Strategy, Content Creation, Editing Pipeline), each auto-cycling through several photos.
4. **More than content** — "We can build the whole thing," with a carousel of client website screenshots (ThroughSafety, Hope Dental Implant Center, Analog Leader, Inspire OBGYN).
5. **Examples of our work** — three horizontally-scrollable rows ("lanes"): Hero, Podcast, Social. Each has a draggable scrollbar and prev/next arrows.
6. **Testimonials** — "Don't take our word for it," a scrollable lane of client video testimonials with pulled quotes.
7. **About** — founder photo and bio.
8. **Contact** — email call-to-action.
9. **Footer**.

## Common edits

### Add or swap a video (How we work, Services, Examples lanes, Testimonials, Site showcase)
These all use the same click-to-play pattern — find an element with `data-yt` and `data-poster`:
```html
<div class="... " data-yt="VIDEO_ID" data-poster="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg">
```
Replace `VIDEO_ID` with the 11-character YouTube ID from the URL (`youtu.be/VIDEO_ID` or `watch?v=VIDEO_ID`). The poster can be a `img.youtube.com` thumbnail URL (needs internet) or a `data:image/jpeg;base64,...` URI (works offline). JavaScript at the bottom of the file wires up the click automatically — nothing else to change.

### Add a video to a lane (Hero / Podcast / Social under "Examples of our work")
Find the `<div class="lane-track">` for that lane and add another tile inside it, copying the format of an existing one:
```html
<div class="lane-video feature-video" data-yt="VIDEO_ID" data-poster="https://img.youtube.com/vi/VIDEO_ID/maxresdefault.jpg"><span class="veil"></span><span class="pl"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg></span></div>
```
The **Social** lane still has empty placeholder tiles (`class="lane-video ph-video"` with blank `data-yt`/`data-poster`) — just fill those two attributes in on an existing placeholder and it becomes a real, clickable video; no need to add a new tile.
The lane's scrollbar, drag, and arrow buttons all work automatically off however many tiles are inside `.lane-track` — no JS changes needed.

### Add a testimonial
Look for the `<!-- ADD A REAL TESTIMONIAL -->` comment block above the testimonials section in the HTML — it has full instructions. Short version: copy an existing `.tq` card, set `data-yt` and `data-poster`, and update the name, title, and pulled quote.

### Add a site to the "More than content" showcase carousel
Copy an existing `.site-card` inside `.site-track`, updating the link, the screenshot (`.site-shot img`), the domain shown in `.site-chrome`, and the name in `.site-meta`. Then add one more `.car-dot` button in `.car-dots` so the dot indicators match the new number of cards.

## Contact email
The contact link and footer currently point to **jordangibby@gmail.com** as a placeholder, since a dedicated `@suncreststudios.com` inbox isn't set up yet. Search the file for that address and swap it once a real business email exists.

## Put it online (when ready)
Upload this whole folder to any static host and it's live:
- **Netlify Drop** (easiest): https://app.netlify.com/drop — drag the folder in.
- **Vercel**, **Cloudflare Pages**, **GitHub Pages**, or your existing web host all work too.
Because the homepage is named **index.html**, it will load automatically as the site's front page.
