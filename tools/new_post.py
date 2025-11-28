import os
import datetime
import re

# --- CONFIGURATION ---
# This calculates the path to 'src/content/research' relative to this script location
# It ensures the script works regardless of which folder you run the command from
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONTENT_DIR = os.path.join(BASE_DIR, "../src/content/research")

def slugify(text):
    """
    Converts a title like "The Death of Fundamental Investing" 
    into a URL-friendly slug: "the-death-of-fundamental-investing"
    """
    text = text.lower()
    # Remove non-alphanumeric characters (except spaces)
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    # Replace spaces with hyphens
    return re.sub(r'[\s-]+', '-', text).strip('-')

def create_post():
    print("\n=======================================")
    print("   PRISM LAKE RESEARCH GENERATOR 🧬   ")
    print("=======================================\n")
    
    # 1. Get Inputs from User
    try:
        title = input("📝 Title: ").strip()
        if not title:
            print("❌ Error: Title is required.")
            return

        desc = input("📄 Description (Short summary for cards): ").strip()
        
        print("\nChoose a Category:")
        print("1. Market Structure")
        print("2. Volatility")
        print("3. Macro-Quant")
        print("4. Custom")
        cat_choice = input("👉 Selection (1-4): ").strip()
        
        categories = {
            "1": "Market Structure",
            "2": "Volatility",
            "3": "Macro-Quant"
        }
        category = categories.get(cat_choice, input("Type Custom Category: ").strip())

        author = input("👤 Author (Press Enter for 'Darrance Beh'): ").strip()
        if not author:
            author = "Darrance Beh"

        is_premium_input = input("🔒 Is this Premium Content? (y/N): ").lower()
        is_premium = "true" if is_premium_input == 'y' else "false"

    except KeyboardInterrupt:
        print("\n\nAborted.")
        return

    # 2. Generate Metadata & Filename
    date_str = datetime.datetime.now().strftime("%Y-%m-%d")
    slug = slugify(title)
    filename = f"{slug}.mdx"
    filepath = os.path.join(CONTENT_DIR, filename)
    
    # 3. Create the MDX Content Template
    content = f"""---
title: "{title}"
date: "{date_str}"
description: "{desc}"
category: "{category}"
author: "{author}"
premium: {is_premium}
---

## Executive Summary
Write your core thesis here. This is the "TL;DR" for busy institutional readers.

## The Data
Describe the dataset or market phenomenon you are analyzing.

```python
import pandas as pd
import numpy as np

# Example: Calculate realized volatility
def calculate_rv(prices, window=20):
    log_returns = np.log(prices / prices.shift(1))
    return log_returns.rolling(window=window).std() * np.sqrt(252)
```

## The Conclusion
What is the actionable takeaway?

> "Insert a powerful quote or highlight here."

"""

    # 4. Write File to Disk
    try:
        # Create directory if it doesn't exist
        os.makedirs(CONTENT_DIR, exist_ok=True)
        
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
            
        print(f"\n✅ SUCCESS! Created new research note.")
        print(f"📂 Location: src/content/research/{filename}")
        print(f"🔗 Slug:     /research/{slug}")
        
    except Exception as e:
        print(f"\n❌ Error writing file: {e}")

if __name__ == "__main__":
    create_post()