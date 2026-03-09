import { useState, useEffect } from "react";

/**
 * Image with native lazy loading. Optionally supports srcSet and WebP via picture.
 * @param {string} src - Image URL
 * @param {string} alt - Alt text
 * @param {string} [className] - CSS classes
 * @param {string} [srcSet] - Optional srcSet for responsive images
 * @param {string} [sizes] - Optional sizes attribute
 * @param {string} [webpSrc] - Optional WebP URL for <picture> (if provided, renders picture with webp + fallback)
 */
const FALLBACK_IMG = "https://placehold.co/400x300/d1fae5/047857?text=Mehsul";

export function LazyImage({ src, alt, className = "", srcSet, sizes, webpSrc, ...props }) {
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(src);
  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const handleError = () => {
    if (imgSrc !== FALLBACK_IMG) setImgSrc(FALLBACK_IMG);
  };

  const commonProps = {
    alt,
    className: `${className} ${!loaded ? "opacity-0" : "opacity-100"} transition-opacity duration-200`,
    loading: "lazy",
    onLoad: () => setLoaded(true),
    onError: handleError,
    ...props,
  };

  if (webpSrc) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img src={imgSrc} srcSet={srcSet} sizes={sizes} {...commonProps} />
      </picture>
    );
  }

  return (
    <img
      src={imgSrc}
      srcSet={srcSet}
      sizes={sizes}
      {...commonProps}
    />
  );
}
