const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, 'js');
const jsFiles = fs.readdirSync(jsDir).filter(f => f.endsWith('.js'));
const handlers = [];

function scanFile(filePath, fileName) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, idx) => {
    const regex = /on(click|submit|change|input)\s*=\s*["']([^"']+)["']/g;
    let m;
    while ((m = regex.exec(line)) !== null) {
      handlers.push({
        file: fileName,
        line: idx + 1,
        type: m[1],
        call: m[2].trim()
      });
    }
  });
}

scanFile(path.join(__dirname, 'index.html'), 'index.html');
jsFiles.forEach(f => scanFile(path.join(jsDir, f), f));

console.log('Total handler calls found:', handlers.length);

// Extract the function expressions (e.g., App.switchTab, Shop.addToCart, etc.)
const funcStats = {};
handlers.forEach(h => {
  // extract base function call name before parenthesis or arguments
  const fnMatch = h.call.match(/^([a-zA-Z0-9_$.]+)/);
  const fnName = fnMatch ? fnMatch[1] : h.call;
  if (!funcStats[fnName]) {
    funcStats[fnName] = { count: 0, occurrences: [] };
  }
  funcStats[fnName].count++;
  funcStats[fnName].occurrences.push({ file: h.file, line: h.line, call: h.call });
});

console.log('Unique handler functions:', Object.keys(funcStats).length);

// Output unique functions
for (const fn of Object.keys(funcStats).sort()) {
  console.log(`${fn}: ${funcStats[fn].count} times`);
}
