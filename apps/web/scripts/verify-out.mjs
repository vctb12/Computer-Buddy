import fs from 'node:fs';
const required = ['index','products','deals','services','warranty','blog','support','cart','checkout','order-success','builder','bundles','recently-viewed','alerts','admin','about','faq','404'];
let failed = false;
for (const page of required) {
  const a = `out/${page}.html`;
  const b = `out/${page}/index.html`;
  if (fs.existsSync(a) || fs.existsSync(b)) console.log(`OK ${page}`); else { console.log(`MISSING ${page}`); failed = true; }
}
if (!fs.existsSync('out/products') || !fs.existsSync('out/blog')) failed = true;
if (failed) process.exit(1);
