import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'formSubmission',
  title: 'Form Submission',
  type: 'document',
  fields: [
    defineField({ name: 'fullName', title: 'Full Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'email', title: 'Email', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'phone', title: 'Phone', type: 'string' }),
    defineField({ name: 'interest', title: 'Interest', type: 'string' }),
    defineField({ name: 'message', title: 'Message', type: 'text' }),
    defineField({ name: 'source', title: 'Source Page', type: 'string', description: 'Which page the form was submitted from' }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime' }),
  ],
  orderings: [
    { title: 'Newest First', name: 'submittedAtDesc', by: [{ field: 'submittedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'fullName', subtitle: 'interest' },
  },
});
