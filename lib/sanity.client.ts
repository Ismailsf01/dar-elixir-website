// src/lib/sanity.client.ts
import { createClient } from 'next-sanity'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
    throw new Error(`Missing Sanity project ID or dataset. Check your .env.local file.`)
}

export const client = createClient({
    projectId,
    dataset,
    apiVersion: '2025-07-28', // It's good practice to use today's date
    useCdn: false, // `false` if you want to ensure fresh data during development
})