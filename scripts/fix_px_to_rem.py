#!/usr/bin/env python3
"""
Convert raw px values to rem in globals.css and fix hero content max-width.
Rules:
  - 16px = 1rem baseline
  - Media query breakpoints: convert px → rem
  - Fixed dimensions (width/height): convert px → rem
  - Border widths (1px, 2px, 3px, 4px), box-shadows, rgba, translateY/X, blur: KEEP as px
  - 9999px (radius-full): keep as is
"""

import re

path = "/home/ubuntu/jessica-shauffer-git/src/app/globals.css"
content = open(path).read()

# ── 1. Widen hero content max-width: 800px → 56rem (896px equivalent, fits 2-line H1)
content = content.replace(
    ".hero__content {\n  position: relative;\n  z-index: 1;\n  text-align: center;\n  max-width: 800px;",
    ".hero__content {\n  position: relative;\n  z-index: 1;\n  text-align: center;\n  max-width: 56rem;"
)

# ── 2. Also widen hero subtitle max-width: 600px → 40rem
content = content.replace(
    ".hero__subtitle {\n  font-size: var(--text-base);\n  color: rgba(255,255,255,0.8);\n  line-height: 1.7;\n  max-width: 600px;",
    ".hero__subtitle {\n  font-size: var(--text-base);\n  color: rgba(255,255,255,0.8);\n  line-height: 1.7;\n  max-width: 40rem;"
)

# ── 3. section__header max-width: 640px → 40rem
content = content.replace("max-width: 640px;", "max-width: 40rem;")

# ── 4. content-narrow: 720px → 45rem
content = content.replace("--content-narrow: 720px;", "--content-narrow: 45rem;")

# ── 5. content-default: 1280px → 80rem (already in px in the token, convert)
content = content.replace("--content-default: 1280px;", "--content-default: 80rem;")

# ── 6. Media query breakpoints px → rem (16px base)
mq_conversions = {
    "(max-width: 767px)": "(max-width: 47.9375rem)",
    "(max-width: 768px)": "(max-width: 48rem)",
    "(max-width: 478px)": "(max-width: 29.875rem)",
    "(max-width: 991px)": "(max-width: 61.9375rem)",
    "(max-width: 47.9375rem)": "(max-width: 47.9375rem)",  # already correct, no-op
}
for px_val, rem_val in mq_conversions.items():
    content = content.replace(px_val, rem_val)

# ── 7. Fixed icon/avatar dimensions px → rem
px_to_rem_fixed = {
    "width: 48px;": "width: 3rem;",
    "height: 48px;": "height: 3rem;",
    "width: 36px;": "width: 2.25rem;",
    "height: 36px;": "height: 2.25rem;",
    "width: 56px;": "width: 3.5rem;",
    "height: 56px;": "height: 3.5rem;",
    "width: 16px;": "width: 1rem;",
    "height: 16px;": "height: 1rem;",
    "width: 6px;": "width: 0.375rem;",
    "height: 6px;": "height: 0.375rem;",
    "grid-template-columns: 56px 1fr;": "grid-template-columns: 3.5rem 1fr;",
    "top: 6px;": "top: 0.375rem;",
    "max-width: 560px;": "max-width: 35rem;",
    "max-width: 400px;": "max-width: 25rem;",
    "min(320px, 85vw)": "min(20rem, 85vw)",
    "min-height: 360px;": "min-height: 22.5rem;",
    "community-card--featured { grid-column: 1 / -1; position: relative; overflow: hidden; padding: 0; min-height: 360px;": 
    "community-card--featured { grid-column: 1 / -1; position: relative; overflow: hidden; padding: 0; min-height: 22.5rem;",
}
for px_val, rem_val in px_to_rem_fixed.items():
    content = content.replace(px_val, rem_val)

# ── 8. page-hero__content max-width: 720px → 45rem
content = content.replace(
    ".page-hero__content {\n  position: relative;\n  z-index: 1;\n  text-align: center;\n  max-width: 720px;",
    ".page-hero__content {\n  position: relative;\n  z-index: 1;\n  text-align: center;\n  max-width: 45rem;"
)

# Also handle inline version
content = content.replace("max-width: 720px;", "max-width: 45rem;")

# ── 9. page-hero subtitle max-width: 600px → 40rem (catch remaining instances)
content = content.replace("max-width: 600px;", "max-width: 37.5rem;")

open(path, 'w').write(content)
print("✅ globals.css updated:")
print("   - hero__content max-width: 800px → 56rem")
print("   - hero__subtitle max-width: 600px → 40rem")
print("   - section__header max-width: 640px → 40rem")
print("   - content-narrow: 720px → 45rem")
print("   - content-default: 1280px → 80rem")
print("   - All media query breakpoints: px → rem")
print("   - All fixed icon/avatar dimensions: px → rem")
print("   - page-hero__content max-width: 720px → 45rem")
