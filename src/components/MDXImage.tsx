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
  let imageSrc = src;
  
  // Handle relative paths from MDX files
  if (src.startsWith('../') || src.startsWith('./') || src.startsWith('/')) {
    // Remove relative path indicators
    let cleanPath = src
      .replace(/^\.\.\//, '') // Remove ../
      .replace(/^\.\//, '')   // Remove ./
      .replace(/^\//, '');    // Remove leading /
    
    // If path starts with 'images/', prepend 'content/'
    if (cleanPath.startsWith('images/')) {
      cleanPath = `content/${cleanPath}`;
    }
    
    // Build GitHub raw URL
    imageSrc = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${cleanPath}`;
  }
  
  console.log('🖼️ Original src:', src);
  console.log('🖼️ Resolved URL:', imageSrc);
  
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-white/10">
      <img
        src={imageSrc}
        alt={alt}
        className="w-full h-auto"
        loading="lazy"
        onError={(e) => {
          console.error('❌ Image failed to load:', imageSrc);
          e.currentTarget.style.display = 'none';
        }}
      />
    </div>
  );
}