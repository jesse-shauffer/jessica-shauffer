import os
import json
import re

TOWNS = [
    "North Easton", "South Easton", "Easton", "Bridgewater", "West Bridgewater",
    "East Bridgewater", "Canton", "Sharon", "Raynham", "Taunton", "Plymouth",
    "Norton", "Mansfield", "Foxborough", "Attleboro", "Halifax", "Kingston",
    "Lakeville", "Middleborough", "Stoughton", "Hingham", "Norwood", "Weston",
    "Westwood", "North Attleborough"
]

def slugify(text):
    return re.sub(r'[^a-z0-9]+', '-', text.lower()).strip('-')

def generate_town_data(town):
    return {
        "_type": "neighborhood",
        "name": town,
        "slug": { "_type": "slug", "current": slugify(town) },
        "zipCode": "02000", # Placeholder, would be populated by real data
        "tagline": f"Discover real estate and homes for sale in {town}, MA.",
        "heroTitle": f"Living in {town}, MA",
        "heroDesc": f"Explore homes for sale, market trends, and the unique lifestyle of {town} with top 3% agent Jessica Shauffer.",
        "description": [
            f"{town} is a vibrant community in Eastern Massachusetts offering an exceptional quality of life. Known for its strong neighborhoods and excellent local amenities, it has become a highly desirable destination for homebuyers.",
            f"Whether you are looking for a historic home with character or new construction, the {town} real estate market offers diverse options. With easy access to major highways and commuter routes, residents enjoy the perfect balance of suburban tranquility and urban accessibility.",
            f"As a local expert, Jessica Shauffer provides data-driven insights and tenacious negotiation to help you buy or sell your home in {town} for the best possible price."
        ],
        "highlights": [
            {
                "icon": "ph-house-line",
                "title": "Real Estate Market",
                "description": f"Strong property values and consistent appreciation make {town} a solid investment."
            },
            {
                "icon": "ph-graduation-cap",
                "title": "Education",
                "description": "Access to highly-rated public schools and educational resources for families."
            },
            {
                "icon": "ph-tree",
                "title": "Parks & Recreation",
                "description": "Beautiful open spaces, conservation land, and community parks for outdoor activities."
            },
            {
                "icon": "ph-train-simple",
                "title": "Commuter Access",
                "description": "Strategic location with convenient access to Boston and Providence."
            }
        ],
        "metaTitle": f"{town}, MA Real Estate & Homes for Sale | Jessica Shauffer",
        "metaDescription": f"Explore real estate in {town}, MA. Find homes for sale, market data, and community insights with top 3% agent Jessica Shauffer."
    }

ndjson_content = ""
for town in TOWNS:
    ndjson_content += json.dumps(generate_town_data(town)) + "\n"

with open("communities_seed.ndjson", "w") as f:
    f.write(ndjson_content)

print(f"Generated seed data for {len(TOWNS)} communities in communities_seed.ndjson")
