import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  name: 'jessica-shauffer',
  title: 'Jessica Shauffer Real Estate',
  projectId: 'zrerdn9o',
  dataset: 'production',
  plugins: [structureTool()],
  schema: { types: schemaTypes },
  basePath: '/studio',
});
