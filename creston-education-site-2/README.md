# Creston Education website

Split into separate files, built for GitHub Pages. No build step needed on your end. GitHub runs Jekyll automatically and assembles the section files into one page.

## File map

```
index.html              <- head, plus one include per section
_includes/nav.html
_includes/hero.html
_includes/whysit.html
_includes/exam.html
_includes/why.html
_includes/compare.html
_includes/route.html
_includes/careers.html
_includes/about.html
_includes/plans.html
_includes/faq.html
_includes/contact.html
_includes/footer.html
assets/css/style.css    <- all styling
assets/js/script.js     <- tabs, quiz demo, route finder, contact form
assets/img/akansha.jpg  <- about section photo
```

## How to publish

1. Create a new GitHub repository.
2. Add every file above at the same path shown, including the `_includes` and `assets` folders. For text files (`.html`, `.css`, `.js`, `.md`), use "Add file -> Create new file" and paste the content. For `akansha.jpg`, use "Add file -> Upload files" since it is a binary image, not text.
3. In repo Settings -> Pages, set the source to the branch you pushed to (root folder).
4. GitHub builds and publishes automatically. No `_config.yml` is required.

The blank `---` `---` at the top of `index.html` is required. It tells GitHub to process the `{% include %}` tags. Without it, the tags would show up as plain text on the page.

## Before you publish, edit these placeholders

Search each file for `EDIT:` to find them all. Quick list:

- WhatsApp number `91XXXXXXXXXX` in `_includes/footer.html`, `_includes/contact.html`, and `assets/js/script.js`
- Email `hello@crestoneducation.com` in `_includes/contact.html` and `assets/js/script.js`
- Photo: replace `assets/img/akansha.jpg` with the real headshot, same filename
- Prices in `_includes/plans.html`
- Exam sitting date in `_includes/exam.html`
- EDAIC year in `_includes/about.html`

## What changed from the single-file version

The only functional change is the photo. It was a large embedded base64 image, now a real file at `assets/img/akansha.jpg`, referenced normally. Every other line of markup, all CSS, and all JavaScript are unchanged. I tested the assembled page in a headless browser: the MTF quiz demo, exam tabs, route finder, plan-to-contact-form prefill, and the WhatsApp/email compose buttons all work correctly.
