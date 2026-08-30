import sharp from 'sharp';
import fs from 'fs';

const inputPath = 'C:\\Users\\hp\\.gemini\\antigravity-ide\\brain\\8939fbaf-fc43-4c4f-90a8-5321c5ac2f26\\.user_uploaded\\media_1788103568744.png';

async function processLogo() {
  console.log('Processing new white 3D logo with flood-fill background removal...');
  const image = sharp(inputPath);
  const { data, info } = await image.ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  // Create a 2D grid of visited pixels for flood fill
  const visited = new Uint8Array(width * height);
  const isBg = new Uint8Array(width * height);

  // Helper to get index
  const getIdx = (x, y) => (y * width + x);
  const getPixel = (x, y) => {
    const i = (y * width + x) * channels;
    return [data[i], data[i + 1], data[i + 2], data[i + 3]];
  };

  // Check if pixel is background color (pure white or very near white)
  const isWhiteBg = (x, y) => {
    const i = (y * width + x) * channels;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    // Background threshold
    return (r > 238 && g > 238 && b > 238);
  };

  // Flood fill queue starting from all outer border pixels
  const queue = [];

  // Add all border pixels
  for (let x = 0; x < width; x++) {
    if (isWhiteBg(x, 0)) { queue.push(x, 0); visited[getIdx(x, 0)] = 1; isBg[getIdx(x, 0)] = 1; }
    if (isWhiteBg(x, height - 1)) { queue.push(x, height - 1); visited[getIdx(x, height - 1)] = 1; isBg[getIdx(x, height - 1)] = 1; }
  }
  for (let y = 0; y < height; y++) {
    if (isWhiteBg(0, y) && !visited[getIdx(0, y)]) { queue.push(0, y); visited[getIdx(0, y)] = 1; isBg[getIdx(0, y)] = 1; }
    if (isWhiteBg(width - 1, y) && !visited[getIdx(width - 1, y)]) { queue.push(width - 1, y); visited[getIdx(width - 1, y)] = 1; isBg[getIdx(width - 1, y)] = 1; }
  }

  // BFS Flood Fill
  let head = 0;
  while (head < queue.length) {
    const x = queue[head++];
    const y = queue[head++];

    const neighbors = [
      [x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]
    ];

    for (const [nx, ny] of neighbors) {
      if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
        const nIdx = getIdx(nx, ny);
        if (!visited[nIdx]) {
          visited[nIdx] = 1;
          if (isWhiteBg(nx, ny)) {
            isBg[nIdx] = 1;
            queue.push(nx, ny);
          }
        }
      }
    }
  }

  // Create output buffer
  const outData = Buffer.from(data);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = getIdx(x, y);
      const i = idx * channels;

      if (isBg[idx]) {
        outData[i + 3] = 0; // Pure transparent for flood-filled background
      } else {
        // Anti-alias smooth edge
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];

        // If it's near an edge and high brightness, blend alpha smoothly
        if (r > 230 && g > 230 && b > 230) {
          // Check if any neighbor is background
          let hasBgNeighbor = false;
          for (let dy = -2; dy <= 2; dy++) {
            for (let dx = -2; dx <= 2; dx++) {
              const nx = x + dx;
              const ny = y + dy;
              if (nx >= 0 && nx < width && ny >= 0 && ny < height && isBg[getIdx(nx, ny)]) {
                hasBgNeighbor = true;
                break;
              }
            }
            if (hasBgNeighbor) break;
          }

          if (hasBgNeighbor) {
            const maxVal = Math.max(r, g, b);
            outData[i + 3] = Math.max(0, Math.min(255, Math.round((255 - maxVal) * 8)));
          }
        }
      }
    }
  }

  // Trim transparent boundaries and save
  const trimmed = await sharp(outData, { raw: { width, height, channels } })
    .trim({ threshold: 10 })
    .png()
    .toBuffer();

  const logoFiles = [
    'public/images/tokiyo-logo.png',
    'public/images/tokiyo-logo-official-white.png',
    'public/images/tokiyo-logo-white.png',
    'public/images/tokiyo-3d-logo.png'
  ];

  for (const f of logoFiles) {
    fs.writeFileSync(f, trimmed);
    console.log(`Saved logo to ${f}`);
  }

  console.log('Successfully processed new 3D logo!');
}

processLogo().catch(console.error);
