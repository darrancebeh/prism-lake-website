// src/components/MDXImage.tsx
import Image from 'next/image';

const REPO_OWNER = process.env.GITHUB_REPO_OWNER;
const REPO_NAME = process.env.GITHUB_REPO_NAME;

interface MDXImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function MDXImage({ src, alt, width = 1200, height = 675 }: MDXImageProps) {
  // If it's a relative path, convert to GitHub raw URL
  let imageSrc = src;
  
  if (src.startsWith('/') || src.startsWith('./') || src.startsWith('../')) {
    // Remove leading ./ or ../
    const cleanPath = src.replace(/^\.\.?\//, '');
    // Convert to GitHub raw URL
    imageSrc = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${cleanPath}`;
  }
  
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-white/10">
      <img
        src={imageSrc}
        alt={alt}
        className="w-full h-auto"
        loading="lazy"
      />
    </div>
  );
}