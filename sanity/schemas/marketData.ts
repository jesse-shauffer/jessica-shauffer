import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'marketData',
  title: 'Market Data',
  type: 'document',
  fields: [
    defineField({ name: 'period', title: 'Period', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'averageHomeValue', title: 'Avg Home Value', type: 'number' }),
    defineField({ name: 'medianDaysOnMarket', title: 'Median Days on Market', type: 'number' }),
    defineField({ name: 'saleToListRatio', title: 'Sale-to-List Ratio', type: 'number' }),
    defineField({ name: 'pricePerSqFt', title: 'Price per Sq Ft', type: 'number' }),
    defineField({ name: 'yearOverYearGrowth', title: 'YoY Growth %', type: 'number' }),
  ],
});
