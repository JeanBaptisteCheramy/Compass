import { defineCollection, z } from "astro:content";

const articles = defineCollection({
    schema: z.object({
        title: z.string(),
        section: z.string().optional(),
    }),
});

export const collections = { articles };
