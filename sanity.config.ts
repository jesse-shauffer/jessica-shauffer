import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import type { StructureBuilder } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem().title('Form Submissions').icon(() => '📩').child(
        S.documentTypeList('formSubmission').title('Form Submissions').defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
      ),
      S.divider(),
      S.listItem().title('Communities').child(S.documentTypeList('neighborhood').title('Communities').defaultOrdering([{ field: 'name', direction: 'asc' }])),
      S.listItem().title('Counties').child(S.documentTypeList('county').title('Counties').defaultOrdering([{ field: 'name', direction: 'asc' }])),
      S.listItem().title('Reviews').child(S.documentTypeList('review').title('Reviews')),
      S.listItem().title('Market Data').child(S.documentTypeList('marketData').title('Market Data')),
      S.divider(),
      S.listItem().title('Pages').child(S.documentTypeList('page').title('Pages')),
      S.listItem().title('Agent').child(S.documentTypeList('agent').title('Agent')),
    ]);

export default defineConfig({
  name: 'jessica-shauffer',
  title: 'Jessica Shauffer Real Estate',
  projectId: 'zrerdn9o',
  dataset: 'production',
  plugins: [structureTool({ structure: deskStructure })],
  schema: { types: schemaTypes },
  basePath: '/studio',
});
