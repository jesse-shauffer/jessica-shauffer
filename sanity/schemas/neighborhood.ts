import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'neighborhood',
  title: 'Neighborhood',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'zipCode', title: 'ZIP Code', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string', description: 'Short tagline for neighborhood cards.' }),
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'string' }),
    defineField({ name: 'heroDesc', title: 'Hero Description', type: 'text', rows: 3 }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      description: 'Main hero banner image for this neighborhood.',
    }),
    defineField({
      name: 'description',
      title: 'Description Paragraphs',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Each item is one paragraph of body text.',
    }),
    defineField({
      name: 'highlights',
      title: 'Highlights',
      type: 'array',
      of: [{
        type: 'object',
        name: 'highlight',
        fields: [
          defineField({ name: 'icon', title: 'Phosphor Icon Class', type: 'string', description: 'e.g. ph-bank, ph-tree' }),
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
        ],
        preview: {
          select: { title: 'title', subtitle: 'icon' },
        },
      }],
    }),
    defineField({ name: 'metaTitle', title: 'Meta Title', type: 'string' }),
    defineField({ name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'tagline' },
  },
});
