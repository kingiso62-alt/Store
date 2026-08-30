import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputPath = 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\8939fbaf-fc43-4c4f-90a8-5321c5ac2f26\\.user_uploaded\\media_1788101379767.png';
const outputWhitePath = 'public/images/tokiyo-logo-official-white.png';
const outputTransPath = 'public/images/tokiyo-logo-official-transparent.png';

async function processLogo() {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4 (RGBA)

  // 1. Process White Edition (for Dark Header)
  const whiteData = Buffer.from(data);
  // 2. Process Transparent Original Edition
  const transData = Buffer.from(data);

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];

    // Check if near white (background)
    const isBgWhite = (r > 235 && g > 235 && b > 235);
    const bgDistance = Math.min(255 - r, 255 - g, 255 - b);

    if (isBgWhite) {
      whiteData[i + 3] = 0; // Transparent
      transData[i + 3] = 0; // Transparent
      continue;
    }

    // Alpha feathering for anti-aliasing edges near white
    let alpha = 255;
    if (r > 210 && g > 210 && b > 210) {
      alpha = Math.max(0, Math.min(255, Math.round((255 - Math.max(r, g, b)) * 5.5)));
    }

    // Check if pixel is RED (STORE, Shopping Bag, Star, Red trails)
    // Red pixels have significantly higher red than green and blue
    const isRed = (r > 90 && r > g * 1.35 && r > b * 1.35) || (r > 120 && g < 80 && b < 80);

    // Check if pixel is White / Light Gray (Controller d-pad, buttons)
    const isDpadWhite = (r > 200 && g > 200 && b > 200);

    // Check if pixel is Dark Blue / Dark Tone (TOKIYO text, bottom of gamepad)
    const isDarkBlueOrBlack = !isRed && (b > r || (r < 80 && g < 80 && b < 120) || (r < 100 && g < 110 && b < 140));

    // Transparent Original
    transData[i + 3] = alpha;

    // White Edition for Dark Header:
    if (isRed) {
      // Enhance red to vibrant glowing esports red
      const redFactor = r / 255;
      whiteData[i] = Math.min(255, Math.round(245 * redFactor + 25)); // Vivid red
      whiteData[i + 1] = Math.round(g * 0.4);
      whiteData[i + 2] = Math.round(b * 0.4);
      whiteData[i + 3] = alpha;
    } else if (isDpadWhite) {
      // Keep pure white
      whiteData[i] = 255;
      whiteData[i + 1] = 255;
      whiteData[i + 2] = 255;
      whiteData[i + 3] = alpha;
    } else if (isDarkBlueOrBlack) {
      // Transform dark blue TOKIYO & dark gamepad into crisp pure white
      whiteData[i] = 255;
      whiteData[i + 1] = 255;
      whiteData[i + 2] = 255;
      whiteData[i + 3] = alpha;
    } else {
      // Neutral / edge tones
      if (r > 130 && r > g) {
        // Reddish edge
        whiteData[i] = 245;
        whiteData[i + 1] = 40;
        whiteData[i + 2] = 50;
        whiteData[i + 3] = alpha;
      } else {
        // Turn towards white
        whiteData[i] = 255;
        whiteData[i + 1] = 255;
        whiteData[i + 2] = 255;
        whiteData[i + 3] = alpha;
      }
    }
  }

  // Trim edges and save
  await sharp(whiteData, { raw: { width, height, channels } })
    .trim({ threshold: 10 })
    .png()
    .toFile(outputWhitePath);

  await sharp(transData, { raw: { width, height, channels } })
    .trim({ threshold: 10 })
    .png()
    .toFile(outputTransPath);

  console.log('Processed official logos successfully!');
  const meta = await sharp(outputWhitePath).metadata();
  console.log('Output dimensions:', meta.width, 'x', meta.height);
}

processLogo().catch(console.error);
