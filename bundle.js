const fs = require('fs');
const path = require('path');

const baseDir = __dirname;
let html = fs.readFileSync(path.join(baseDir, 'index.html'), 'utf8');

// Replace CSS link with inline style
const cssContent = fs.readFileSync(path.join(baseDir, 'css', 'style.css'), 'utf8');
html = html.replace(
  '<link rel="stylesheet" href="css/style.css">',
  `<style>\n/* Inlined Custom Styles */\n${cssContent}\n</style>`
);

// Inlined JS scripts in order
const jsFiles = [
  'data.js',
  'storage.js',
  'shop.js',
  'orders.js',
  'wms.js',
  'documents.js',
  'inventory.js',
  'app.js'
];

let scriptsCombined = '';
for (const file of jsFiles) {
  const code = fs.readFileSync(path.join(baseDir, 'js', file), 'utf8');
  scriptsCombined += `\n/* ========== ${file} ========== */\n${code}\n`;
}

// Replace the script tags
const scriptTagsRegex = /<!-- JAVASCRIPT MODULES -->[\s\S]*?<\/body>/;
const replacement = `<!-- COMBINED APPLICATION LOGIC -->\n<script>\n${scriptsCombined}\n</script>\n</body>`;

html = html.replace(scriptTagsRegex, replacement);

fs.writeFileSync(path.join(baseDir, 'grosir-app-standalone.html'), html, 'utf8');
// Also write to parent scratch directory for easy user access
fs.writeFileSync(path.join(baseDir, '..', 'grosir-app-standalone.html'), html, 'utf8');
console.log('Successfully generated grosir-app-standalone.html (Size: ' + (Buffer.byteLength(html, 'utf8') / 1024).toFixed(1) + ' KB)');
