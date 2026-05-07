# GitHub Pages Migration Notes

This folder is a static GitHub Pages deployment package for highsky.life.

Included:
- HTML pages
- CSS
- JavaScript
- PNG assets
- CNAME for highsky.life
- .nojekyll to publish files as-is

Not included:
- index.php
- contact.php

Known blocker:
- contact.html still posts to contact.php. GitHub Pages cannot run PHP, so the contact form needs a static-compatible backend such as Formspree, Netlify Forms, Basin, Getform, or a GitHub Actions/API-based mail endpoint before the form can submit successfully.
