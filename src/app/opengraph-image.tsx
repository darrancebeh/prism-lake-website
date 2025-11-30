import { ImageResponse } from 'next/og';
import { join } from 'path';
import { readFileSync } from 'fs';

// 1. Keep Node.js runtime for the 50MB limit
export const runtime = 'nodejs';

export const alt = 'Prism Lake Quantamental Research';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  // 2. FIX: Use 'fs' (File System) to read the file instead of 'fetch'
  // process.cwd() gets the root folder of your project
  const logoPath = join(process.cwd(), 'public', 'icon.png');
  const logoData = readFileSync(logoPath);

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#020410', // Dark Navy
          backgroundImage: 'radial-gradient(circle at 50% 0%, #1b17ff33 0%, #020410 60%)', // Glow
        }}
      >
        {/* Logo Image */}
        <img
          // @ts-expect-error ImageResponse supports buffer directly
          src={logoData.buffer} // Pass the buffer directly
          alt="Prism Lake Logo"
          width="150"
          height="150"
          style={{
            marginBottom: '40px',
            borderRadius: '20px',
            boxShadow: '0 0 60px rgba(27, 23, 255, 0.4)',
          }}
        />

        {/* Brand Name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: 'white',
            letterSpacing: '-3px',
            display: 'flex',
            alignItems: 'center',
            lineHeight: 1,
          }}
        >
          PRISM LAKE
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: '#94a3b8', // Slate-400
            marginTop: '20px',
            fontFamily: 'monospace',
            letterSpacing: '6px',
            textTransform: 'uppercase',
          }}
        >
          Quantamental Research
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}