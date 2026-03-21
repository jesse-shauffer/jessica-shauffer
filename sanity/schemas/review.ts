import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({ name: 'author', title: 'Author Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role / Description', type: 'string', description: 'e.g. "First-Time Home Buyer", "Home Seller"' }),
    defineField({ name: 'rating', title: 'Rating', type: 'number', validation: (r) => r.min(1).max(5), initialValue: 5 }),
    defineField({ name: 'text', title: 'Review Text', type: 'text', validation: (r) => r.required() }),
    defineField({ name: 'date', title: 'Date', type: 'date' }),
    defineField({ name: 'source', title: 'Source', type: 'string', options: { list: ['google', 'zillow', 'realtor', 'facebook'] }, initialValue: 'google' }),
  ],
  orderings: [
    { title: 'Date (Newest)', name: 'dateDesc', by: [{ field: 'date', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'author', subtitle: 'role' },
  },
});
