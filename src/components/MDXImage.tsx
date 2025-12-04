import Image from 'next/image';

interface MDXImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function MDXImage({ src, alt, width = 1200, height = 675 }: MDXImageProps) {
  let imageSrc = src;
  
  console.log('📍 Original src:', src);
  
  if (src.startsWith('../') || src.startsWith('./') || src.startsWith('/')) {
    let cleanPath = src
      .replace(/^\.\.\//, '')
      .replace(/^\.\//, '')
      .replace(/^\//, '');
    
    console.log('📍 After cleanup:', cleanPath);
    
    if (cleanPath.startsWith('images/')) {
      cleanPath = `content/${cleanPath}`;
    }
    
    console.log('📍 Final cleanPath:', cleanPath);
    
    // Use API proxy for private repo images (same as blog.ts authentication)
    imageSrc = `/api/github-image?path=${encodeURIComponent(cleanPath)}`;
  }
  
  console.log('🔗 Final URL:', imageSrc);
  
  return (
    <div className="my-8 rounded-xl overflow-hidden border border-white/10">
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto"
        loading="lazy"
        unoptimized
      />
    </div>
  );
}