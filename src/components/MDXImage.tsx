const REPO_OWNER = process.env.GITHUB_REPO_OWNER || 'darrancebeh';
const REPO_NAME = process.env.GITHUB_REPO_NAME || 'prism-lake-intelligence';

interface MDXImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export function MDXImage({ src, alt, width = 1200, height = 675 }: MDXImageProps) {
  let imageSrc = src;
  
  if (src.startsWith('../') || src.startsWith('./') || src.startsWith('/')) {
    let cleanPath = src
      .replace(/^\.\.\//, '')
      .replace(/^\.\//, '')
      .replace(/^\//, '');
    
    if (cleanPath.startsWith('images/')) {
      cleanPath = `content/${cleanPath}`;
    }
    
    imageSrc = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main/${cleanPath}`;
  }
  
  console.log('🖼️ Resolved URL:', imageSrc);
  
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