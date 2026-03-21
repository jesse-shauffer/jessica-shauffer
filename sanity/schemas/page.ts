import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Name',
      type: 'string',
      description: 'Internal name, e.g. "Home", "Market", "Buyers"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      description: 'Use: home, market, buyers, sellers, about, contact, testimonials',
      validation: (r) => r.required(),
    }),

    // ── Hero ──────────────────────────────────────────────────────────
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main hero banner image. Use the crop/hotspot tool to set the focal point.',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      description: 'Large headline displayed over the hero image.',
    }),
    defineField({
      name: 'heroDesc',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
      description: 'Subtitle text shown below the hero title.',
    }),

    // ── SEO ───────────────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      title: 'SEO Title',
      type: 'string',
      description: 'Browser tab / Google result title. Recommended: 50–60 characters.',
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Google search snippet. Recommended: 150–160 characters.',
    }),
    defineField({
      name: 'ogImage',
      title: 'OG / Social Share Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image shown when the page is shared on social media. Ideal size: 1200 × 630 px.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current', media: 'heroImage' },
  },
});
