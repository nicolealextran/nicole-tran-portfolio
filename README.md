# Nicole Tran Portfolio

A lightweight, responsive portfolio built with plain HTML, CSS, and JavaScript. No framework or build tools required.

## Files
- `index.html` — page content and links
- `style.css` — layout, colors, typography, responsive design
- `script.js` — mobile navigation, photography filters, and lightbox
- `images/` — add your own photos and social video covers here

## Preview locally
Open `index.html` in a browser. For a more reliable local preview, use VS Code with the Live Server extension.

## Replace images
Put your own image files in the `images` folder and keep the filenames used in the HTML, or update the matching `src`, `data-full`, and placeholder text in `index.html`.

Suggested image names:
- `hero.jpg` — main photography hero
- `event-01.jpg`, `event-02.jpg`, `concert-01.jpg`, `portrait-01.jpg`, `editorial-01.jpg` — photography gallery
- `about.jpg` — about portrait
- `model-01.jpg`, `model-02.jpg`, `model-03.jpg` — modeling portfolio
- `ig-01.jpg`, `ig-02.jpg`, `ig-03.jpg` — Instagram Reel covers
- `tt-01.jpg`, `tt-02.jpg`, `tt-03.jpg` — TikTok covers
- `case-study.jpg` — case study feature image

The site will show neutral image placeholders until you add files. JPG, PNG, and WebP are all fine; update the filename extension in the HTML if needed.

## Update social links
In `index.html`, search for `https://www.instagram.com/` and `https://www.tiktok.com/` and replace each with your real profile or individual post URL. Replace the placeholder video headlines and case study copy with your own content.

## Change colors
At the top of `style.css`, edit the CSS variables in `:root`:
- `--black`
- `--cream`
- `--stone`
- `--charcoal`

## Publish free with GitHub Pages
1. Create or sign in to GitHub.
2. Create a new public repository, for example `nicole-tran-portfolio`.
3. Upload `index.html`, `style.css`, `script.js`, `README.md`, and the whole `images` folder.
4. Open the repository's **Settings → Pages**.
5. Under **Build and deployment**, select **Deploy from a branch**.
6. Select branch `main` and folder `/ (root)`, then save.
7. After GitHub Pages finishes publishing, it will show your website URL in the Pages settings.

Every time you commit changes to the repository, GitHub Pages will publish the updates automatically.

## Notes
- The site uses Google Fonts when online and falls back to Georgia/Arial if the fonts are unavailable.
- Social links are placeholders until you replace them.
- Use optimized images for fast loading. A width around 1600–2200px is usually plenty for large portfolio images.
