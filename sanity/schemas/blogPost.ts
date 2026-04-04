import { defineType, defineField } from 'sanity';

// Blog topic categories — primary and secondary topic per post
const BLOG_TOPICS = [
  { title: 'Market Updates', value: 'market-updates' },
  { title: 'Buying a Home', value: 'buying' },
  { title: 'Selling a Home', value: 'selling' },
  { title: 'Neighborhood Guides', value: 'neighborhood-guides' },
  { title: 'First-Time Buyers', value: 'first-time-buyers' },
  { title: 'Investment & Relocation', value: 'investment-relocation' },
  { title: 'Local Lifestyle', value: 'local-lifestyle' },
  { title: 'Tips & Advice', value: 'tips-advice' },
];

export default defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    // ── Core ──────────────────────────────────────────────────────────
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The H1 and page title. Should include the primary keyword.',
      validation: (r) => r.required().max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      description: 'URL path, e.g. "homes-for-sale-easton-ma"',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'Date the post was published.',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'topic',
      title: 'Primary Topic',
      type: 'string',
      description: 'Primary topic category for this post.',
      options: {
        list: BLOG_TOPICS,
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'secondaryTopic',
      title: 'Secondary Topic (optional)',
      type: 'string',
      description: 'Optional second topic tag shown alongside the primary topic on cards and post header.',
      options: {
        list: BLOG_TOPICS,
        layout: 'radio',
      },
    }),
    defineField({
      name: 'readTimeMinutes',
      title: 'Read Time (minutes)',
      type: 'number',
      description: 'Estimated read time in minutes. Shown in the post header meta bar. Leave blank to auto-calculate from word count.',
      validation: (r) => r.min(1).max(60),
    }),
    defineField({
      name: 'primaryKeyword',
      title: 'Primary Keyword',
      type: 'string',
      description: 'The single keyword this post targets, e.g. "homes for sale Easton MA".',
    }),

    // ── Hero ──────────────────────────────────────────────────────────
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Featured image shown at top of post and in blog card.',
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero Image Alt Text',
      type: 'string',
      description: 'Descriptive alt text for the hero image.',
    }),

    // ── Content ───────────────────────────────────────────────────────
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'Short summary shown on blog cards and used as meta description. 140–160 characters.',
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                    validation: (r) =>
                      r.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
                  },
                  {
                    name: 'blank',
                    type: 'boolean',
                    title: 'Open in new tab',
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              validation: (r) => r.required(),
            },
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
            },
          ],
        },
      ],
      description: 'Full post body. Use H2/H3 headings to structure content. H2 headings auto-populate the Table of Contents sidebar.',
    }),

    // ── SEO ───────────────────────────────────────────────────────────
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'SEO title tag. 50–60 characters. Leave blank to use post title.',
      validation: (r) => r.max(60),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 2,
      description: 'SEO meta description. 140–160 characters.',
      validation: (r) => r.max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'OG / Social Share Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Image shown when shared on social. 1200×630px recommended. Falls back to hero image.',
    }),

    // ── Author ────────────────────────────────────────────────────────
    defineField({
      name: 'author',
      title: 'Author',
      type: 'string',
      initialValue: 'Jessica Shauffer',
      description: 'Author name shown on the post.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      topic: 'topic',
      publishedAt: 'publishedAt',
      media: 'heroImage',
    },
    prepare({ title, topic, publishedAt, media }) {
      const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'No date';
      const topicLabel = BLOG_TOPICS.find((t) => t.value === topic)?.title || topic || 'No topic';
      return {
        title,
        subtitle: `${topicLabel} · ${date}`,
        media,
      };
    },
  },

  orderings: [
    {
      title: 'Published Date, Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Published Date, Oldest First',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Title A–Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
});
