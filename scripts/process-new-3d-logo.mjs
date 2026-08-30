import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const logoInput = 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\8939fbaf-fc43-4c4f-90a8-5321c5ac2f26\\.user_uploaded\\media_1788102381084.png';
const emblemInput = 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\8939fbaf-fc43-4c4f-90a8-5321c5ac2f26\\.user_uploaded\\media_1788102653800.jpg';

async function process3DLogo() {
  // 1. Process Main Logo (remove white background)
  console.log('Processing main 3D logo...');
  const { data, info } = await sharp(logoInput)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels;
  const transparentLogo = Buffer.from(data);

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Background is pure white / near white
    if (r > 240 && g > 240 && b > 240) {
      transparentLogo[i + 3] = 0; // Transparent
    } else if (r > 215 && g > 215 && b > 215) {
      // Smooth anti-aliased edge
      const maxVal = Math.max(r, g, b);
      transparentLogo[i + 3] = Math.max(0, Math.min(255, Math.round((255 - maxVal) * 6.5)));
    }
  }

  // Trim and save main logo
  const trimmedBuffer = await sharp(transparentLogo, { raw: { width, height, channels } })
    .trim({ threshold: 15 })
    .png()
    .toBuffer();

  const logoDestinations = [
    'public/images/tokiyo-logo.png',
    'public/images/tokiyo-logo-official-white.png',
    'public/images/tokiyo-logo-white.png',
    'public/images/tokiyo-3d-logo.png'
  ];

  for (const dest of logoDestinations) {
    fs.writeFileSync(dest, trimmedBuffer);
    console.log(`Saved logo to ${dest}`);
  }

  // 2. Process Favicon & App Icons from the 3D Emblem (emblemInput)
  console.log('Processing favicon & app icons...');
  // The emblem is on a dark background, let's create high-res square icons and circular favicon
  const emblemBuffer = await sharp(emblemInput)
    .resize(512, 512, { fit: 'cover' })
    .png()
    .toBuffer();

  // Save multiple favicon sizes and locations for Next.js App Router
  const icon32 = await sharp(emblemInput).resize(32, 32, { fit: 'cover' }).png().toBuffer();
  const icon48 = await sharp(emblemInput).resize(48, 48, { fit: 'cover' }).png().toBuffer();
  const icon192 = await sharp(emblemInput).resize(192, 192, { fit: 'cover' }).png().toBuffer();
  const icon512 = await sharp(emblemInput).resize(512, 512, { fit: 'cover' }).png().toBuffer();

  fs.writeFileSync('public/favicon.ico', icon48);
  fs.writeFileSync('public/favicon.png', icon48);
  fs.writeFileSync('public/icon.png', icon192);
  fs.writeFileSync('public/apple-icon.png', icon192);
  fs.writeFileSync('public/images/tokiyo-emblem.png', icon512);

  // Next.js App Router icon conventions in app/ directory
  fs.writeFileSync('app/favicon.ico', icon48);
  fs.writeFileSync('app/icon.png', icon192);
  fs.writeFileSync('app/apple-icon.png', icon192);

  console.log('Successfully generated all logos, favicons, and app icons!');
}

process3DLogo().catch(console.error);
