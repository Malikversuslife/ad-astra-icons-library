const fs = require('fs');

const appSource = fs.readFileSync('../app/page.tsx', 'utf8');
const categories = Object.fromEntries([...appSource.matchAll(/\{name:"([^"]+)",category:"([^"]+)"\}/g)].map(([, name, category]) => [name, category]));
const start = appSource.indexOf(' const paths: Record<IconName, React.ReactNode> = {');
const end = appSource.indexOf('\n };', start);
if (start < 0 || end < 0) throw new Error('Could not locate the Ad astra icon catalogue.');

const entries = appSource.slice(start, end).split('\n').slice(1);
const icons = {};
for (const entry of entries) {
  const match = entry.match(/^\s*(?:"([^"]+)"|(\w+)):(<><.*<\/>),?$/);
  if (!match) continue;
  const name = match[1] || match[2];
  let svg = match[3]
    .replace(/^<>|<\/>$/g, '')
    .replace(/\s*\{\.\.\.common\}/g, ' class="metal"')
    .replace(/\s*\{\.\.\.accent\}/g, ' class="accent"')
    .replace(/strokeLinecap/g, 'stroke-linecap')
    .replace(/strokeLinejoin/g, 'stroke-linejoin')
    .replace(/strokeWidth/g, 'stroke-width')
    .replace(/fill="url\(#metal\)"/g, 'fill="url(#metal)"')
    .replace(/fill="url\(#accent\)"/g, 'fill="url(#accent)"');
  icons[name] = svg;
}

const code = `figma.showUI(__html__, { width: 420, height: 680, themeColors: true });

const icons = ${JSON.stringify(icons, null, 2)};
const categories = ${JSON.stringify(categories, null, 2)};
const slug = (name) => name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

function svgFor(name, accent = '#8f83ff') {
  const id = slug(name);
  const metal = 'metal-' + id;
  const spectral = 'accent-' + id;
  const artwork = icons[name]
    .replace(/class="metal"/g, 'fill="none" stroke="url(#' + metal + ')" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"')
    .replace(/class="accent"/g, 'fill="none" stroke="url(#' + spectral + ')" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"')
    .replace(/url\\(#metal\\)/g, 'url(#' + metal + ')')
    .replace(/url\\(#accent\\)/g, 'url(#' + spectral + ')');
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" fill="none">' +
    '<defs><linearGradient id="' + metal + '" x1="10" y1="8" x2="78" y2="82" gradientUnits="userSpaceOnUse"><stop stop-color="#f6f8ff"/><stop offset=".19" stop-color="#687187"/><stop offset=".46" stop-color="#f0f3fb"/><stop offset=".72" stop-color="#2b3244"/><stop offset="1" stop-color="#b7c1d6"/></linearGradient><linearGradient id="' + spectral + '" x1="20" y1="18" x2="72" y2="72" gradientUnits="userSpaceOnUse"><stop stop-color="#5577ff"/><stop offset=".52" stop-color="' + accent + '"/><stop offset="1" stop-color="#e5d7ff"/></linearGradient></defs>' + artwork + '</svg>';
}

const sendCatalog = async () => {
  const favorites = await figma.clientStorage.getAsync('ad-astra-favorites') || [];
  figma.ui.postMessage({ type: 'catalog', icons: Object.keys(icons).map((name) => ({ name, category: categories[name], svg: svgFor(name) })), favorites });
};

figma.ui.onmessage = async (message) => {
  if (message.type === 'ready') await sendCatalog();
  if (message.type === 'set-favorites') await figma.clientStorage.setAsync('ad-astra-favorites', message.favorites);
  if (message.type === 'insert') {
    const node = figma.createNodeFromSvg(svgFor(message.name, message.accent));
    node.name = 'Ad astra / ' + message.name;
    node.setRelaunchData({ open: 'Open Ad astra icon library' });
    node.x = figma.viewport.center.x - node.width / 2;
    node.y = figma.viewport.center.y - node.height / 2;
    figma.currentPage.selection = [node];
    figma.viewport.scrollAndZoomIntoView([node]);
    figma.ui.postMessage({ type: 'inserted', name: message.name });
  }
  if (message.type === 'get-svg') figma.ui.postMessage({ type: 'svg', svg: svgFor(message.name, message.accent) });
};

// A UI can finish loading before Figma attaches its message listener. Send the
// catalogue proactively too, so an early ready message cannot leave it blank.
setTimeout(sendCatalog, 200);
`;

fs.writeFileSync('code.js', code);
console.log(`Built ${Object.keys(icons).length} icon SVGs.`);
