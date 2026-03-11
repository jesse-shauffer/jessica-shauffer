import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'agent',
  title: 'Agent',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'bio', title: 'Bio', type: 'array', of: [{ type: 'block' }] }),
    defineField({ name: 'photo', title: 'Photo', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'designations', title: 'Designations', type: 'array', of: [{ type: 'string' }] }),
    defineField({ name: 'googleRating', title: 'Google Rating', type: 'number' }),
    defineField({ name: 'googleReviewCount', title: 'Google Review Count', type: 'number' }),
  ],
});
