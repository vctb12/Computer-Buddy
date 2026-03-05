import fs from 'node:fs';
const hasProductSlug = fs.readdirSync('out/products').some((x)=>x!=='index.html'&&x!=='index.txt');
const hasBlogSlug = fs.readdirSync('out/blog').some((x)=>x!=='index.html'&&x!=='index.txt');
console.log({hasProductSlug, hasBlogSlug});
if (!hasProductSlug || !hasBlogSlug) process.exit(1);
