#!/usr/bin/env python3
"""Second pass: convert remaining raw px layout values to rem."""

path = "/home/ubuntu/jessica-shauffer-git/src/app/globals.css"
content = open(path).read()

conversions = {
    "min-height: 260px;": "min-height: 16.25rem;",
    "min-height: 80px;": "min-height: 5rem;",
    "min-width: 200px;": "min-width: 12.5rem;",
    "width: 52px;": "width: 3.25rem;",
    "height: 52px;": "height: 3.25rem;",
    "minmax(min(100%, 480px), 1fr)": "minmax(min(100%, 30rem), 1fr)",
    "max-width: 1040px;": "max-width: 65rem;",
    "max-width: 540px;": "max-width: 33.75rem;",
    "width: 44px;": "width: 2.75rem;",
    "height: 44px;": "height: 2.75rem;",
    "left: 11px;": "left: 0.6875rem;",
    "height: 380px;": "height: 23.75rem;",
    "width: 10px;": "width: 0.625rem;",
    "height: 10px;": "height: 0.625rem;",
    "height: 260px;": "height: 16.25rem;",
    "max-width: 280px;": "max-width: 17.5rem;",
    "height: 280px;": "height: 17.5rem;",
    "height: 220px;": "height: 13.75rem;",
    "max-width: 800px;": "max-width: 50rem;",
    "(max-width: 1023px)": "(max-width: 63.9375rem)",
}

for old, new in conversions.items():
    if old in content:
        content = content.replace(old, new)
        print(f"✅ {old} → {new}")
    else:
        print(f"⚠️  Not found: {old}")

open(path, 'w').write(content)
print("\nDone — second pass complete.")
