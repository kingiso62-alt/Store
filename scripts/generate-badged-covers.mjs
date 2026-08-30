import sharp from 'sharp';
import fs from 'fs';

async function customizeBadges() {
  const krBadgeSvg = Buffer.from(`
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="110" height="32" rx="6" fill="#d91f2d" stroke="#ffffff" stroke-width="1.5"/>
      <text x="65" y="32" fill="#ffffff" font-size="15" font-weight="900" text-anchor="middle" font-family="sans-serif">KR / JP</text>
    </svg>
  `);
  await sharp('public/images/games/pubg-mobile.png')
    .resize(300, 300)
    .composite([{ input: krBadgeSvg, top: 0, left: 0 }])
    .toFile('public/images/games/pubg-korean.png');

  const androidBadgeSvg = Buffer.from(`
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="125" height="32" rx="6" fill="#107c41" stroke="#ffffff" stroke-width="1.5"/>
      <text x="72" y="32" fill="#ffffff" font-size="14" font-weight="900" text-anchor="middle" font-family="sans-serif">ANDROID</text>
    </svg>
  `);
  await sharp('public/images/games/efootball.png')
    .resize(300, 300)
    .composite([{ input: androidBadgeSvg, top: 0, left: 0 }])
    .toFile('public/images/games/efootball-android.png');

  const iosBadgeSvg = Buffer.from(`
    <svg width="300" height="300" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="95" height="32" rx="6" fill="#0a2c61" stroke="#ffffff" stroke-width="1.5"/>
      <text x="57" y="32" fill="#ffffff" font-size="14" font-weight="900" text-anchor="middle" font-family="sans-serif">APPLE iOS</text>
    </svg>
  `);
  await sharp('public/images/games/efootball.png')
    .resize(300, 300)
    .composite([{ input: iosBadgeSvg, top: 0, left: 0 }])
    .toFile('public/images/games/efootball-ios.png');

  console.log('Badged images created successfully!');
}
customizeBadges();
