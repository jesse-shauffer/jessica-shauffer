import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({ name: 'author', title: 'Author Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'rating', title: 'Rating', type: 'number', validation: (r) => r.min(1).max(5) }),
    defineField({ name: 'text', title: 'Review Text', type: 'text', validation: (r) => r.required() }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'source', title: 'Source', type: 'string', options: { list: ['google', 'zillow', 'realtor'] } }),
  ],
});
