import os
import datetime
import re

# --- CONFIGURATION ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CONTENT_DIR = os.path.join(BASE_DIR, "../src/content/flash-updates")

def create_flash():
    print("\n⚡ PRISM LAKE FLASH WIRE ⚡\n")
    
    headline = input("📢 Headline: ").strip()
    if not headline: return

    # Auto-generate timestamp
    now = datetime.datetime.now()
    date_str = now.strftime("%Y-%m-%d")
    time_str = now.strftime("%H:%M")
    
    print(f"⏰ Time set to: {date_str} {time_str}")
    
    # Quick Category Selection
    print("\nCategory: [1] MACRO  [2] EARNINGS  [3] VOLATILITY  [4] CRYPTO  [5] GEOPOL")
    cat_map = {"1": "MACRO", "2": "EARNINGS", "3": "VOLATILITY", "4": "CRYPTO", "5": "GEOPOL"}
    cat_choice = input("👉 Select: ").strip()
    category = cat_map.get(cat_choice, "BREAKING")

    # Impact Level (Colors)
    print("\nImpact: [1] LOW (Gray)  [2] MED (Blue)  [3] HIGH (Red/Pulse)")
    imp_map = {"1": "Low", "2": "Medium", "3": "High"}
    imp_choice = input("👉 Select: ").strip()
    impact = imp_map.get(imp_choice, "Medium")

    # Filename: YYYYMMDD-HHMM-slug.mdx (Ensures unique filenames)
    safe_slug = re.sub(r'[^a-z0-9]', '', headline.lower()[:20])
    filename = f"{now.strftime('%Y%m%d-%H%M')}-{safe_slug}.mdx"
    filepath = os.path.join(CONTENT_DIR, filename)
    
    content = f"""---
headline: "{headline}"
date: "{date_str}"
time: "{time_str}"
category: "{category}"
impact: "{impact}"
---
"""
    try:
        os.makedirs(CONTENT_DIR, exist_ok=True)
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"\n✅ FLASH SENT: {headline}")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    create_flash()