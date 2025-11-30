import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'nodejs';

// Image metadata
export const alt = 'Prism Lake';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation function
export default async function Image() {
  // 1. Load the local logo file
  const logoData = await fetch(new URL('../../public/icon.png', import.meta.url)).then(
    (res) => res.arrayBuffer()
  );

  // 2. Convert ArrayBuffer to base64 data URL
  const logoBase64 = Buffer.from(logoData).toString('base64');
  const logoSrc = `data:image/png;base64,${logoBase64}`;

  return new ImageResponse(
    (
      // Image Container
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#020410',
          backgroundImage: 'radial-gradient(circle at 50% 0%, #1b17ff33 0%, #020410 60%)',
        }}
      >
        {/* The Logo Image */}
        <img 
          src={logoSrc}
          alt="Prism Lake Logo"
          width="150"
          height="150"
          style={{
            marginBottom: '40px',
            borderRadius: '20px',
            boxShadow: '0 0 60px rgba(27, 23, 255, 0.4)',
          }}
        />

        {/* The Brand Name */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            color: 'white',
            letterSpacing: '0px',
            display: 'flex',
            alignItems: 'center',
            fontFamily: 'monospace',
            lineHeight: 1,
          }}
        >
          PRISM LAKE
        </div>

        {/* The Tagline */}
        <div
          style={{
            fontSize: 20,
            color: '#94a3b8',
            marginTop: '20px',
            fontFamily: 'monospace',
            letterSpacing: '6px',
            textTransform: 'uppercase',
          }}
        >
          Quant Research & Market Intelligence
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}