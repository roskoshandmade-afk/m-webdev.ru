import fs from 'fs';
import path from 'path';

// Generate a valid 16x16 32-bit ICO file for M_WEB
const width = 16;
const height = 16;
const bpp = 32;
const headerSize = 40;
const imageSize = width * height * 4;
const totalSize = headerSize + imageSize;
const offset = 22; // 6 bytes ICO header + 16 bytes directory entry

const buf = Buffer.alloc(offset + totalSize);

// ICO Header
buf.writeUInt16LE(0, 0); // Reserved
buf.writeUInt16LE(1, 2); // Type: 1 = ICO
buf.writeUInt16LE(1, 4); // Number of images

// Directory Entry
buf.writeUInt8(width === 256 ? 0 : width, 6);
buf.writeUInt8(height === 256 ? 0 : height, 7);
buf.writeUInt8(0, 8); // Color count
buf.writeUInt8(0, 9); // Reserved
buf.writeUInt16LE(1, 10); // Color planes
buf.writeUInt16LE(bpp, 12); // Bits per pixel
buf.writeUInt32LE(totalSize, 14); // Size of image data
buf.writeUInt32LE(offset, 18); // Offset of image data

// BMP Info Header (DIB Header)
const dibOffset = offset;
buf.writeUInt32LE(headerSize, dibOffset + 0);
buf.writeInt32LE(width, dibOffset + 4);
buf.writeInt32LE(height * 2, dibOffset + 8); // *2 for ICO top-down height in DIB
buf.writeUInt16LE(1, dibOffset + 12); // Planes
buf.writeUInt16LE(bpp, dibOffset + 14); // Bits per pixel
buf.writeUInt32LE(0, dibOffset + 16); // Compression (BI_RGB)
buf.writeUInt32LE(imageSize, dibOffset + 20); // Image size
buf.writeInt32LE(2835, dibOffset + 24); // X pixels per meter (~72 DPI)
buf.writeInt32LE(2835, dibOffset + 28); // Y pixels per meter
buf.writeUInt32LE(0, dibOffset + 32); // Colors used
buf.writeUInt32LE(0, dibOffset + 36); // Important colors

// Pixel Data (BGRA)
const pixelOffset = dibOffset + headerSize;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const pIdx = pixelOffset + (y * width + x) * 4;
    // Dark slate background #0F172A (BGRA: 2a, 17, 0f, ff) with M shape and #2563EB accent
    let b = 0x2a, g = 0x17, r = 0x0f, a = 0xff;
    
    // M monogram pixels in center
    if (x >= 2 && x <= 13 && y >= 2 && y <= 13) {
      // Border or M shape
      if (x === 2 || x === 13 || y === 2 || y === 13 || (x >= 6 && x <= 9 && y >= 5 && y <= 10)) {
        b = 0xfc; g = 0xfa; r = 0xf8; a = 0xff; // #F8FAFC
      }
    }
    // Blue accent pixel at bottom right of M (#2563EB -> BGRA: eb, 63, 25, ff)
    if (x >= 10 && x <= 12 && y >= 10 && y <= 12) {
      b = 0xeb; g = 0x63; r = 0x25; a = 0xff;
    }

    buf.writeUInt8(b, pIdx + 0);
    buf.writeUInt8(g, pIdx + 1);
    buf.writeUInt8(r, pIdx + 2);
    buf.writeUInt8(a, pIdx + 3);
  }
}

const targetPath = path.resolve(process.cwd(), 'public/favicon.ico');
fs.writeFileSync(targetPath, buf);
console.log('Successfully generated public/favicon.ico');
