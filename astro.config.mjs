import { defineConfig } from 'astro/config';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import mdx from '@astrojs/mdx';

export default defineConfig({
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: 'github-light',
    }
  },
  integrations: [mdx()],
});