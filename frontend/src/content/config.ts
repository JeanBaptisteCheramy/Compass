import { defineCollection, z } from "astro:content";

const articles = defineCollection({
    schema: z.object({
        title: z.string(),
        section: z.string().optional(),
        theme: z.string().optional(),
    }),
});


const themes = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
    }),
});

export const collections = {
    articles,
    themes,
};