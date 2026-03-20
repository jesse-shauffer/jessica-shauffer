import { defineType, defineField } from "sanity";

export default defineType({
  name: "marketData",
  title: "Market Data",
  type: "document",
  preview: {
    select: { title: "townSlug", subtitle: "period" },
    prepare({ title, subtitle }: { title: string; subtitle: string }) {
      return {
        title: title ? title.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()) : "Unknown Town",
        subtitle: subtitle || "No period",
      };
    },
  },
  orderings: [
    { title: "Period (Newest First)", name: "periodDesc", by: [{ field: "period", direction: "desc" }] },
    { title: "Town A-Z", name: "townAsc", by: [{ field: "townSlug", direction: "asc" }] },
  ],
  fields: [
    defineField({
      name: "townSlug", title: "Town Slug", type: "string",
      description: "Matches the community page slug (e.g. easton, canton, plymouth)",
      validation: (r) => r.required(),
      options: {
        list: [
          { title: "Easton", value: "easton" },
          { title: "North Easton", value: "north-easton" },
          { title: "South Easton", value: "south-easton" },
          { title: "Mansfield", value: "mansfield" },
          { title: "Bridgewater", value: "bridgewater" },
          { title: "West Bridgewater", value: "west-bridgewater" },
          { title: "Norton", value: "norton" },
          { title: "Raynham", value: "raynham" },
          { title: "Attleboro", value: "attleboro" },
          { title: "North Attleborough", value: "north-attleborough" },
          { title: "Taunton", value: "taunton" },
          { title: "East Bridgewater", value: "east-bridgewater" },
          { title: "Canton", value: "canton" },
          { title: "Sharon", value: "sharon" },
          { title: "Norwood", value: "norwood" },
          { title: "Westwood", value: "westwood" },
          { title: "Stoughton", value: "stoughton" },
          { title: "Foxborough", value: "foxborough" },
          { title: "Weston", value: "weston" },
          { title: "Plymouth", value: "plymouth" },
          { title: "Hingham", value: "hingham" },
          { title: "Kingston", value: "kingston" },
          { title: "Halifax", value: "halifax" },
          { title: "Lakeville", value: "lakeville" },
          { title: "Middleborough", value: "middleborough" },
        ],
      },
    }),
    defineField({
      name: "period", title: "Period (YYYY-MM)", type: "string",
      description: "Month this data represents, e.g. 2026-03",
      validation: (r) => r.required().regex(/^\d{4}-\d{2}$/, { name: "YYYY-MM format" }),
    }),
    defineField({ name: "averageHomeValue", title: "Median Sale Price ($)", type: "number", description: "Median sale price in USD from Zillow ZHVI or Redfin" }),
    defineField({ name: "medianDaysOnMarket", title: "Median Days on Market", type: "number" }),
    defineField({ name: "saleToListRatio", title: "Sale-to-List Ratio", type: "number", description: "e.g. 1.028 = 102.8%" }),
    defineField({ name: "pricePerSqFt", title: "Price per Sq Ft ($)", type: "number" }),
    defineField({ name: "yearOverYearGrowth", title: "Year-over-Year Growth (%)", type: "number" }),
    defineField({ name: "activeListings", title: "Active Listings", type: "number" }),
    defineField({ name: "homesSold", title: "Homes Sold", type: "number" }),
    defineField({ name: "dataSource", title: "Data Source", type: "string", initialValue: "Zillow ZHVI + Redfin" }),
    defineField({ name: "updatedAt", title: "Last Updated", type: "datetime", readOnly: true }),
    defineField({ name: "manualOverride", title: "Manual Override", type: "boolean", description: "Set true to prevent auto-update from overwriting", initialValue: false }),
  ],
});
