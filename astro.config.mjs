import { defineConfig } from 'astro/config';
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import lit from "@astrojs/lit";

// https://astro.build/config
export default defineConfig({
  site: 'https://the-drd.github.io', // Your public domain, e.g.: https://my-site.dev/. Used to generate sitemaps and canonical URLs.
  base: '/Boox',
  sitemap: true, // Generate sitemap (set to "false" to disable)
  integrations: [sitemap(), mdx(), lit(), icon()], // Add renderers to the config
});
