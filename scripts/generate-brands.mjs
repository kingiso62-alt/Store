import fs from 'fs';
import path from 'path';

const brandsDir = 'public/images/brands';
if (!fs.existsSync(brandsDir)) {
  fs.mkdirSync(brandsDir, { recursive: true });
}

const brands = [
  {
    name: 'logitech.svg',
    svg: `<svg viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cx="22" cy="25" r="14" fill="none" stroke="#00B8FC" stroke-width="4"/>
        <path d="M22 16v9l6 6" fill="none" stroke="#00B8FC" stroke-width="3.5" stroke-linecap="round"/>
        <text x="44" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900" fill="#0a2148">logitech<tspan fill="#00B8FC">G</tspan></text>
      </g>
    </svg>`
  },
  {
    name: 'razer.svg',
    svg: `<svg viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M14 16 C22 8, 26 32, 10 32 C26 32, 22 16, 30 24" fill="none" stroke="#00E700" stroke-width="3"/>
        <text x="40" y="33" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="20" font-weight="900" letter-spacing="4" fill="#00E700">RAZER</text>
      </g>
    </svg>`
  },
  {
    name: 'steelseries.svg',
    svg: `<svg viewBox="0 0 170 50" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cx="20" cy="25" r="13" fill="none" stroke="#FF5200" stroke-width="4"/>
        <circle cx="20" cy="25" r="5" fill="#FF5200"/>
        <text x="42" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="17" font-weight="900" fill="#0a2148">steelseries</text>
      </g>
    </svg>`
  },
  {
    name: 'hyperx.svg',
    svg: `<svg viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg">
      <g>
        <text x="12" y="34" font-family="Impact, sans-serif" font-style="italic" font-size="26" letter-spacing="1" fill="#E11424">HYPER<tspan fill="#0a2148">X</tspan></text>
      </g>
    </svg>`
  },
  {
    name: 'redragon.svg',
    svg: `<svg viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg">
      <g>
        <polygon points="12,34 22,14 32,34 22,27" fill="#d91f2d"/>
        <text x="38" y="33" font-family="Impact, sans-serif" font-size="20" letter-spacing="1.5" fill="#d91f2d">REDRAGON</text>
      </g>
    </svg>`
  },
  {
    name: 'playstation.svg',
    svg: `<svg viewBox="0 0 170 50" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M20 12v24l6-3V18l-6-6z" fill="#003791"/>
        <path d="M20 28l13 4-7-2-6-2z" fill="#0072CE"/>
        <text x="42" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="900" fill="#003791">PlayStation</text>
      </g>
    </svg>`
  },
  {
    name: 'corsair.svg',
    svg: `<svg viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M12 34 C18 20, 22 16, 28 12 C23 22, 21 28, 12 34 Z" fill="#0a2148"/>
        <text x="38" y="33" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="18" font-weight="900" letter-spacing="2" fill="#0a2148">CORSAIR</text>
      </g>
    </svg>`
  },
  {
    name: 'asus-rog.svg',
    svg: `<svg viewBox="0 0 160 50" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M10 20 Q20 12 30 25 Q20 22 10 32 Z" fill="#FF0033"/>
        <text x="36" y="33" font-family="Impact, sans-serif" font-size="22" letter-spacing="2" fill="#FF0033">ROG</text>
        <text x="82" y="33" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="900" fill="#0a2148"> ASUS</text>
      </g>
    </svg>`
  }
];

for (const b of brands) {
  fs.writeFileSync(path.join(brandsDir, b.name), b.svg);
  console.log('Saved brand logo', b.name);
}
