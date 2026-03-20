#!/usr/bin/env python3
"""
Ahrefs keyword research for Jessica Shauffer's 25-town expansion.
Pulls volume, difficulty, CPC, and traffic potential for key real estate queries.
"""
import os
import json
import time
import requests

API_KEY = os.environ.get("AHREFS_API_KEY", "")
BASE_URL = "https://api.ahrefs.com/v3"
HEADERS = {"Authorization": f"Bearer {API_KEY}"}

TOWNS = [
    "North Easton", "South Easton", "Easton", "Bridgewater", "West Bridgewater",
    "East Bridgewater", "Canton", "Sharon", "Raynham", "Taunton", "Plymouth",
    "Norton", "Mansfield", "Foxborough", "Attleboro", "Halifax", "Kingston",
    "Lakeville", "Middleborough", "Stoughton", "Hingham", "Norwood",
    "Weston", "Westwood", "North Attleborough"
]

QUERY_TEMPLATES = [
    "homes for sale in {town} MA",
    "real estate agent {town} MA",
    "buy a home in {town} Massachusetts",
    "sell my home {town} MA",
    "{town} MA real estate",
    "best realtor {town} MA",
    "{town} MA housing market",
    "moving to {town} MA",
]

def fetch_keywords_batch(keywords_list):
    """Fetch keyword data for a batch of keywords."""
    # Ahrefs accepts comma-separated keywords
    keywords_str = ",".join(keywords_list)
    params = {
        "select": "keyword,volume,difficulty,cpc,traffic_potential,intents",
        "country": "us",
        "keywords": keywords_str,
    }
    resp = requests.get(f"{BASE_URL}/keywords-explorer/overview", headers=HEADERS, params=params)
    if resp.status_code == 200:
        return resp.json()
    else:
        print(f"  Error {resp.status_code}: {resp.text[:200]}")
        return None

def main():
    results = {}
    
    # Build keyword list for all towns
    all_keywords = []
    for town in TOWNS:
        for template in QUERY_TEMPLATES:
            kw = template.format(town=town)
            all_keywords.append(kw)
    
    print(f"Total keywords to research: {len(all_keywords)}")
    
    # Batch in groups of 50 (Ahrefs limit)
    batch_size = 50
    batches = [all_keywords[i:i+batch_size] for i in range(0, len(all_keywords), batch_size)]
    
    all_data = []
    for i, batch in enumerate(batches):
        print(f"Fetching batch {i+1}/{len(batches)} ({len(batch)} keywords)...")
        data = fetch_keywords_batch(batch)
        if data and "keywords" in data:
            all_data.extend(data["keywords"])
        elif data:
            print(f"  Unexpected response structure: {list(data.keys())}")
        time.sleep(1)  # Rate limiting
    
    # Organize by town
    for town in TOWNS:
        town_lower = town.lower()
        town_kws = [d for d in all_data if town_lower in d.get("keyword", "").lower()]
        results[town] = sorted(town_kws, key=lambda x: x.get("volume", 0) or 0, reverse=True)
    
    # Save full results
    output_path = "/home/ubuntu/jessica-shauffer/scripts/ahrefs_results.json"
    with open(output_path, "w") as f:
        json.dump(results, f, indent=2)
    print(f"\nResults saved to {output_path}")
    
    # Print summary
    print("\n=== KEYWORD SUMMARY BY TOWN ===")
    for town, kws in results.items():
        if kws:
            top = kws[0]
            print(f"{town:25s} | Top KW: '{top.get('keyword','')}' | Vol: {top.get('volume',0)} | Diff: {top.get('difficulty',0)} | CPC: ${top.get('cpc',0):.2f}")
        else:
            print(f"{town:25s} | No data returned")

if __name__ == "__main__":
    main()
