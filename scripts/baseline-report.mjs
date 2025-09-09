#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

// Simple baseline inventory script (Phase 0)
const contentRoots = [
  'src/pages/blog/posts',
  'src/pages/solutions/items',
  'src/pages/industries/items'
];

function countFiles(dir) {
  try {
    return fs.readdirSync(dir).filter(f => f.endsWith('.mdx')).length;
  } catch (e) {
    return 0;
  }
}

const report = {};
for (const root of contentRoots) {
  report[root] = countFiles(path.resolve(process.cwd(), root));
}

const out = `# Baseline Content Inventory\n\n${Object.entries(report)
  .map(([k,v]) => `- ${k}: ${v} MDX files`)
  .join('\n')}\n\nGenerated: ${new Date().toISOString()}\n`;

fs.writeFileSync('BASELINE_CONTENT.md', out, 'utf8');
console.log(out);
