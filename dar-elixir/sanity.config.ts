import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes'
import { deskTool } from 'sanity/desk'
import product from './schemaTypes/product'
import { internationalizedArray } from 'sanity-plugin-internationalized-array'

export default defineConfig({
  name: 'default',
  title: 'Dar Elixir',

  projectId: 'ne7n0quq',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), internationalizedArray({
    languages: [
      { id: 'en', title: 'English' },
      { id: 'fr', title: 'French' },
      { id: 'ar', title: 'Arabic' },
    ],
    defaultLanguages: ['en'],
    fieldTypes: ['string', 'text'],
  }),],

  schema: {
    types: [...schemaTypes, product],
  },
})
