import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'county',
  title: 'County',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'County Name',
      type: 'string',
      description: 'e.g. Bristol County',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'state',
      title: 'State',
      type: 'string',
      initialValue: 'MA',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short tagline shown on county cards.',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
    }),
    defineField({
      name: 'heroDesc',
      title: 'Hero Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      title: 'Description Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item is one paragraph of body text about this county.',
    }),
    defineField({
      name: 'highlights',
      title: 'County Highlights',
      type: 'array',
      of: [{
        type: 'object',
        name: 'highlight',
        fields: [
          defineField({ name: 'icon', title: 'Phosphor Icon Class', type: 'string' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'title', subtitle: 'icon' } },
      }],
    }),
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      validation: (Rule) => Rule.max(60).error('Title must be 60 characters or fewer for optimal SERP display'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(160).error('Description must be 160 characters or fewer for optimal SERP display'),
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline', media: 'heroImage' },
  },
});
